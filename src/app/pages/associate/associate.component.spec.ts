import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AssociateComponent } from './associate.component';
import { addAssociate, updateAssociate } from 'src/app/store/associate.action';
import { getAssociate } from 'src/app/store/associate.selector';
import { Associates } from 'src/app/store/assosiate.model';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AssociateService } from 'src/app/services/associate.service';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('AssociateComponent', () => {
  let component: AssociateComponent;
  let fixture: ComponentFixture<AssociateComponent>;
  let store: jasmine.SpyObj<Store>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<AssociateComponent>>;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const spyAPI = jasmine.createSpyObj('AssociateService', ['GetAll', 'Getbycode', 'addAssociate', 'updateAssociate', 'deleteAssociate']);

    await TestBed.configureTestingModule({
      declarations: [AssociateComponent],
      imports: [ReactiveFormsModule, MatCardModule, MatDialogModule, MatFormFieldModule, HttpClientTestingModule, HttpClientModule, MatSelectModule, MatRadioModule, MatInputModule],
      providers: [
        FormBuilder,
        { provide: Store, useValue: storeSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: AssociateService, useValue: spyAPI }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AssociateComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<AssociateComponent>>;

    store.select.and.returnValue(of({ id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', address: '123 Main St', type: 'customer', associategroup: 'level1', status: true }));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.associateForm).toBeDefined();
    expect(component.associateForm.controls['name'].value).toEqual('');
  });

  it('should set form values based on store data', () => {
    component.ngOnInit();
    expect(component.associateForm.value).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      address: '123 Main St',
      type: 'customer',
      group: 'level1',
      status: true,
    });
  });

  it('should dispatch updateAssociate action if form is valid and code is present', () => {
    component.data.code = 1; // Simulate edit mode
    component.associateForm.setValue({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      address: '123 Main St',
      type: 'customer',
      group: 'level1',
      status: true,
    });
    let formData: Associates = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      address: '123 Main St',
      type: 'customer',
      associategroup: 'level1',
      status: true,
    }
    component.saveAssociate();
    expect(store.dispatch).toHaveBeenCalledWith(updateAssociate({ updateData: formData }));
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should dispatch addAssociate action if form is valid and code is not present', () => {
    component.data.code = null; // Simulate add mode
    component.associateForm.setValue({
      id: 1,
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '0987654321',
      address: '456 Another St',
      type: 'customer',
      group: 'level1',
      status: true,
    });
    let formData: Associates = {
      id: 1,
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '0987654321',
      address: '456 Another St',
      type: 'customer',
      associategroup: 'level1',
      status: true,
    }
    component.saveAssociate();
    expect(store.dispatch).toHaveBeenCalledWith(addAssociate({ inputdata: formData }));
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should close the dialog when Close is called', () => {
    component.Close();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
