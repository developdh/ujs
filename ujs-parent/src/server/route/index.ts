import * as express from 'express';
import createHttpError from 'http-errors';
import * as jwt from 'jsonwebtoken';
import { evalSafe } from 'eval-safe';
import setting from '../data.json';

interface jwtType {
    origin: string;
    iot?: number;
    exp?: number;
}

const router = express.Router();

let save: any = { print: console.log };

// test code
router.get('/', (req, res) => {
    evalSafe('$.a = 1;', { $: save })
    evalSafe('$.print($.a);', { $: save })
    console.log(req.headers.origin);
    res.send({ ok: 1 });
});

// json 생성
router.post('/auth', (req, res, next) => {
    // 헤더에 오리진 없을시 내보냄.
    if (req.headers.origin === undefined)
        return next(createHttpError(500));
    // json 생성.
    let info = { origin: req.headers.origin, origin64: Buffer.from(req.headers.origin).toString('base64') }
    try {
        let data = jwt.sign(info, 'ggurikitakati');
        res.send(data);
    } catch (err) {
        next(err);
    }
})

// json 유효검사
router.get('/auth', (req, res, next) => {
    const body = req.body;
    try {
        jwt.verify(req.headers.authorization.split('jwt ')[1], 'ggurikitakati');
        res.send(true);
    } catch (err) {
        res.send(false);
    }
})



export default router;
