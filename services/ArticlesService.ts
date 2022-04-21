import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

interface ICreateArticle{
    featured:boolean,
    title:string,
    url:string,
    imageUrl:string,
    newsSite:string,
    summary:string,
    publishedAt:string,
    launches:[
        {
            provider:string
        }
    ],events:[
        {
            provider:string
        }
    ]
}

class CreateNewArticleService{
    async execute(article:ICreateArticle){

        let saved_article = {
            featured:article.featured,
            title:article.title,
            url:article.url,
            imageUrl:article.imageUrl,
            newsSite:article.newsSite,
            summary:article.summary,
            publishedAt:article.publishedAt,
        }

        let saved_data = await prisma.article.create({
            data:saved_article,
        })

        // Saving events
        let events = article.events

        for (let i = 0; i < events.length; i++){

            // Validating provider data
            try {
                let event = events[i]

                let saved_event = await prisma.event.create({
                    data:{
                        provider:event.provider.trim(),
                        article:{
                            connect:{
                                id:saved_data.id
                            }
                        }
                    }
                }) 
            } catch (error) {
                
            }
        }

        // Saving launches
        let launches = article.launches

        for (let i = 0; i < launches.length; i++){
            // Validating provider data
            try {
                let launch = launches[i]

                let saved_launch = await prisma.launch.create({
                    data:{
                        provider:launch.provider.trim(),
                        article:{
                            connect:{
                                id:saved_data.id
                            }
                        }
                    }
                })
            } catch (error) {
                
            }
        }

        return "Article created!"
    }

        
}

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

export { DisplayAllArticlesService,DisplaySingleArticlesService,DeleteSingleArticlesService,CreateNewArticleService }