import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AssociatelistComponent } from './associatelist.component';
import { AssociateComponent } from '../associate/associate.component';
import { loadAssociate, getAssociate, deleteAssociate, openPopup } from 'src/app/store/associate.action';
import { getAssociateList } from 'src/app/store/associate.selector';
import { MatCardModule } from '@angular/material/card';

describe('AssociatelistComponent', () => {
  let component: AssociatelistComponent;
  let fixture: ComponentFixture<AssociatelistComponent>;
  let store: jasmine.SpyObj<Store>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [AssociatelistComponent],
      imports: [MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AssociatelistComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    store.select.and.returnValue(of([]));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadAssociate on ngOnInit', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(loadAssociate());
  });

  it('should set dataSource with data from the store on ngOnInit', () => {
    const mockAssociates = [
      { code: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', address: '123 Main St', type: 'Full-time', group: 'A', status: 'Active' }
    ];
    store.select.and.returnValue(of(mockAssociates));

    component.ngOnInit();

    expect(component.dataSource.data).toEqual(mockAssociates);
  });

  it('should call openPopup with correct parameters for AddAssociate', () => {
    spyOn(component, 'openPopup');
    component.AddAssociate();
    expect(component.openPopup).toHaveBeenCalledWith(0, 'Create');
  });

  it('should call openPopup and dispatch getAssociate on editAssociate', () => {
    spyOn(component, 'openPopup');
    const code = 1;
    component.editAssociate(code);
    expect(component.openPopup).toHaveBeenCalledWith(code, 'Update');
    expect(store.dispatch).toHaveBeenCalledWith(getAssociate({ id: code }));
  });

  it('should confirm and dispatch deleteAssociate on deleteAssociate', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const code = 1;
    component.deleteAssociate(code);
    expect(window.confirm).toHaveBeenCalledWith('Are you sure want to delete?');
    expect(store.dispatch).toHaveBeenCalledWith(deleteAssociate({ id: code }));
  });

  it('should dispatch openPopup and open dialog in openPopup', () => {
    const code = 1;
    const title = 'Update';
    component.openPopup(code, title);
    expect(store.dispatch).toHaveBeenCalledWith(openPopup());
    expect(dialog.open).toHaveBeenCalledWith(AssociateComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: { code, title },
    });
  });
});
