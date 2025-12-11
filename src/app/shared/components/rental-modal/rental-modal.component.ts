import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnalyticsService } from '../../../core/services/analytics.service';

@Component({
    selector: 'app-rental-modal',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './rental-modal.component.html',
})
export class RentalModalComponent {
    @Input() isOpen = false;
    @Input() productId?: string;
    @Output() close = new EventEmitter<void>();

    private fb = inject(FormBuilder);
    private analyticsService = inject(AnalyticsService);

    emailForm: FormGroup;
    isSubmitted = false;
    showSuccess = false;

    constructor() {
        this.emailForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    onSubmit() {
        if (this.emailForm.valid) {
            const email = this.emailForm.value.email;

            // Track lead capture
            this.analyticsService.trackLeadCaptured(email, this.productId);

            // Show success message
            this.showSuccess = true;
            this.isSubmitted = true;

            // Close modal after 2 seconds
            setTimeout(() => {
                this.closeModal();
            }, 2000);
        }
    }

    closeModal() {
        this.isOpen = false;
        this.showSuccess = false;
        this.isSubmitted = false;
        this.emailForm.reset();
        this.close.emit();
    }

    get email() {
        return this.emailForm.get('email');
    }
}
