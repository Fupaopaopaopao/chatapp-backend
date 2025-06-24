import { Request, Response } from "express";
export const signup = (req:Request,res:Response)=>{
    const {fullName,email,password} = req.body
    try {
        
    } catch (error) {
        
    }
}
export const login = (req:Request,res:Response)=>{
    res.send("login route");
}
export const logout = (req:Request,res:Response)=>{
    res.send("logout route");
}