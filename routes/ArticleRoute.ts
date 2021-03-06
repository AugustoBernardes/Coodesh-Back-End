import express from "express"
import { Request,Response } from "express";

// Controllers
import { SendDefaultMessageController, DisplayAllArticlesController,DisplaySingleArticlesController,DeleteSingleArticlesController,CreateArticleController,UpdateArticleController } from "../controllers/ArticlesController"

const sendDefaultMessageController = new SendDefaultMessageController()
const displayAllArticlesController = new DisplayAllArticlesController()
const displaySingleArticlesController = new DisplaySingleArticlesController()
const deleteSingleArticlesController = new DeleteSingleArticlesController()
const createArticleController = new CreateArticleController()
const updateArticleController = new UpdateArticleController()

const ArticleRoute = express.Router()


// GET
ArticleRoute.get('/',sendDefaultMessageController.handle)
ArticleRoute.get('/articles', displayAllArticlesController.handle)
ArticleRoute.get('/articles/:id', displaySingleArticlesController.handle)

// POST
ArticleRoute.post('/articles', createArticleController.handle)

// PUT
ArticleRoute.put('/articles/:id', updateArticleController.handle)

// DELETE
ArticleRoute.delete('/articles/:id', deleteSingleArticlesController.handle)

export default ArticleRoute 