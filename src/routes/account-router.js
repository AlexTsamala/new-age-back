import express from "express";
import { createUser,logIn } from "../controllers/auth-controller.js";

const accountRouter = express.Router(); 

accountRouter.post("/auth/sign-up",createUser);
accountRouter.post("/auth/sign-in",logIn);
// accountRouter.get("/Accounts/photo/:userName",usersPhoto);


export default accountRouter