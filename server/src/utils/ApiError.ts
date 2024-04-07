class ApiError extends Error{
    statusCode : number;
    message: string;
    stack?: string;
    data: unknown; 
    error: string[]
    success: boolean
    constructor(
        statuscode :number,
        message : string = "Something went wrong",
        error : string[] = [],
        stack : string = ""
    ){

        super(message)
        this.statusCode = statuscode
        this.message = message
        this.error = error
        this.data = null
        this.success = false
        if(stack.length >0){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}
export {ApiError}