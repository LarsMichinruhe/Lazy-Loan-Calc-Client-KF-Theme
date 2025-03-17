import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { LoanCalculatorComponent } from './app/app.component';

bootstrapApplication(LoanCalculatorComponent, {
	providers: [provideHttpClient()]
})
	.catch((err) => console.error(err));
	