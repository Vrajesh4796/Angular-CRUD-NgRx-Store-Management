import { Actions, createEffect, ofType } from "@ngrx/effects";
import { emptyAction, showAlert } from "./app.action";
import { exhaustMap, map } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Injectable } from "@angular/core";

@Injectable()
export class AppEffectes {
    constructor(private action:Actions, private snackBar:MatSnackBar){
    }

    //Create Show Alert Effect for common use
    _showAlert = createEffect(() =>
        this.action.pipe(
            ofType(showAlert),
            exhaustMap(action => {
                return this.showSnackBarAlert(action.message,action.resultType)
                    .afterDismissed()
                    .pipe(
                        map((data) => {
                            return emptyAction()
                        })
                    )
            })
        )
    )

    //Create Alert Message Fun using material SnackBar
    showSnackBarAlert(message:string,resultType:string='fail'){
        const _class = resultType == 'pass' ? 'green-snackbar' : 'red-snackbar';
        return this.snackBar.open(message, 'OK', {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: [_class],
            duration: 5000
        })
    }
}