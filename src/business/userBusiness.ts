import { UsersDatabase } from "../database/UsersDataBase"
import { SignUpInputDTO, SignUpOutputDTO} from "../dto/usersDto"
import { BadRequestError } from "../errors/BadRequestError"
import { TokenPayLoad, USER_ROLES } from "../interfaces/types"
import { Users } from "../models/Users"
import { HashManager } from "../services/HashManage"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"










export class UsersBusiness {
    constructor(
      private userDatabase: UsersDatabase,
      private idGenerator: IdGenerator,
      private tokenManager: TokenManager,
      private hashManager: HashManager
    ) {}

    public signup = async (input: SignUpInputDTO): Promise<SignUpOutputDTO> =>{
      const {name, email, password} = input

      if(typeof name !== "string"){
        throw new BadRequestError("name deve ser string")
      }
      if(typeof email !== "string"){
        throw new BadRequestError("email deve ser string")
      }
      if(typeof password !== "string"){
        throw new BadRequestError("password deve ser string")
      }

      const newUser = new Users(
        this.idGenerator.generate(),
        name,
        email,
        password,
        USER_ROLES.NORMAL,
        new Date().toISOString()
      )

      const userDB = newUser.toDBModel()

      await this.userDatabase.insert(userDB)



      const payload: TokenPayLoad = { 
        id: newUser.getId(),
        name: newUser.getName(),
        role: newUser.getRole()
      }

      const token = this.tokenManager.createToken(payload)

      const output: SignUpOutputDTO = {
        token
      } 
      return output
    }

  }