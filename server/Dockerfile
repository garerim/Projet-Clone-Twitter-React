# On part de l'image Node.js v14.18.1
FROM node:14.18.1-alpine3.14

# On définit le répertoire de travail pour l'application
WORKDIR /app

# On copie les fichiers nécessaires pour installer les dépendances
COPY package*.json ./

# On installe les dépendances
RUN npm install

# On copie les fichiers de l'application dans le conteneur
COPY . .

# On expose le port utilisé par l'application
EXPOSE 3001

# On définit la commande à exécuter pour démarrer l'application
CMD ["npm", "start"]