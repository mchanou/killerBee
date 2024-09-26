# Étape 1 : Utiliser une image Node.js officielle en tant que base
FROM node:16-alpine

# Étape 2 : Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Étape 3 : Copier package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Étape 4 : Installer les dépendances du projet
RUN npm install

# Étape 5 : Copier le reste des fichiers de l'application dans le conteneur
COPY . .

# Étape 6 : Exposer le port sur lequel l'application va tourner (par défaut, 3000 pour React)
EXPOSE 3000

# Étape 7 : Lancer l'application
CMD ["npm", "start"]

