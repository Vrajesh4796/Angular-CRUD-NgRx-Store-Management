import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addAssociate, addAssociateSuccess, deleteAssociate, deleteAssociateSuccess, getAssociate, getAssociateSuccess, loadAssociate, loadAssociateFail, loadAssociateSuccess, updateAssociate, updateAssociateSuccess } from "./associate.action";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { AssociateService } from "../services/associate.service";
import { Injectable } from "@angular/core";
import { showAlert } from "../common/app.action";

@Injectable()
export class AssociateEffect {

    constructor(private actions: Actions, private associateSer: AssociateService) {

    }

    //Create Load Associate Data Effect
    _loadAssoacite = createEffect(() =>
        this.actions.pipe(
            ofType(loadAssociate), //Used Load Associate Type
            exhaustMap((action) => {
                //Used Get All Service Function for fetch all associate data
                return this.associateSer.GetAll().pipe(
                    map((data) => {
                        return loadAssociateSuccess({ list: data }) //Used Load Associte Sucess reducer for Get the data from store
                    }),
                    catchError((_error) => of(loadAssociateFail({ errormessage: _error }))) // Error handling
                )
            })
        )
    )

    //Create Add Associate Data Effect
    _addAssociate = createEffect(() =>
        this.actions.pipe(
            ofType(addAssociate), //Used Add Associate Type
            switchMap(action =>
                //Used Service for adding associate data in the DB
                this.associateSer.addAssociate(action.inputdata).pipe(
                    switchMap((data) => of(
                        addAssociateSuccess({ inputdata: action.inputdata }), //Used Add Associte Sucess reducer for storing the data
                        showAlert({ message: 'Associate Created Successfully', resultType: 'pass' }) //Used Alert Message
                    )),
                    catchError((_error) => of(showAlert({ message: 'Failrd to create associate', resultType: 'fail' })))
                    // Error handling with alert message
                )
            )
        )
    )

     //Create Get Associate Data Effect
    _getAssociate = createEffect(() =>
        this.actions.pipe(
            ofType(getAssociate), //Used Get Associate Type
            exhaustMap((action) => {
                //Used Service for getting associate data by Id from the DB
                return this.associateSer.Getbycode(action.id).pipe(
                    map((data) => {
                        return getAssociateSuccess({ obj: data }) //Used Get Associte Sucess reducer for Get the data
                    }),
                    catchError((_error) => of(showAlert({ message: 'Fail to get associate', resultType: 'fail' }))) // Error handling with alert message
                )
            })
        )
    )

    //Create Update Associate Data Effect
    _updateAssociate = createEffect(()=>
        this.actions.pipe(
            ofType(updateAssociate), //Used Update Associate Type
            switchMap((action) => 
                //Used Service for updating associate data in the DB
                this.associateSer.updateAssociate(action.updateData).pipe(
                    switchMap((data) => of(
                        updateAssociateSuccess({updateData:action.updateData}), //Used Update Associte Sucess reducer for updating the data
                        showAlert({message:'Associate updated successfully', resultType:'pass'}) //Used Alert Message
                    )),
                    catchError((_error) => of(showAlert({message:'Fail to update associate', resultType: 'fail'}))) 
                    //Error handling with alert message
                )
            )
        )
    )

    //Create Delete Associate Data Effect
    _deleteAssociate = createEffect(() => 
        this.actions.pipe(
            ofType(deleteAssociate), //Used Delete Associate Type
            switchMap((action) => 
                //Used Service for deleting associate data in the DB
                this.associateSer.deleteAssociate(action.id).pipe(
                    switchMap((data) => of(
                        deleteAssociateSuccess({id:action.id}), //Used Delete Associte Sucess reducer for deleting the data
                        showAlert({message: 'Associate deleted successfully', resultType:'pass'}) //Used Alert Message
                    )),
                    catchError((_error) => of(showAlert({message:'Fail to delete associate', resultType: 'fail'})))
                    //Error handling with alert message
                )
            )
        )
    )

}