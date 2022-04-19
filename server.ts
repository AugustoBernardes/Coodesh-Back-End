import { Request,Response, NextFunction } from "express";
import body_parser from "body-parser";
import express from "express"
import "express-async-errors"

// Dotenv variables
require('dotenv').config()
const PORT = process.env.PORT

const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));


// Treating global error
app.use((error:Error, req:Request, response:Response, next:NextFunction) => {
    if(error instanceof Error){
        return (
            response.status(400),
            response.json({
                status:400,
                error:error.message
            })
        )
    }
    
    return (
        response.status(500),
        response.json({
            status:500,
            error: "Internal Server Error",
        })
    )

})

// Running server
app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}!`))