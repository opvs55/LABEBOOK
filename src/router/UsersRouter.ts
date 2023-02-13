import express  from "express";
import { UsersBusiness } from "../business/userBusiness";
import { UserController } from "../controller/userController";
import { UsersDatabase } from "../database/UsersDataBase";
import { UsersDTO } from "../dto/usersDto";


export const usersRouter = express.Router()

const controller = new UserController(

    new UsersDTO(),
    new UsersBusiness(new UsersDTO(), new UsersDatabase())
)

usersRouter.get("/", controller.getUsers)