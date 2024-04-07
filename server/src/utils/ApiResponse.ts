class ApiResponse{
    statuscode: number;
    message: string;
    success : boolean;
    data: any
    constructor(
        statuscode: number,
        data : any = {},
        message: string = "Success",
        success: boolean = true
    ){
        this.statuscode = statuscode
        this.message = message
        this.success = success
        if(data)
        this.data = data
    }
}
export default ApiResponse