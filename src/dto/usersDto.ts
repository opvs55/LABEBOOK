




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



    createCourseOutput = (parameter: Users): UsersOutputDTO => {
        const result: UsersOutputDTO = {
          message: "Users registrado com sucesso",
          course: {
            id: parameter.getId(),
            name: parameter.getName(),
          },
        }
    
        return result
      }



      editUsersInput = (idToEdit: string,newId: unknown,newName: unknown): EditUsersInputDTO => {
        if (newId !== undefined) {
          if (typeof newId !== "string") {
            throw new BadRequestError("'id' deve ser string")
          }
        }
    
        if (newName !== undefined) {
          if (typeof newName !== "string") {
            throw new BadRequestError("'name' deve ser string")
          }
        }
    
        const result: EditUsersInputDTO = {
          idToEdit,
          newId,
          newName,
        }
        return result
      }



      editUsersOutput = (parameter: Users): UsersOutputDTO => {
        const result: UsersOutputDTO = {
          message: "Curso atualizado com sucesso",
          users: {
            id: parameter.getId(),
            name: parameter.getName(),
          },
        }
        return result
      }
    }
}