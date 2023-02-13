import { Users } from "../models/Users"










export class CourseBusiness {
    constructor(
      private dto: CourseDTO,
      private database: CourseDatabase
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