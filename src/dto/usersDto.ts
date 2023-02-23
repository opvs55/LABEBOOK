import {PostModel} from "../interfaces/types"


export interface SignupInputDTO {
  name: unknown,
  email: unknown,
  password: unknown
}

export interface SignupOutputDTO {
  token: string
}



/* estou tipando as estradas e saídas
veja que Input é o valor que recebo do body da interação com o front
e output é o que estou retornando, deste modo é dado o conceito de entrada,
o que estou recebndo e saída, o que estou retornando. */


export interface LoginInputDTO{
  email: unknown,
  password: unknown
}

export interface LoginOutputDTO{
  token: string
}


export interface GetPostInputDTO{
  token: string | undefined
}

export type GetPostOutputDTO = PostModel[]

export interface CreatePostInputDTO {
  token: string | undefined
}

export interface  EditPostInputDTO{
  idToEdit: string,
  token: string | undefined,
  name: unknown
}

export interface DeletePostInputDTO{
  idToDelete: string,
  token: string | undefined,
  name: unknown
}

export interface LikeOrDeslikePostInputDPO{
  idToLikeOrDeslike: string,
  token: string | undefined,
  lile: unknown
}


