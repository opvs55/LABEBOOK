import { CreateUsersInputDTO } from "../interfaces/types"





export class UsersDTO {
    createUsersInput = (id: unknown,name: unknown): CreateUsersInputDTO => {
      if (typeof id !== "string") {
        throw new BadRequestError("'id' deve ser string")
      }
  
      if (typeof name !== "string") {
        throw new BadRequestError("'name' deve ser string")
      }
      const result: CreateUsersInputDTO = {
        id,
        name,
      }
  
      return result
    }

}