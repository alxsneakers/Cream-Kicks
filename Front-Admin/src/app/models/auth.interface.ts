export interface LoginModel{
    email: string, 
    password: string
}


// lo que devuelve el backend
export interface LoginResponse{
    token: string,
    _id: string
}


export interface UpdateNameAccountModel {
    nombre: string,
    id: string,
}


export interface UserModel {
    _id: string,
    nombre: string,
    apellidos: string,
    email: string,
    telefono: string,
    imgPerfil: string
}