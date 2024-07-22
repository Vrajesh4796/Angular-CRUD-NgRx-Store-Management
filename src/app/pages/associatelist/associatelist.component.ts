import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssociateComponent } from '../associate/associate.component';
import { Associates } from 'src/app/store/assosiate.model';
import { Store } from '@ngrx/store';
import { deleteAssociate, getAssociate, loadAssociate, openPopup } from 'src/app/store/associate.action';
import { getAssociateList } from 'src/app/store/associate.selector';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-associatelist',
    templateUrl: './associatelist.component.html',
    styleUrls: ['./associatelist.component.scss']
})
export class AssociatelistComponent implements OnInit {

    associateList!:Associates[]
    dataSource:any;
    displayedColumns:string[]=["code","name","email","phone","address","type","group","status","action"];
    @ViewChild(MatPaginator) paginator!:MatPaginator;
    @ViewChild(MatSort) sort!:MatSort

    constructor(private dialog:MatDialog, private store:Store){
    }

    ngOnInit(): void {
        this.store.dispatch(loadAssociate()); //Dispatch the data using Load Associate Action
        this.store.select(getAssociateList).subscribe(data =>{
            this.associateList = data
            this.dataSource = new MatTableDataSource(this.associateList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }) // Select the associate list through NgRx Store Selector
    }
    
    //Add Associate
    AddAssociate(){
        this.openPopup(0,'Create')
    }

    //Edit Associate
    editAssociate(code:number){
        this.openPopup(code,'Update')
        this.store.dispatch(getAssociate({id:code})) //Dispatch value through associate Id
    }

    //delete Associate
    deleteAssociate(code:number){
        if(confirm('Are you sure want to delete?')){
            this.store.dispatch(deleteAssociate({id:code})) //Dispatch delete associate through Ngrx
        }
    }

    //Open Material Dialog
    openPopup(code:number,title:string){
        this.store.dispatch(openPopup()); //Dispatch Dialog value
        this.dialog.open(AssociateComponent,{
            width: '50%',
            enterAnimationDuration: '1000ms',
            exitAnimationDuration: '1000ms',
            data: {
                code: code,
                title: title
            }
            
        })
    }
}
