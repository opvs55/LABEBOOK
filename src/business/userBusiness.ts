import { UsersDatabase } from "../database/UsersDataBase"
import { UsersDTO } from "../dto/usersDto"
import { Users } from "../models/Users"










export class UsersBusiness {
    constructor(
      private dto: UsersDTO,
      private database: UsersDatabase
    ) {}
      public getUsers = async (input: any) => {
          const { q } = input
  
          const usersDB = await this.database.findUsers(q)
  
          const courses: Users[] = usersDB.map(element => new Users(
              element.id,
              element.name,
          ))
  
          return courses
      }
  }