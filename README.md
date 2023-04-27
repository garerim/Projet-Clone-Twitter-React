# Projet Clone Twitter - Matheo GARERI x Loris JACOB
Ce dépôt contient les fichiers nécessaires pour lancer une application avec Docker Compose. Cette application est une copie de Twitter créée avec un client front-end React JS et un back-end API en NodeJS connecté à une base de données MySQL. Pour utiliser cette application, suivez les étapes ci-dessous.

## Prérequis
Docker Desktop doit être installé sur votre machine. Vous pouvez le télécharger à partir de ce lien : https://www.docker.com/products/docker-desktop
## Installation
1. Clonez ce dépôt sur votre machine en utilisant la commande suivante : git clone https://github.com/mon-depot.git <br>
2. Ouvrez Docker Desktop et assurez-vous qu'il est en cours d'exécution. <br>
3. Ouvrez un terminal PowerShell et naviguez jusqu'au répertoire cloné à l'étape 1. <br>
4. Exécutez la commande suivante pour lancer l'application : docker-compose up <br>
L'application sera alors lancée et accessible à l'adresse http://localhost:3000. <br> La base de données sera lancée et accessible à l'adresse http://localhost:8123. <br>
Les ports peuvent être modifié dans le fichier docker-compose.yml (/!\Changer les ports également dans le client et le server/!\\)

Pour arrêter l'application, exécutez la commande docker-compose down ou faites le raccourci Ctrl+C dans le même répertoire.

## Configuration
Les paramètres de l'application peuvent être modifiés dans le fichier docker-compose.yml. Les variables d'environnement peuvent être modifiées pour configurer l'application en fonction de vos besoins. <br>
Le dossier "client" contient l'application React. <br>
Le dossier "server" contient le back-end NodeJS. <br>
Le fichier "init.sql" permet de créer les tables et insérer les données dans la base de données.

## Licence
Ce dépôt est sous licence MIT. Consultez le fichier LICENSE pour plus d'informations.
