import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AssociateModel } from "./assosiate.model";

//Select Store Name through create feature selector
const associateState=createFeatureSelector<AssociateModel>('associate');

//Get All Associate through Selector
export const getAssociateList = createSelector(associateState, (state)=>{
    return state.list
})

//Get Particular Associate data through Selector
export const getAssociate = createSelector(associateState, (state)=>{
    return state.associateObj
})