import express from "express";
import { createUser } from "../controllers/auth-controller.js";

const accountRouter = express.Router(); 

accountRouter.post("/auth/sign-up",createUser);
// accountRouter.post("/auth/sign-in",ChangePassword);
// accountRouter.get("/Accounts/photo/:userName",usersPhoto);


export default accountRouter