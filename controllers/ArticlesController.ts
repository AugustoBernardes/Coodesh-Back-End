import { Request,Response } from "express"

import { DisplayAllArticlesService,DisplaySingleArticlesService,DeleteSingleArticlesService } from "../services/ArticlesService"

class SendDefaultMessageController{
    async handle(request: Request,response:Response){
        response.json({
            status:200,
            message:"Back-end Challenge 2021 🏅 - Space Flight News"
        })
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


export { SendDefaultMessageController,DisplayAllArticlesController,DisplaySingleArticlesController,DeleteSingleArticlesController }