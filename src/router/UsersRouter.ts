import express  from "express";
import { UsersBusiness } from "../business/UserBusiness";
import { UserController } from "../controller/userController";
import { UsersDatabase } from "../database/UsersDataBase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";


export const userRouter = express.Router()


const userController = new UserController(
    new UsersBusiness(
        new UsersDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)



userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)
