import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import GitHubStrategy from "passport-github2";
import userModel from "../dao/models/user.model.js";
import cartModel from "../dao/models/cart.model.js";
import config from "../config.js";
import { createHash } from "../utils.js";

const { clientID, clientSecret, callbackUrl, jwtSecret } = config;

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const cookieExt = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["jwtCookie"];
    }
    return token;
};

const jwtOptions = {
    secretOrKey : jwtSecret,
    jwtFromRequest : ExtractJwt.fromExtractors([cookieExt]),
};

const initializePassport = () =>  {
    passport.use("register", new LocalStrategy( { passReqToCallback: true, usernameField: "email"},
    async (req, username, password, done) => {
        try {
            const { first_name, last_name, email, age, role } = req.body;

        let user = await userModel.findOne({ email: username});
        if (user) {
            console.log("Este usuario ya existe");
            return done(null, false);
        }

        const cart = await cartModel.create();
        const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            role: role ?? "user",
            cart: cart._id,
        };

        const result = await userModel.create(newUser);
        return done (null, result);
        } catch (error) {
            done (error);
        }
    }));

    passport.use("jwt", new JWTStrategy(jwtOptions, async(jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            done(error);
        }
    }));

    passport.use("github", new GitHubStrategy(
        {
            clientID,
            clientSecret,
            callbackUrl,

    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userModel.findOne({ email: profile._json.email });
            if (!user) {
                const cart = await cartModel.create({});
                let newUser = {
                    first_name: profile._json.name,
                    last_name:"",
                    age: 28,
                    email: profile._id.email,
                    password: "",
                    cart: cart._id,
                };

            let result = await userModel.create(newUser);
            return done(null, result);
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id);
        done(null, user);
    });
};

export default initializePassport;