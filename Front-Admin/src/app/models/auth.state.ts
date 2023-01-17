import { LoginModel, UpdateNameAccountModel, UserModel } from "./auth.interface";

// estado incial
export interface AuthState {
    loginData: LoginModel | null,
    updateNameAccount: UpdateNameAccountModel | null, 
    isLoading: boolean,
    isLoadingCambiarNombre: boolean,
    isError: string | null,
    isErrorUpdateName: string | null
    userInfo: {},
    loadingUserInfo: boolean
}