

//segunda parte da implementação.



//para ser usado no ROLE e dar permissão para acessar certos endpoints
export enum USER_ROLES{
  NORMAL = "NORMAL",
  ADMIN = "ADMIN"
}


//dados ou informações adicionais que são incluídos em um token de autenticação.
export interface TokenPayLoad{
  id:string,
  name:string,
  role: USER_ROLES
}


//UserDB é a representação de um usuário em um banco de dados
export interface UserDB{
  id: string,
  name: string,
  email: string,
  password: string,
  role: USER_ROLES,
  created_at: string
}

//UserModel é uma classe ou estrutura de dados que define os atributos e 
//métodos de um usuário em uma aplicação
export interface UserModel{
  id: string,
  name:string,
  email:string,
  password:string,
  role:USER_ROLES,
  createdAt:string
}

//...
export interface PostDB{
  id: string,
  creator_id:string,
  context:string,
  likes:number,
  dislikes:number,
  created_at: string,
  updated_at: string 
}


export interface PostWithCreatorNameDB extends PostDB {
  creator_name: string 
}

//...
export interface PostModel {
    id: string,
    context: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updateAt: string,
    creator: {
        id: string,
        name: string
    }
}





