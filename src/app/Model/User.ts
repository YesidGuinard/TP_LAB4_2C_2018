export class User{
    usuario : string;
    tipo : string;
    id : string;
    nombre : string;
    token : string;

    constructor(usuario : string, tipo : string, id : string, nombre : string, token : string){
        this.usuario = usuario;
        this.tipo = tipo;
        this.id = id;
        this.nombre = nombre;
        this.token = token;
    }
}