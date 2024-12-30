import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../model/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validateToken from "../middleware/auth";

const router = express.Router();

router.post(
  "/login",
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid Credential" });
      }
      const isMatch = await bcrypt.compare(password, user?.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credential" });
      }

      const token = jwt.sign(
        { user: user?.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        maxAge : 86400000,
      })

       return res.status(200).json({ userId : user._id})
    } catch (error) {
      console.log(error);
       return res.status(500).json({ message: "something went wrong!" });
    }
  }
);


router.get("/validate", validateToken, (req : Request, res : Response) => {
  res.status(200).send({id : req.userId})
})

export default router;