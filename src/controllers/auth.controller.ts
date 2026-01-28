import { Request, Response } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateJWT } from "../lib/util.js";
import { profile } from "console";

export const signup = async (req: any, res: any) => {
  const { fullName, email, password } = req.body;
  try {
    if (password < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email already existed." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashPassword,
    });

    if (newUser) {
      generateJWT(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {}
};
export const login = (req: Request, res: Response) => {
  res.send("login route");
};
export const logout = (req: Request, res: Response) => {
  res.send("logout route");
};
