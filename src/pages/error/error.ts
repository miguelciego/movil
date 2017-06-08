
export class errorServe{
    
    hola:string

   constructor(
    ){

    }
    public msj(status:number){
        if(status == 200)
        {
            status = status +1
            console.log("esto heredo de la clase error 200")    
        }
    return status
        //this.AlertError()
    }
}
