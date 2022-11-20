import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import accountRouter from "./routes/account-router.js";
import swaggerMiddleware from "./middlewares/swagger-middleware.js";

const app = express();
let PORT = process.env.PORT || 4001;

app.use(bodyParser.json());
app.use(cors());


app.use("/api",accountRouter);

app.use("/",...swaggerMiddleware());


app.listen(PORT, () =>{

    console.log("started server on port 4001");
  
})

