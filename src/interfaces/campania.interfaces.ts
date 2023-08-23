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
    lista_contactos: {
        data: IListaContacto[]
    }
}

export interface ICreateCampania {
    asunto: string;
    correoRemitente: string;
    nombreRemitente: string;
    contactos: Array<number>,
    lista_contactos: Array<number>,
    cuerpo: string,
}