export interface User{
    uid?: string;
    email?: string;
    displayName?: string;
    photoURL?: string;
    emailVerified?: boolean;
    role?: string;
}

export interface Student {
    $key: string;
    user: User;
    noControl: string;
    nombre: string;
    apellidoP: string;
    apellidoM: string
    edad: Number;
}
