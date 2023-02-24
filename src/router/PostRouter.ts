import express from "express"
import { PostBusiness } from "../business/PostBusiness"
import { PostController } from "../controller/PostController"
import { PostDataBase } from "../database/PostDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"


export const postRouter = express.Router()


const postController = new PostController(
    new PostBusiness(
        new PostDataBase(),
        new IdGenerator(),
        new TokenManager()
    )
)

postRouter.get("/", postController.getPost)
postRouter.post("/", postController.createPost)