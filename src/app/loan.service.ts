import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
	providedIn: 'root'
})
export class LoanService {

	private apiUrl;

	constructor(private http: HttpClient) {
		this.apiUrl = environment.baseApiUrl + '/api/loan/calculate';
	}

	calculateLoan(loanRequest: any): Observable<any> {
		return this.http.post<any>(this.apiUrl, loanRequest, {
			headers: { 'Content-Type': 'application/json' }
		});
	}
} 
