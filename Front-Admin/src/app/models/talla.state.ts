import { TallaModel } from "./talla.interface";



export interface TallaState {
    tallaData: TallaModel | null;
    isError: string | null;
    loading: boolean;
}

