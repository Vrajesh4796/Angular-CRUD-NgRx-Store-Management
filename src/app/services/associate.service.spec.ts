import { TestBed } from '@angular/core/testing';

import { AssociateService } from './associate.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AssociateService', () => {
  let service: AssociateService;
  let spyApi = jasmine.createSpyObj('AssociateService', ['GetAll','Getbycode','addAssociate','updateAssociate','deleteAssociate'])

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[{provide:AssociateService, useValue: spyApi}]
    });
    service = TestBed.inject(AssociateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
