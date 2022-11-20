import express from "express";
import { createUser,logIn,userData,updateUser } from "../controllers/auth-controller.js";

const accountRouter = express.Router(); 

accountRouter.post("/auth/sign-up",createUser);
accountRouter.post("/auth/sign-in",logIn);
accountRouter.get("/auth/me",userData);
accountRouter.put("/users/:userId",updateUser);

export default accountRouter