CREATE DATABASE IF NOT EXISTS twitterdb;

USE twitterdb;

-- Création de la table pour les utilisateur
CREATE TABLE IF NOT EXISTS user (
  id INT NOT NULL AUTO_INCREMENT,
  login VARCHAR(50) NULL,
  password VARCHAR(50) NULL,
  description VARCHAR(200) NULL,
  pp INT(1) DEFAULT 1,
  PRIMARY KEY (id)
);

-- Création de la table pour les tweets
CREATE TABLE IF NOT EXISTS post (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT(10) NULL,
  content VARCHAR(144) NULL,
  date TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Création de la table pour les abonnements
CREATE TABLE IF NOT EXISTS abonnement (
  id INT(10) NOT NULL AUTO_INCREMENT,
  user_id INT(10) DEFAULT NULL,
  abonne_id INT(10) DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (abonne_id) REFERENCES user(id)
);

-- Création de la table pour les likes
CREATE TABLE IF NOT EXISTS likes (
  id int(10) NOT NULL AUTO_INCREMENT,
  user_id int(10) DEFAULT NULL,
  post_id int(10) DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (post_id) REFERENCES post(id)
);

-- Insertion de données dans les utilisateurs
INSERT INTO user (login, password, description, pp) VALUES ('Gama', 'password', 'Je suis toujours Gama', 9);
INSERT INTO user (login, password, description, pp) VALUES ('lolo', 'motdepasse', 'Je suis Lolo', 3);
INSERT INTO user (login, password, description, pp) VALUES ('Damas', 'copiercoller', 'Vive le copier-coller', 4);

-- Insertion de données dans les tweets
INSERT INTO post (user_id, content, date) VALUES (1, 'Salut les gars, cest mon premier tweet.', '2023-03-23');
INSERT INTO post (user_id, content, date) VALUES (2, 'Moi aussi', '2023-03-26');
INSERT INTO post (user_id, content, date) VALUES (3, 'Ne pas oublier le copier-coller', '2023-03-27');

-- Insertion de données dans les abonnements
INSERT INTO abonnement (user_id, abonne_id) VALUES (1, 2);
INSERT INTO abonnement (user_id, abonne_id) VALUES (2, 1);

-- Insertion de données dans les likes
INSERT INTO likes (user_id, post_id) VALUES (1, 2);
INSERT INTO likes (user_id, post_id) VALUES (1, 3);
INSERT INTO likes (user_id, post_id) VALUES (2, 3);