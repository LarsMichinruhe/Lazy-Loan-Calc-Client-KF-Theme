import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { LoanCalculatorComponent } from './app/app.component';
import { provideEnvironmentNgxMask } from 'ngx-mask';


bootstrapApplication(LoanCalculatorComponent, {
	providers: [provideHttpClient(), provideEnvironmentNgxMask()]
})
	.catch((err) => console.error(err));
	