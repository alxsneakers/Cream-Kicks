import { CreateAdminModel, LoginModel, UpdateNameAccountModel, UserModel } from "./auth.interface";

// estado incial
export interface AuthState {
    loginData: LoginModel | null;
    createAdmin: CreateAdminModel | null;
    updateNameAccount: UpdateNameAccountModel | null;
    isLoading: boolean;
    isLoadingCreateAdmin: boolean;
    isLoadingCambiarNombre: boolean;
    isError: string | null;
    isErrorCreateAdmin: string | null;
    isErrorUpdateName: string | null;
    loadingUserInfo: boolean
}