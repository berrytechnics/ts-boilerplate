import User from '../models/user.js';
import passport from 'passport';
const userController = {
	auth: async (req: any, res: any, next: any) => {
		if (req.isAuthenticated()) next();
		else {
			req.flash("red", "You must login first!");
			res.redirect("/user/login");
		}
	},
	register: async(req:any,res:any,next:any)=>{
		if(req.body.password !== req.body.password2){
			req.flash('Passwords do not match!');
			res.redirect('/login');
		}
		try{
			const user = new User({
				name: req.body.name,
				username: req.body.username,
				active: false
			})
			await User.register(user,req.body.password)
			req.flash('green','You may now login!')
			res.redirect('/login')
		}
		catch(e){next(e)}
	},
	login: (req:any, res:any, next:any) =>{
		passport.authenticate('local',{
			failureFlash:req.flash('red','Invalid username or password!'),
			failureRedirect:"/login"
		})
	},
	logout: (req: any, res: any) => {
		req.logout();
		req.flash("green", "You logged out!");
		res.redirect("/user/login");
	},
};
export default userController;