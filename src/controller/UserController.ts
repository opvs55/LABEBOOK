import { Request, Response } from "express"
import { UsersBusiness } from "../business/userBusiness"
import { SignUpInputDTO, SignUpOutputDTO } from "../dto/usersDto"
import { BaseError } from "../errors/BaseError"



export class UserController{
    constructor(
        private userBusiness: UsersBusiness
    ){}

    public signup = async (req:Request, res: Response) =>{
        try {
            const input: SignUpInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.email
            }

            const output = await this.userBusiness.signup(input)

            res.status(201).send(output)
            
        } catch (error) {
            if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("erro inesperado")
            }
        }
    }
}

