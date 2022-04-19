import express from "express"
import { Request,Response } from "express";

// Controllers
import { SendDefaultMessage } from "../controllers/ArticlesController"

const sendDefaultMessage = new SendDefaultMessage()

const ArticleRoute = express.Router()


// GET
ArticleRoute.get('/',sendDefaultMessage.handle)

export default ArticleRoute 