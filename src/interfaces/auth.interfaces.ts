export interface ILogin{
    identifier: string,
    password: string
}

// Generated by https://quicktype.io

export interface ILoginReponse {
    jwt:  string;
    user: IUserMe;
}

export interface IUserMe extends IUserAttributes {
    id:  number;
}

// Generated by https://quicktype.io

export interface IUser {
    id:         number;
    attributes: IUserAttributes;
}

export interface IUserAttributes {
    username:  string;
    email:     string;
    provider:  string;
    confirmed: boolean;
    blocked:   boolean;
    createdAt: string;
    updatedAt: string;
    company:   string;
}