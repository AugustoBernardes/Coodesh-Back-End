import axios from 'axios'
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient()


function FeedDB(){
    axios.get('https://api.spaceflightnewsapi.net/v3/articles')
    .then(async (response) => {
        
        let articles = response.data

        console.log(articles.length)

        for (let i = 0; i < articles.length; i++){
            let article = articles[i]

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

        console.log(`All data saved!`)

    })
    .catch(function (error) {
    
        console.log(error);
    })
}

FeedDB()
