require('dotenv').config(); // Pour charger les variables d'environnement depuis .env

const express = require('express');
const app = express();
const gatewayRoutes = require('./server/routes/gatewayRoutes');

// Middleware pour parser le JSON
app.use(express.json());

// Utilisation des routes du gateway
app.use('/', gatewayRoutes);

// Gestion des erreurs 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur interne du serveur' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway démarré sur le port ${PORT}`);
});