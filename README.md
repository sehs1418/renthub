# RentHub - Noleggio P2P

RentHub è una moderna piattaforma di noleggio peer-to-peer (P2P) costruita con Angular 19. Questo progetto permette agli utenti di noleggiare attrezzature professionali e strumenti per il fai-da-te in modo semplice e veloce.

## 🚀 Features

- **Catalogo Prodotti**: Sfoglia un'ampia gamma di attrezzature (Trapani, Proiettori, Giardinaggio, ecc.)
- **Carrello**: Aggiungi prodotti al carrello e gestisci i periodi di noleggio
- **Processo di Noleggio**: Flusso completo con selezione date e pagamento (simulato)
- **Design Responsivo**: Ottimizzato per desktop e mobile con Tailwind CSS e Flowbite
- **Geolocalizzazione**: Rilevamento automatico della città dell'utente

## 🛠️ Technology Stack

- **Framework**: Angular 19.x
- **Styling**: Tailwind CSS 4.x con componenti Flowbite
- **State Management**: Angular Services & Signals
- **Routing**: Angular Router
- **Analytics**: GA4 Integration (Mock)

## 📋 Prerequisites

- Node.js (v18.x or higher)
- npm (v9.x or higher)
- Angular CLI (v19.x)

## 🔧 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/TUO_USER/renthub-frontend.git
   cd renthub-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:4200
   ```

## 📁 Project Structure

```
src/
├── app/
│   ├── core/            # Core services (Analytics, Geolocation)
│   ├── home/            # Homepage with Carousel and Grid
│   ├── product/         # Product details and Rental Modal
│   ├── shared/          # Navbar, Footer, Models
│   └── ...
├── assets/
│   └── data/            # Mock product data
```

## ⚙️ Available Scripts

- **npm start**: Start the development server
- **npm run build**: Build the project for production
- **npm test**: Run unit tests

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Author**: Hassine
- Icons provided by [Flowbite](https://flowbite.com/)
- Images from [Unsplash](https://unsplash.com/)
