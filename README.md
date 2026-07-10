# 🌊 NautiMap

Une application web de cartographie marine interactive, conçue pour ordinateur et appareils mobiles.

## Fonctionnalités

- **🗺️ Carte Nautique** : Utilise **Leaflet.js** avec les couches **OpenSeaMap** superposées sur un fond sombre **CartoDB Dark Matter**.
- **🚢 Trafic en Temps Réel** : Connexion par WebSocket à **AISstream.io** pour afficher la position, le cap (orienté) et les détails des bateaux dans la zone visible.
- **🌤️ Météo Marine** : Récupère la température, l'humidité, la pression, le vent (vitesse & cap) et la hauteur des vagues via l'API **Open-Meteo**.
- **🌊 Annuaire des Marées** : Génère une courbe de hauteur d'eau harmonique interactive sur 24 heures et prévoit les marées (Pleine Mer / Basse Mer) pour les 7 prochains jours.
- **📍 Localisation à la Demande** : Bouton GPS pour se centrer instantanément sur la position de l'utilisateur.

## Comment Utiliser

1. Double-cliquez sur le fichier [index.html](index.html) pour l'ouvrir dans n'importe quel navigateur internet.
2. Autorisez la localisation lorsque le site le demande pour vous positionner directement sur votre plan d'eau local.
3. Cliquez n'importe où sur la carte pour charger la météo et les marées de cet endroit précis.
4. Zoomez ou déplacez la carte pour mettre à jour automatiquement le trafic maritime AIS de la zone visible.

## Technologies Utilisées

- **HTML5 & CSS3** (Vanilla)
- **Vanilla JavaScript** (ES6+)
- **Leaflet.js** (Cartographie)
- **Chart.js** (Graphique de marée)
- **FontAwesome** (Icônes premium)
- **Google Fonts (Outfit & Space Grotesk)**
