import express from "express"
import { Request,Response, NextFunction} from "express";

const route = express.Router()
// =============================================

// GET
route.get('/',(request:Request, response:Response) => { response.send('Hello')})
route.get('/a',(request:Request, response:Response) => { response.send('a')})


export { route }