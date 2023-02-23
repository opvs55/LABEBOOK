import { UsersDatabase } from "../database/UsersDataBase"
import { LoginInputDTO, LoginOutputDTO, SignupInputDTO, SignupOutputDTO} from "../dto/usersDto"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { TokenPayLoad, UserDB, USER_ROLES } from "../interfaces/types"
import { Users } from "../models/Users"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export class UsersBusiness {
    constructor(
      private userDatabase: UsersDatabase,
      private idGenerator: IdGenerator,
      private tokenManager: TokenManager,
      private hashManager: HashManager
    ) {}

    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
      const { name, email, password } = input

      if (typeof name !== "string") {
          throw new BadRequestError("'name' deve ser string")
      }

      if (typeof email !== "string") {
          throw new BadRequestError("'email' deve ser string")
      }

      if (typeof password !== "string") {
          throw new BadRequestError("'password' deve ser string")
      }


      console.log(password)
      const id = this.idGenerator.generate()
      const hashedPassword = await this.hashManager.hash(password)
      const role = USER_ROLES.NORMAL
      const createdAt = new Date().toISOString()

      const newUser = new Users(
          id,
          name,
          email,
          hashedPassword,
          role,
          createdAt
      )

      const userDB = newUser.toDBModel()

      await this.userDatabase.insert(userDB)

      const payload: TokenPayLoad = {
          id: newUser.getId(),
          name: newUser.getName(),
          role: newUser.getRole()
      }

      const token = this.tokenManager.createToken(payload)

      const output: SignupOutputDTO = {
          token
      }

      return output
  }

    public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> =>{
      const {email, password} = input

      if(typeof email !== "string"){
        throw new BadRequestError("email deve ser string")
      }
      if(typeof password !== "string"){
        throw new BadRequestError("password deve ser string")
      }

      const userDB: UserDB | undefined = await this.userDatabase.findByEmail(email)

      if (!userDB) {
        throw new NotFoundError("email invalido")
      }

      const isPasswordCorrect = await this.hashManager.compare(password, userDB.password)

      console.log(password)
      console.log(userDB.password)
      console.log(isPasswordCorrect)

      if (!isPasswordCorrect) {
        throw new BadRequestError("'password' incorreto")
      }

      //tirei o ! pois não sei por qual razão o compare não está funcionando.
      //tentei tudo, o valores chegam, usei console.log para testar
      //porém a if sempre está dando false

      const user = new Users(
        userDB.id,
        userDB.name,
        userDB.email,
        userDB.password,
        userDB.role,
        userDB.created_at
      )


      const payload: TokenPayLoad = {
        id: user.getId(),
        name: user.getName(),
        role: user.getRole()
      }

      const token = this.tokenManager.createToken(payload)

      const output: LoginOutputDTO = {
          token
      }

      return output
    }
  }