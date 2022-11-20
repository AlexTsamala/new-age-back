import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import pool from "../config/postgres.js";



export const createUser = async(request,response) => {
    const {firstName,lastName,birthday,email,hashedPassword} = request.body;
    console.log(request.body);
    // const id = uuidv4();
    // await pool.query({
    //     text:`INSERT INTO users
    //     (id,"firstName","lastName",birthday,email,password)
    //     VALUES ($1, $2,$3,$4,$5,$6);`,
    //     values:[id,firstName,lastName,birthday,email,hashedPassword]
    // })

    return response.status(201).send("User was created successfully");
}