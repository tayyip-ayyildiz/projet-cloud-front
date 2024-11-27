# Étape 1: Construire l'application Angular
FROM node:20.18.0 AS build

# Définir le répertoire de travail
WORKDIR /front

# Copier les fichiers package.json et package-lock.json (ou yarn.lock) pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tous les fichiers du projet Angular
COPY . .

# Construire l'application Angular en mode production (si nécessaire)
RUN npm run build --prod

# Étape 2: Exécuter l'application Angular en mode de développement (serveur de développement)
FROM node:20.18.0

# Définir le répertoire de travail
WORKDIR /front

# Copier seulement le package.json et node_modules depuis l'étape de build
COPY --from=build /front /front

# Exposer le port 4200 pour que l'application soit accessible
EXPOSE 4200

# Lancer le serveur de développement Angular
CMD ["npm", "start"]
