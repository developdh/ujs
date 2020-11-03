import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as createHttpError from 'http-errors';
import * as jwt from 'jsonwebtoken';
import { evalSafe } from 'eval-safe';
import { io } from '../server';
import { NotExtended } from 'http-errors';

interface jwtType{
    origin: string;
    iot?: number; 
    exp?: number;
}

const router = express.Router();

router.get('/', (req, res) => {
    evalSafe('print("a");', { print: console.log });
    console.log(req.headers.origin);
    res.send({ ok: 1 });

});

router.post('/auth', async (req, res, next) => {
    let info = {origin: req.headers.origin,}
    try {
        let data = await jwt.sign(info, 'ggurikitakati');
        res.send(data);
    } catch (err) {
        next(err);
    }
})

router.get('/auth', async (req, res, next) => {
    const body = req.body;
    try{
        const data = await jwt.verify(req.headers.authorization.split('jwt ')[1], 'ggurikitakati') as jwtType;
        const jwtInfo = {
            origin: data.origin,
        }
        const renew = await jwt.sign(jwtInfo, 'ggurikitakati', { expiresIn: 60 * 60 });
        res.send(renew);
    }catch(err){
        next(err);
    }
})



export default router;