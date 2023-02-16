import { UserDB } from "../interfaces/types"
import { BaseDatabase } from "./BaseDataBase"


export class UsersDatabase extends BaseDatabase {
  public static TABLE_USERS = "users"

  public insert = async ( userDB: UserDB ) => {
    await BaseDatabase
          .connection(UsersDatabase.TABLE_USERS)
          .insert(userDB)
  }
}
