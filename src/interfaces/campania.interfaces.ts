import { IContacto } from "./contactos.interfaces"
import { IListaContacto } from "./listaContactos.interfaces"

export interface ICampania{
    id: number;
    attributes: ICampaniaAttributes
}

export interface ICampaniaAttributes {
    asunto: string,
    nombreRemitente: string,
    correoRemitente: string,
    createdAt: string,
    finished: boolean,
    destinatarios: {
        data: IContacto[]
    }
}

export interface ICreateCampania {
    asunto: string;
    correoRemitente: string;
    nombreRemitente: string;
    contactos: Array<number>,
    cuerpo: string,
}