import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import pool from "../config/postgres.js";
import authValidation from "../schemas/auth-validation-shema.js";
import dotenv from "dotenv";
import  jwt  from "jsonwebtoken";

dotenv.config();

export const createUser = async(request,response) => {

    const {body} = request;
    const validator = await authValidation(body);
    const {value,error} = validator.validate(body);
    if(error){
        return response.status(401).json(error.details);
    }
    const {firstName,lastName,birthday,email,password} = value;
    const id = uuidv4();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    
    await pool.query({
        text:`INSERT INTO "Users"
        (id,"firstName","lastName",birthday,email,password)
        VALUES ($1, $2,$3,$4,$5,$6);`,
        values:[id,firstName,lastName,birthday,email,hashedPassword]
    })

    return response.status(201).send("User was created successfully");
}

export const logIn = async (request,response) => {
    const {email,password} = request.body;
    const hashedPassword = await pool.query({
      text:`SELECT password FROM "Users" WHERE email='${email}'`,
    })
    const checkedPassword =await bcrypt.compare(password,hashedPassword.rowCount > 0 ? hashedPassword.rows[0].password : "");
    if(!checkedPassword){
      return response.status(401).json("Password or email is incorrect");
    }
    const userInfo = await pool.query({
        text:`SELECT * FROM "Users" WHERE email='${email}'`,
    })
    const {firstName,lastName,id,birthday} = userInfo.rows[0];
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let payload = {
        "firstName":firstName,
        "lastName":lastName,
        "id":id,
        "email":email,
        "birthday":birthday
    }
    const token = jwt.sign(payload,jwtSecretKey);
    return response.status(201).json( {
        token,
        expireDate: new Date(),
      })
}

export const userData = async (request,response) => {
    const tokenBearer = request.headers.authorization;
    if(!tokenBearer){
        return response.status(401).send("Unauthorized");
    }
    const UsersToken = tokenBearer.split(" ")[1];
    const usernameId = JSON.parse(atob(UsersToken.split('.')[1])).id;
    const usersData = await pool.query({
        text:`SELECT * FROM "Users" WHERE id='${usernameId}' ;`
    });
    const {firstName,lastName,birthday,email} = usersData.rows[0];
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let payload = {
        "firstName":firstName,
        "lastName":lastName,
        "id":usernameId,
        "email":email,
        "birthday":birthday
    }
    const token = jwt.sign(payload,jwtSecretKey);
    return response.status(201).json( {
        token,     
        expireDate: new Date(),
    })
}

export const updateUser = async (request,response) => {
    const tokenBearer = request.headers.authorization;
    if(!tokenBearer){
        return response.status(401).send("Unauthorized");
    }
    const {userId} = request.params;
    const {firstName,lastName} = request.body;
    const checkUser = await pool.query({
        text:`SELECT email FROM "Users" WHERE id='${userId}'`,
      })
    if(checkUser.rowCount===0){
        return response.status(401).send("Can't find user");
    }
    await pool.query({
        text:`UPDATE "Users" SET "firstName"='${firstName}',"lastName"='${lastName}' WHERE id='${userId}'`,
    })

    const updatedInfo = await pool.query({
        text:`SELECT "firstName","lastName",id FROM "Users" WHERE id='${userId}'`,
      })

    return response.status(201).send(updatedInfo.rows[0]);
}

export const deleteUser = async (request,response) => {
    const tokenBearer = request.headers.authorization;
    if(!tokenBearer){
        return response.status(401).send("Unauthorized");
    }
    const {userId} = request.params;
    const result = await pool.query({
        text:`SELECT id FROM "Users" WHERE id='${userId}';`
       });
    
    if(result.rowCount === 0) {
        return response.status(400).send("User not found");
    }  
    
    await pool.query({
        text:`DELETE FROM "Users" WHERE "id"='${userId}';`,
    })

    return response.status(201).send("User was deleted successfully");
}

