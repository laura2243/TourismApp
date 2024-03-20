export interface User{
    id?: any,
    name?: string,
    username?: string,
    password?: string
    role?: Role
}
 

export enum Role{
    ADMIN="admin",
   CLIENT="client"
}