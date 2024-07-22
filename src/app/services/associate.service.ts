import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Associates } from '../store/assosiate.model';
import { environment } from 'src/environment/environment.development';

@Injectable({
    providedIn: 'root'
})
export class AssociateService {

    constructor(private http: HttpClient) { }

    GetAll() {
        return this.http.get<Associates[]>(`${environment.apiUrl}associate`);
    }

    Getbycode(code: number) {
        return this.http.get<Associates>(`${environment.apiUrl}associate` + '/' + code)
    }

    addAssociate(data: Associates) {
        return this.http.post(`${environment.apiUrl}associate`, data)
    }

    updateAssociate(data: Associates) {
        return this.http.put(`${environment.apiUrl}associate` + '/' + data.id, data)
    }

    deleteAssociate(code: number) {
        return this.http.delete(`${environment.apiUrl}associate` + '/' + code);
    }


}
