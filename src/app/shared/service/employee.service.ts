import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { shareReplay } from 'rxjs/operators';
import { Employee } from '../model/employee';


@Injectable({providedIn: 'root',})
export class EmployeeService {

    
    constructor(private _http: HttpClient){}

    getAllEmployees():Observable<Employee[]>{
        let headers: any = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Content-Type', 'application/json');
       return this._http.get<Employee[]>(`${environment.apiUrl}/employee/allemployees` ,{headers})
                    .pipe(shareReplay(1));
    }
    
    getEmployeesByCriteria(file: FormData, salary : number){
        let headers: any = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        return this._http.post(`${environment.apiUrl}/employee/selectionner/employees/`+salary, file,  {headers: headers})
                    .pipe(shareReplay(1))
    }
    
    
    
}