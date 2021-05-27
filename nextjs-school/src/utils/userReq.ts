import { Request } from "express";
import { UserType } from '@/generated/graphql'

export type User = {
  isAdmin: boolean,
  uid: string
};

export type FullUser = UserType & {
  password?: string
};

export interface IGetUserRequest extends Request {
  user?: User
};
