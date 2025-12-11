import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CityInfo {
    name: string;
    zone?: string;
}

@Injectable({
    providedIn: 'root',
})
export class GeolocationService {
    private defaultCity: CityInfo = { name: 'Milano', zone: 'Lambrate/Città Studi' };
    private citySubject = new BehaviorSubject<CityInfo>(this.defaultCity);
    public city$: Observable<CityInfo> = this.citySubject.asObservable();

    // Mappa città italiane principali con zone esempio
    private cityZones: { [key: string]: string } = {
        'Milano': 'Lambrate/Città Studi',
        'Roma': 'Trastevere/San Lorenzo',
        'Torino': 'San Salvario/Quadrilatero',
        'Napoli': 'Vomero/Chiaia',
        'Firenze': 'Santo Spirito/San Frediano',
        'Bologna': 'Zona Universitaria',
        'Genova': 'Centro Storico',
        'Palermo': 'Politeama/Libertà',
    };

    constructor() {
        this.detectCity();
    }

    private detectCity(): void {
        // Prova a rilevare la città tramite geolocalizzazione browser
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.getCityFromCoordinates(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.log('Geolocation not available, using default city');
                    // Fallback: usa Milano come default
                    this.citySubject.next(this.defaultCity);
                }
            );
        } else {
            // Browser non supporta geolocalizzazione
            this.citySubject.next(this.defaultCity);
        }
    }

    private getCityFromCoordinates(lat: number, lon: number): void {
        console.log('[Geolocation] Coordinates:', lat, lon);

        // Usa Nominatim API (gratuita) per reverse geocoding
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`)
            .then(response => response.json())
            .then(data => {
                console.log('[Geolocation] API Response:', data);

                // Prova diversi campi per trovare la città
                const city = data.address?.city ||
                    data.address?.town ||
                    data.address?.village ||
                    data.address?.municipality ||
                    data.address?.county ||
                    'Milano';

                console.log('[Geolocation] Detected city:', city);

                const zone = this.cityZones[city] || '';
                this.citySubject.next({ name: city, zone });
            })
            .catch(error => {
                console.error('[Geolocation] Error getting city from coordinates:', error);
                this.citySubject.next(this.defaultCity);
            });
    }

    getCurrentCity(): CityInfo {
        return this.citySubject.value;
    }

    setCity(city: string): void {
        const zone = this.cityZones[city] || '';
        this.citySubject.next({ name: city, zone });
    }
}
