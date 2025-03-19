
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoanService } from './loan.service';
import { environment } from '../environments/environment';

describe('LoanService', () => {
  let service: LoanService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoanService]
    });

    service = TestBed.inject(LoanService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to calculate loan', () => {
    const loanRequest = {
      principal: 10000,
      annualInterestRate: 5,
      years: 10,
      annualRepaymentRate: 200
    };

    const loanResponse = {
      monthlyPayment: 200,
      totalInterest: 5000,
      amortizationSchedule: []
    };

    service.calculateLoan(loanRequest).subscribe(response => {
      expect(response).toEqual(loanResponse);
    });

    const req = httpMock.expectOne(`${environment.baseApiUrl}/api/loan/calculate`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(loanRequest);

    req.flush(loanResponse);
  });
});
