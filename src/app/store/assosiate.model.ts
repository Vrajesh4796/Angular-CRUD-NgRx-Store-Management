//Create Associate Interface
export interface Associates {
    id:number,
    name:string,
    email:string,
    phone:string,
    address:string,
    type:string,
    associategroup:string,
    status:boolean
}

//Create AssociateModel Interface
export interface AssociateModel {
    list: Associates[],
    associateObj: Associates,
    errorMessage: ''
}