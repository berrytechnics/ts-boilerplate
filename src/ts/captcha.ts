import svgCaptcha from 'svg-captcha'
const newCaptcha = (req:any,res:any,next:any)=>{
    const captcha = svgCaptcha.create();
    req.session.captcha = captcha.text;
    res.locals.captcha = captcha.data;
    next();
}
export default newCaptcha;