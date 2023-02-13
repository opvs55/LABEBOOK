import express  from "express";
import { UserController } from "../controller/userController";


export const usersRouter = express.Router()

const controller = new UserController(
    
)