import { Request,Response, NextFunction } from "express";
import body_parser from "body-parser";
import "express-async-errors"
import morgan from "morgan"
import express from "express"

// Dotenv variables
require('dotenv').config()
const PORT = process.env.PORT

const app = express();

// Server log
app.use(morgan('dev'));

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

// Import routes
import undefinedRoute from "./middlewares/undefinedRoute"
import ArticleRoute from "./routes/ArticleRoute"


// Routes
app.use("/", ArticleRoute)
app.use("*",undefinedRoute)


// Treating global error
app.use((error:Error, request:Request, response:Response, next:NextFunction) => {
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