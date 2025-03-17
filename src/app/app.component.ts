import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { LoanService } from './loan.service';
import { KFThemeCommonModule } from '@de.fiduciagad.kundenportal/kf-theme/common';
import { KFIconModule } from '@de.fiduciagad.kundenportal/kf-theme/icon';
import { KFInputErrorModule } from '@de.fiduciagad.kundenportal/kf-theme/input-error';
import { KfThemeHeadlineModule } from '@de.fiduciagad.kundenportal/kf-theme/headline';
import { KfTileModule } from '@de.fiduciagad.kundenportal/kf-theme/tile';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe, 'de-DE');


@Component({
  selector: 'loancalc',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, KFThemeCommonModule, KFIconModule, KFInputErrorModule, KfThemeHeadlineModule, KfTileModule, MatButtonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatIconModule]
})
export class LoanCalculatorComponent {
  loanRequest = {
    principal: 0,
    annualInterestRate: 0,
    years: 0,
    annualRepaymentRate: 0
  };
  loanResponse: any;
  displayedColumns: string[] = ['month', 'principalPayment', 'interestPayment', 'remainingBalance'];

  constructor(private loanService: LoanService) { }

  calculateLoan(form: NgForm) {
    if (form.valid && this.areValuesPositive()) {
      this.loanService.calculateLoan(this.loanRequest).subscribe(response => {
        this.loanResponse = response;
      });
    } else {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
  
  private areValuesPositive(): boolean {
    return this.loanRequest.principal > 0 &&
           this.loanRequest.annualInterestRate > 0 &&
           this.loanRequest.years > 0 &&
           this.loanRequest.annualRepaymentRate > 0;
  }
  
  openHelp() {
    const modal = document.getElementById('helpModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeHelp() {
    const modal = document.getElementById('helpModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
