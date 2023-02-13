import { Request, Response } from "express"



export class UserController{
    constructor(){}
//falta implementar DTO business

    contgetUsers = async (req: Request, res: Response) => {
        try {
            const input = {
                q: req.query.q
            }
            const output = await this.business.getUsers(input)
    
            res.status(200).send(output)
        } catch (error) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}

