interface TranslationMap {
    [key: string]: string;
}

export default function translate(text: string): string {
    return TRANSLATIONS[text] || text;    
}

const TRANSLATIONS: TranslationMap = {
    "Invalid identifier or password": "Correo o contraseña incorrecta",
    "Not Found": "No se ha encontrado el recurso"
}