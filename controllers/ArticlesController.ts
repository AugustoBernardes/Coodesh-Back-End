import { Request,Response } from "express"
import NewArticle from "../services/validations/ArticleValidation"
import { DisplayAllArticlesService,DisplaySingleArticlesService,DeleteSingleArticlesService,CreateNewArticleService,UpdateArticleService } from "../services/ArticlesService"

class SendDefaultMessageController{
    async handle(request: Request,response:Response){
        response.json({
            status:200,
            message:"Back-end Challenge 2021 🏅 - Space Flight News"
        })
    }
}

class CreateArticleController{
    async handle(request: Request,response:Response){
        let createNewArticleService = new CreateNewArticleService()

        let data = NewArticle({ 
            featured:request.body.featured,
            title:request.body.title,
            url:request.body.url,
            imageUrl:request.body.imageUrl,
            newsSite:request.body.newsSite,
            summary:request.body.summary,
            publishedAt:request.body.publishedAt,
        })

        if(data.error){
            throw new Error(data.error.message);   
        }else{

            let result = await createNewArticleService.execute(request.body)

            response.json({
                status:200,
                message:result
            })
        }
    }
}

class UpdateArticleController{
    async handle(request: Request,response:Response){
        let updateArticleService = new UpdateArticleService()

        let data = NewArticle({ 
            featured:request.body.featured,
            title:request.body.title,
            url:request.body.url,
            imageUrl:request.body.imageUrl,
            newsSite:request.body.newsSite,
            summary:request.body.summary,
            publishedAt:request.body.publishedAt,
        })

        if(data.error){
            throw new Error(data.error.message);   
        }else{
            let result = await updateArticleService.execute(request.body, request.params.id)

            response.json({
                status:200,
                message:result
            })
        }
    }
}


class DisplayAllArticlesController{
    async handle(request:Request, response:Response){
        let displayAllArticlesService = new DisplayAllArticlesService()

        let articles = await displayAllArticlesService.execute()

        response.json(articles)
    }
}

class DisplaySingleArticlesController{
    async handle(request:Request, response:Response){
        let { id } = request.params

        let displaySingleArticlesService = new DisplaySingleArticlesService()

        let article = await displaySingleArticlesService.execute(id)

        response.json(article)
    }
}


class DeleteSingleArticlesController{
    async handle(request:Request, response:Response){
        let { id } = request.params

        let deleteSingleArticlesService = new DeleteSingleArticlesService()

        let article = await deleteSingleArticlesService.execute(id)

        response.json({
            status:200,
            message:`Article:${id} was deleted!`
        })
    }
}


export { SendDefaultMessageController,DisplayAllArticlesController,DisplaySingleArticlesController,DeleteSingleArticlesController,CreateArticleController,UpdateArticleController }