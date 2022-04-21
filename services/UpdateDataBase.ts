import axios from 'axios'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

function FeedDB(){
    axios.get('https://api.spaceflightnewsapi.net/v3/articles')
    .then(async (response) => {
        
        
        let new_articles = response.data

        for (let i = 0; i < new_articles.length; i++){
            try {
                let article = new_articles[i]

                let found_article = await prisma.article.findFirst({
                    where:{
                        title:article.title
                    },include:{
                        events:true,
                        launches:true
                    }
                })

    
                if(found_article == null){

                    let filtered_article = {
                        featured:article.featured,
                        title:article.title,
                        url:article.url,
                        imageUrl:article.imageUrl,
                        newsSite:article.newsSite,
                        summary:article.summary,
                        publishedAt:article.publishedAt,
                    }
        
                    let saved_data = await prisma.article.create({
                        data:filtered_article,
                    })
        
                    // Saving events
                    let events = article.events
        
                    for (let i = 0; i < events.length; i++){
                        let event = events[i]
        
                        let saved_event = await prisma.event.create({
                            data:{
                                provider:event.provider,
                                article:{
                                    connect:{
                                        id:saved_data.id
                                    }
                                }
                            }
                        })
                    }
        
                    // Saving launches
                    let launches = article.launches
        
                    for (let i = 0; i < launches.length; i++){
                        let launch = launches[i]
        
                        let saved_launch = await prisma.launch.create({
                            data:{
                                provider:launch.provider,
                                article:{
                                    connect:{
                                        id:saved_data.id
                                    }
                                }
                            }
                        })
                    }
                }
            } catch (error) {
                
            }

        }
       

    })
    .catch(function (error) {
    
        console.log(error);
    })
}

export { FeedDB }