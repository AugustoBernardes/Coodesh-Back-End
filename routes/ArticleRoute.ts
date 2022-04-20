import express from "express"
import { Request,Response } from "express";

// Controllers
import { SendDefaultMessageController, DisplayAllArticlesController,DisplaySingleArticlesController } from "../controllers/ArticlesController"

const sendDefaultMessageController = new SendDefaultMessageController()
const displayAllArticlesController = new DisplayAllArticlesController()
const displaySingleArticlesController = new DisplaySingleArticlesController()

const ArticleRoute = express.Router()


// GET
ArticleRoute.get('/',sendDefaultMessageController.handle)
ArticleRoute.get('/articles', displayAllArticlesController.handle)
ArticleRoute.get('/articles/:id', displaySingleArticlesController.handle)

export default ArticleRoute 