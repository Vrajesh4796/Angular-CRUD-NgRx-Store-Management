import { AssociateModel } from "./assosiate.model";

//Define Intiale State
export const AssociateState:AssociateModel={
    list:[],
    errorMessage:'',
    associateObj:{
        id:0,
        name:"",
        email:"",
        phone:"",
        address:"",
        type:"customer",
        associategroup:"level1",
        status:true
    }
}