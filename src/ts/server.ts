// tslint:disable:no-console
import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "cookie-session";
import flash from "express-flash";
import cookieParser from "cookie-parser";
import compression from "compression";
import path from "path";
import ejs from "ejs";
import User from './models/user.js';
import routes from "./routes.js";
import passport from "passport";
import { fileURLToPath } from "url";
const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
const sessionOpts = {
	secret: "flyingpeanut970",
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60 * 60 * 1000 },
}
const app = express();
app.use(express.static(dirName + '/public'));
app.set("view engine", ejs.name);
app.disable("x-powered-by");
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(dirName, "public")));
app.use(cookieParser("pdinctulok18"));
app.use(session(sessionOpts));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use("/", routes);
app.use((req, res, next) => {
	res.status(404);
	next(new Error("That link appears to be broken."));
});
app.use((err: any, req: any, res: any, next: any) => {
	if (err.neverEverEver) next(req);
	err.status = 500;
	res.status(500).render('pages/error',{err});
});
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.listen(process.env.PORT)
export default app;