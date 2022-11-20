import express from "express";
import { createUser } from "../controllers/auth-controller.js";

const accountRouter = express.Router(); 

accountRouter.post("/Accounts/login",createUser);
// accountRouter.post("/Accounts/change-password",ChangePassword);
// accountRouter.get("/Accounts/photo/:userName",usersPhoto);


export default accountRouter