import { Injectable } from '@angular/core';

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

@Injectable({
    providedIn: 'root',
})
export class AnalyticsService {
    private isGtagAvailable(): boolean {
        return typeof window !== 'undefined' && typeof window.gtag === 'function';
    }

    trackEvent(eventName: string, params?: any): void {
        if (this.isGtagAvailable()) {
            window.gtag('event', eventName, params);
        }
        // Always log to console for debugging
        console.log('[Analytics Event]', eventName, params);
    }

    trackViewProduct(productId: string, productName: string, price: number): void {
        this.trackEvent('view_product', {
            product_id: productId,
            product_name: productName,
            price: price,
            currency: 'EUR',
        });
    }

    trackRentIntent(productId: string, productName: string, price: number): void {
        this.trackEvent('click_rent_intent', {
            product_id: productId,
            product_name: productName,
            price: price,
            currency: 'EUR',
        });
    }

    trackLeadCaptured(email: string, productId?: string): void {
        this.trackEvent('lead_captured', {
            email: email,
            product_id: productId || 'unknown',
            source: 'rental_modal',
        });
    }
}
