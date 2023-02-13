import { Request, Response } from "express"
import { UsersBusiness } from "../business/userBusiness"
import { UsersDTO } from "../dto/usersDto"
import { BaseError } from "../errors/BaseError"



export class UserController{
    constructor(
        private dto: UsersDTO,
        private business: UsersBusiness
    ){}
//falta implementar DTO business

    public getUsers = async (req: Request, res: Response) => {
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

