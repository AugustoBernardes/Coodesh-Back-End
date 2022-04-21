import Joi from "joi"

const NewArticle = data => {
    const schema = Joi.object({
        featured:Joi.boolean().required(),
        title:Joi.string().trim().required(),
        url:Joi.string().trim().required(),
        imageUrl:Joi.string().trim().required(),
        newsSite:Joi.string().trim().required(),
        summary:Joi.string().trim().required(),
        publishedAt:Joi.string().trim().required(),
    })

    return schema.validate(data)
}

export default NewArticle