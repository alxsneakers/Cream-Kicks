import { MarcaModel } from "./marca.interface";

export interface MarcaState {
    marcaData: MarcaModel | null,
    marcas: ReadonlyArray<MarcaModel>,
    loading: boolean,
    loadingCreate: boolean,
    loadingDelete: boolean,
    isError: string | null
}