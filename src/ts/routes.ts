import express from 'express';
import User from './controllers/User.js';
import newCaptcha from './captcha.js';
const router = express.Router();

router.get('/',(req:any,res:any,next:any)=>res.render('pages/index'));
router.get('/captcha',newCaptcha,(req:any,res:any,next:any)=>res.type('svg').status(200).send(res.locals.captcha));
router.get('/login',newCaptcha,(req:any,res:any)=>res.render('pages/login'));
router.post('/login',User.login);

export default router;