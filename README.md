# 📖 BiblioNest

![BiblioNest](https://cdn.discordapp.com/attachments/1036283158481600534/1051165762657730680/BiblioNest.png)

**BiblioNest** est une application web qui vous permet de gérer votre bibliothèque personnelle. C'est un projet gratuit et open source, et il est disponible sur [GitHub](https://github.com/jabibamman/BiblioNest).

- Description de notre projet :

- Outils utilisés : `Prisma, NestJS, Angular, Docker, Postman, DBeaver, Bootstrap, Google API`

Nous avons utilisé prisma, postman et dbeaver pour le backend, et bootstrap, google api pour le frontend.

Nous avons aussi utilisé docker, prettier et eslint et le bind-mount de docker pour tout le projet.

- Languages utilisés :

Nous avons utilisé du NestJS pour le backend, du Angular pour le frontend.


**Versionning :**

Nous avons décidé d'utiliser le "Github flow" car nous pensons que cela correspond mieux à un projet où nous sommes plusieurs et où on travaille pendant plusieurs mois en se dispatchant les fonctionnalitées et en faisant des pull request une fois qu'elles sont testées et fonctionnelles.


**Fonctionnalités de l'application :**

- Différents choix effectués :
   - Nous avons décidés de laisser l'api de Google Book remplir les champs de l'application quand l'utisateur ne les remplis pas, car cela permet de gagner du temps et de ne pas avoir à remplir les champs manuellement.
   - Nous avons utilisé un système de pagination pour la liste des livres, car cela permet de ne pas avoir à charger tous les livres d'un coup, et de ne pas avoir à faire des requêtes trop lourdes. (semi-fonctionnel) 
   - Un système de recherche a été mis en place pour la liste des livres, car cela permet de ne pas avoir à chercher un livre parmi une liste trop longue. 
   - On a utilisé prisma pour la base de données, car cela permet de gagner du temps et de ne pas avoir à créer les requêtes manuellement.
   - Une page profil utilisateur a été créée, car cela permet de voir les informations de l'utilisateur.


**Contribuer :**

- Différents choix effectués :


**Déploiements :**

- Différents choix effectués :
  -  Pour deployer avec docker-compose il faudra faire 
        - `npm run start` pour initialiser le .env dans le **backend**
  -  ensuite soit:
     -   la prod: (biblionest-front-prod, biblionest-back, et db) :
         -   `docker-compose up db biblionest-front-prod biblionest-back`
     -   le dev: (biblionest-front, biblionest-back, et db) :
         -   `docker-compose up db biblionest-front biblionest-back`


**Tests Logociels :**

Nous n'avons pas utiliser de tests unitaires et fonctionnels par manque de temps, mais nous avons testé chaques fonctionnalitées à la main pour au moins valider les fonctions primaires de l'application.