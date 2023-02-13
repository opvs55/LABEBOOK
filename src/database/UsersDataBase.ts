import { usersDB } from "../interfaces/types"
import { BaseDatabase } from "./BaseDataBase"


export class UsersDatabase extends BaseDatabase {
  public static TABLE_USERS = "users"

  public async findUsers(q: string | undefined) {
    if (q) {
      const result: usersDB[] = await BaseDatabase.connection(
        UsersDatabase.TABLE_USERS
      ).where("name", "LIKE", `%${q}%`)

      return result
    } else {
      const result: usersDB[] = await BaseDatabase.connection(
        UsersDatabase.TABLE_USERS
      )

      return result
    }
  }

  public async findUsersById(id: string) {
    const [usersDB]: usersDB[] | undefined[] = await BaseDatabase.connection(
      UsersDatabase.TABLE_USERS
    ).where({ id })

    return usersDB
  }

}
