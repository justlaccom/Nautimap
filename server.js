const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');

// Charger la configuration
let config = { port: 3000, aisApiKey: "" };
try {
    const configPath = path.join(__dirname, 'config.json');
    if (fs.existsSync(configPath)) {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        console.log("Configuration chargée avec succès depuis config.json");
    } else {
        console.warn("config.json introuvable, utilisation du port 3000 par défaut");
    }
} catch (err) {
    console.error("Erreur lors de la lecture de config.json, port 3000 par défaut utilisé", err);
}

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Servir les fichiers statiques du dossier public
app.use(express.static(path.join(__dirname, 'public')));

// Gérer les connexions WebSocket des clients navigateurs
wss.on('connection', (ws) => {
    let externalWs = null;

    // Écouter les messages du client (ex: demandes d'abonnements aux zones géographiques)
    ws.on('message', (message) => {
        try {
            const clientPayload = JSON.parse(message);
            
            if (clientPayload && clientPayload.BoundingBoxes) {
                
                // Fermer l'ancienne connexion AISstream si existante pour ce client
                if (externalWs) {
                    externalWs.close();
                }

                // Initialiser la connexion sécurisée vers AISstream.io
                externalWs = new WebSocket("wss://stream.aisstream.io/v0/stream");

                externalWs.on('open', () => {
                    const subscriptionMsg = {
                        "APIKey": config.aisApiKey,
                        "BoundingBoxes": clientPayload.BoundingBoxes,
                        "FilterMessageTypes": ["PositionReport"]
                    };
                    externalWs.send(JSON.stringify(subscriptionMsg));
                });

                externalWs.on('message', (aisMsg) => {
                    // Relayer le message brut d'AISstream directement au client navigateur
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(aisMsg.toString());
                    }
                });

                externalWs.on('error', (err) => {
                    console.error('Erreur connexion AISstream.io :', err.message);
                });

                externalWs.on('close', () => {
                });
            }
        } catch (err) {
            console.error('Erreur lors du traitement du message du client :', err.message);
        }
    });

    ws.on('close', () => {
        if (externalWs) {
            externalWs.close();
        }
    });
});

const PORT = config.port || 3000;
server.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`⛵ NautiMap démarré sur : http://localhost:${PORT}`);
    console.log(`==================================================`);
});
