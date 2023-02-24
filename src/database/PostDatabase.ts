import { PostDB, PostWithCreatorNameDB } from "../interfaces/types";
import { BaseDatabase } from "./BaseDataBase";

export class PostDataBase extends BaseDatabase{
    public static TABLE_POST = "post"


    public getPostWithCreatorName = async () => {
        const result: PostWithCreatorNameDB[] = await BaseDatabase
            .connection(PostDataBase.TABLE_POST)
            .select(
                "post.id",
                "post.creator_id",
                "post.context",
                "post.likes",
                "post.dislikes",
                "post.created_at",
                "post.updated_at",
                "users.name as creator_name"
            )
            .join("users","post.creator_id","=","users.id")

        return result
    }

    public insert = async (postDB : PostDB): Promise<void>  => {

        await BaseDatabase
        .connection(PostDataBase.TABLE_POST)
        .insert(postDB)
    }

    public findByID = async (id:string): Promise<PostDB | undefined> => {

        const result: PostDB[] = await BaseDatabase
        .connection(PostDataBase.TABLE_POST)
        .select()
        .where({id})

        return result[0]
    }

    public update = async (
        id: string,
        postDB: PostDB
    ): Promise<void> => {
        await BaseDatabase.connection(PostDataBase.TABLE_POST)
        .update(postDB)
        .where({id})
    }
}