import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoanCalculatorComponent } from './app.component';
import { LoanService } from './loan.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('LoanCalculatorComponent', () => {
  let component: LoanCalculatorComponent;
  let fixture: ComponentFixture<LoanCalculatorComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, LoanCalculatorComponent],
      providers: [LoanService]
    }).compileComponents();

    fixture = TestBed.createComponent(LoanCalculatorComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send a valid LoanRequest and receive a LoanResponse', () => {
    component.loanRequest = {
      principal: 10000,
      annualInterestRate: 5,
      years: 10,
      annualRepaymentRate: 200
    };

    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    const req = httpMock.expectOne('http://localhost:8080/api/loan/calculate');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(component.loanRequest);

    const loanResponse = {
      monthlyPayment: 200,
      totalInterest: 5000,
      amortizationSchedule: []
    };
    req.flush(loanResponse);

    fixture.detectChanges();

    expect(component.loanResponse).toEqual(loanResponse);
  });
});