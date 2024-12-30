import express, { Request, Response } from "express";
import User from "../model/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";


const router = express.Router();

router.post("/register", [
  check('email', 'email is required').isEmail(),
  check('password', 'password is required').isLength({min : 6}),
],async (req: Request, res: Response): Promise<any> => {
    console.log(req.body);
    const errors = validationResult(req.body);
    if(!errors.isEmpty()){
      console.log('validation errors', errors);
      return res.status(400).send({ message : errors.array() })
    } 
    try {
      let users = await User.find({
        email: req.body.email,
      });

      if (users.length > 0) {
        return res.status(400).json({
          message: "User already Exists",
        });
      }
      const user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY as string,{
          expiresIn : "1d"
        }
      );

      

      res.cookie("auth_token", token, {
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        maxAge : 86400000, //1 day in millisecong
      })
      res.status(200).send({msg : "success"});
    } catch (error) {
      console.log('baal er error', error);
      res.status(500).send({ message: "server error" });
    }
});

export default router;
