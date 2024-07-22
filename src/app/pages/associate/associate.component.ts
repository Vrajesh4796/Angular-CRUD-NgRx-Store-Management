import { group } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addAssociate, updateAssociate } from 'src/app/store/associate.action';
import { getAssociate } from 'src/app/store/associate.selector';
import { Associates } from 'src/app/store/assosiate.model';

@Component({
    selector: 'app-associate',
    templateUrl: './associate.component.html',
    styleUrls: ['./associate.component.scss']
})
export class AssociateComponent implements OnInit {

    associateForm!: FormGroup;

    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AssociateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private store: Store
    ) {
        this.associateForm = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            phone: ['', Validators.required],
            address: ['', Validators.required],
            type: ['customer'],
            group: ['level1'],
            status: [true]
        })
    }

    ngOnInit(): void {
        this.store.select(getAssociate).subscribe(res => {
            this.associateForm.setValue({
                id: res.id,
                name: res.name,
                email: res.email,
                phone: res.phone,
                address: res.address,
                type: res.type,
                group: res.associategroup,
                status: res.status
            })
        })
    }

    saveAssociate() {
        if (this.associateForm.valid) {

            const inputData = this.associateForm.value
            const data: Associates = {
                id: inputData.id as number,
                name: inputData.name as string,
                email: inputData.email as string,
                phone: inputData.phone as string,
                address: inputData.address as string,
                type: inputData.type as string,
                associategroup: inputData.group as string,
                status: inputData.status as boolean
            }

            if (this.data.code) {
                this.store.dispatch(updateAssociate({ updateData: data }))
            } else {
                this.store.dispatch(addAssociate({ inputdata: data }))
            }
            this.Close()
        }
    }

    Close() {
        this.dialogRef.close();
    }

}
