import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import createHttpError from 'http-errors';
import * as jwt from 'jsonwebtoken';
import { evalSafe } from 'eval-safe';
import { io } from '../server';
import { request } from 'http';
import { create } from 'ts-node';

interface jwtType{
    origin: string;
    iot?: number; 
    exp?: number;
}

const router = express.Router();

let save: any = {print: console.log};

// test code
router.get('/', (req, res) => {
    evalSafe('save.a = 1;', {$:save})
    evalSafe('save.print(save.a);', {$:save})
    console.log(req.headers.origin);
    res.send({ ok: 1 });
});

router.post('/auth', (req, res, next) => {
    if(req.headers.origin === undefined)
        return next(createHttpError(500));
    
    let info = {origin: req.headers.origin,}
    try {
        let data = jwt.sign(info, 'ggurikitakati');
        console.log(typeof req.headers.origin);
        res.send(data);
    } catch (err) {
        next(err);
    }
})

router.get('/auth', (req, res, next) => {
    const body = req.body;
    try{
        const data = jwt.verify(req.headers.authorization.split('jwt ')[1], 'ggurikitakati') as jwtType;
        const jwtInfo = {
            origin: data.origin,
        }
        const renew = jwt.sign(jwtInfo, 'ggurikitakati', { expiresIn: 60 * 60 });
        res.send(data);
    }catch(err){
        next(err);
    }
})



export default router;
