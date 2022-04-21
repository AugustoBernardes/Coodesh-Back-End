import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class DisplayAllArticlesService{
    async execute(){
        let articles = await prisma.article.findMany({
            include:{
                events:true,
                launches:true
            }
        })

        return articles
    }
}

class DisplaySingleArticlesService{
    async execute(id:string){
        try {
            let article = await prisma.article.findFirst({
                where:{
                    id:id
                },include:{
                    events:true,
                    launches:true
                }
            })

            return article
        } catch (error) {
            throw new Error("This article don't exist!");
            
        }
    }
}


class DeleteSingleArticlesService{
    async execute(id:string){
        try {
            let article = await prisma.article.delete({
                where:{
                    id:id
                },include:{
                    events:true,
                    launches:true
                }
            })

            return article
        } catch (error) {
            throw new Error("This article don't exist!");
            
        }
    }
}

export { DisplayAllArticlesService,DisplaySingleArticlesService,DeleteSingleArticlesService }