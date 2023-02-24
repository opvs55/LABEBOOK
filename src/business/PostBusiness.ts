import { PostDataBase } from "../database/PostDatabase";
import { CreatePostInputDTO, EditPostInputDTO, GetPostInputDTO, GetPostOutputDTO } from "../dto/usersDto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { PostDB, PostWithCreatorNameDB } from "../interfaces/types";
import { Post } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness{
    constructor(
        private postDataBase: PostDataBase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ){}

    public getPost = async (input: GetPostInputDTO): Promise<GetPostOutputDTO> => {

        const {token} = input

        if(!token){
            throw new BadRequestError("token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload == null){
            throw new BadRequestError("token invalido")
        }

        const postWithCreatorNameDB: PostWithCreatorNameDB[] = 
            await this.postDataBase
                .getPostWithCreatorName()

        
        const post = postWithCreatorNameDB.map(
            (postWithCreatorNameDB) => {
                const post = new Post(
                    postWithCreatorNameDB.id,
                    postWithCreatorNameDB.context,
                    postWithCreatorNameDB.likes,
                    postWithCreatorNameDB.dislikes,
                    postWithCreatorNameDB.created_at,
                    postWithCreatorNameDB.updated_at,
                    postWithCreatorNameDB.creator_id,
                    postWithCreatorNameDB.creator_name
                )

                return post.ToBusinessModel()
            }
        )

        const output: GetPostOutputDTO = post

        return output
    }

    public createPost = async (input: CreatePostInputDTO): Promise<void> => {
        const {token, context} = input

        if(token === undefined){
            throw new BadRequestError("token ausente")
        }

        if(typeof context !== "string"){
            throw new BadRequestError("Context deve ser string")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload == null){
            throw new BadRequestError("token invalido")
        }


        const id = this.idGenerator.generate()
        const createAt = new Date().toISOString()
        const updateAt = new Date().toISOString()
        const creatorId = payload.id
        const creatorName = payload.name

        const post = new Post(
            id,
            context,
            0,
            0,
            createAt,
            updateAt,
            creatorId,
            creatorName
        )

        const postDB = post.ToDBModel()
        await this.postDataBase.insert(postDB)
    }

    public editPost = async (input: EditPostInputDTO): Promise<void> => {

        const {idToEdit, token, context } = input

        if(token === undefined){
            throw new BadRequestError("token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload == null){
            throw new BadRequestError("token invalido")
        }

        if(typeof context !== "string"){
            throw new BadRequestError("name deve ser string")
        }

        const postDB = await this.postDataBase.findByID(idToEdit)

        if(!postDB){
            throw new NotFoundError("Id não encontrado")
        }

        const creatorId = payload.id

        if(postDB.creator_id !== creatorId){
            throw new BadRequestError("Você não criou a postagem!")
        }

        const creatorName = payload.name

        const post = new Post(
            postDB.id,
            postDB.context,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
            creatorId,
            creatorName
        )

        post.setContext(context)
        post.setUpdatedAt(new Date().toISOString())

        const upPostDB = post.ToDBModel()

        await this.postDataBase.update(idToEdit, upPostDB)
    }
}