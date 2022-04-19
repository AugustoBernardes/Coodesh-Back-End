import { Request,Response } from "express"

class SendDefaultMessage{
    async handle(request: Request,response:Response){
        response.json({
            status:200,
            message:"Back-end Challenge 2021 🏅 - Space Flight News"
        })
    }
}

export { SendDefaultMessage }