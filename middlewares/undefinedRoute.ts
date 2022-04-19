import { Request,Response, NextFunction} from "express";

export default function undefinedRoute(request:Request, response:Response){ 
    response.status(404);
    response.json({
        status:404,
        error:"Undefined route"
    })
}