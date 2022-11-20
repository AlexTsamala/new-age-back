import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import pool from "../config/postgres.js";
import authValidation from "../schemas/auth-validation-shema.js";


export const createUser = async(request,response) => {

    const {body} = request;
    const validator = await authValidation(body);
    const {value,error} = validator.validate(body);
    if(error){
        return response.status(401).json(error.details.me);
      }
    const {firstName,lastName,birthday,email,password} = value;
    const id = uuidv4();
    const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password,salt);
    // await pool.query({
    //     text:`INSERT INTO "Users"
    //     (id,"firstName","lastName",birthday,email,password)
    //     VALUES ($1, $2,$3,$4,$5,$6);`,
    //     values:[id,firstName,lastName,birthday,email,hashedPassword]
    // })

    return response.status(201).send("User was created successfully");
}