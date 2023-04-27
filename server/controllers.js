var mysql = require('mysql');

// Pour le développemnt en localhost
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "twitterdb"
// });

// Pour Docker
var con = mysql.createConnection({
  host: "db",
  user: "user",
  password: "pwd",
  database: "twitterdb"
});

// USER
module.exports.getUser = (req, res) => {
    con.query("SELECT * FROM user", function (err, result, fields) {
      if (err) throw err;
      res.json(result)
    });
}
module.exports.getUserById = (req, res) => {
  const id = parseInt(req.params.id);
    con.query(`SELECT * FROM user where id = ${id}`, function (err, result, fields) {
      if (err) throw err;
      res.json(result)
    });
}

module.exports.putUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const { login, password, description, pp } = req.body;

  con.query(`SELECT * FROM user WHERE id = ${id}`, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    var sql = `UPDATE user SET `
    if (login) {
      sql += ` login = '${login}' `
    }
    if (password) {
      sql += ` , password = '${password}' `
    }
    if (description) {
      sql += ` , description = '${description}' `
    }
    if (pp) {
      sql += ` , pp = '${pp}' `
    }

    sql += ` WHERE id = ${id} `

    con.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }

      con.query(`SELECT * FROM user WHERE id = ${id}`, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Erreur serveur' });
        }

        return res.json(result[0]);
      });
    });
  });
}
module.exports.getUserByLogin = (req, res) => {
  const login = req.params.login;
    con.query(`SELECT * FROM user where login = '${login}'`, function (err, result, fields) {
      if (err) throw err;
      res.json(result)
    });
}
module.exports.addUser = (req, res) => {
  const { login, password } = req.body;
    var sql = `INSERT INTO user ( login, password) VALUES ('${login}' , '${password}')`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json(result)
    });
}

// POST
module.exports.getPost = (req, res) => {
    con.query("SELECT * FROM post", function (err, result, fields) {
      if (err) throw err;
      res.json(result)
    });
}
module.exports.getPostByIdPost = (req, res) => {
  const id = parseInt(req.params.id);
    con.query(`SELECT * FROM post WHERE id = ${id}`, function (err, result, fields) {
      if (err) throw err;
      res.json(result)
    });
}
module.exports.getPostByIdUser = (req, res) => {
  const id = parseInt(req.params.id);
    con.query(`SELECT * FROM post WHERE user_id = ${id}`, function (err, result, fields) {
      if (err) throw err;
      res.json(result)
    });
}
module.exports.addPost = (req, res) => {
  const { user_id, content } = req.body;
    var sql = `INSERT INTO post (user_id, content) VALUES ('${user_id}' , "${content}")`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json(result)
    });
}

// ABONNEMENT
module.exports.getAbonnement = (req, res) => {
    con.query("SELECT * FROM abonnement", function (err, result, fields) {
      if (err) throw err;
      res.json(result)
    });
}
module.exports.getAbonnementByUserId = (req, res) => {
  const user_id = req.params.id
    con.query(`SELECT * FROM abonnement WHERE user_id = ${user_id}`, function (err, result, fields) {
      if (err) throw err;
      res.json(result)
    });
}
module.exports.getAbonnementByAbonneId = (req, res) => {
  const abonne_id = req.params.id
    con.query(`SELECT * FROM abonnement WHERE abonne_id = ${abonne_id}`, function (err, result, fields) {
      if (err) throw err;
      res.json(result)
    });
}
module.exports.postAbonnement = (req, res) => {
  const { user_id, abonne_id } = req.body
    var sql = `INSERT INTO abonnement ( user_id, abonne_id) VALUES ('${user_id}' , '${abonne_id}')`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json(result)
    });
}
module.exports.deleteAbonnement = (req, res) => {
  const id = parseInt(req.params.id);
    var sql = `DELETE FROM abonnement WHERE id = ${id}`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json(result)
    });
}

// LIKES
module.exports.getLikes = (req, res) => {
    con.query("SELECT * FROM likes", function (err, result, fields) {
      if (err) throw err;
      res.json(result)
    });
}
module.exports.getLikesBothId = (req, res) => {
  const { postId, userId } = req.params;
    con.query(
      `SELECT * FROM likes WHERE post_id = ${postId} AND user_id = ${userId}`,
      (error, results, fields) => {
        if (error) throw error;
        
        if (results.length === 0) {
          // L'utilisateur n'a pas encore aimé ce post
          con.query(
            `INSERT INTO likes (post_id, user_id) VALUES (${postId}, ${userId})`,
            (error, results, fields) => {
              if (error) throw error;
              res.send({ message: 'Like ajouté avec succès' });
            }
          );
        } else {
          // L'utilisateur a déjà aimé ce post
          con.query(
            `DELETE FROM likes WHERE post_id = ${postId} AND user_id = ${userId}`,
            (error, results, fields) => {
              if (error) throw error;
              res.send({ message: 'Like retiré avec succès' })
            })
        }
      }
    )
}
module.exports.getLikesByPostId = (req, res) => {
  const post_id = req.params.id
    con.query(`SELECT * FROM likes WHERE post_id = ${post_id}`, function (err, result, fields) {
      if (err) throw err;
      res.json(result)
    });
}
module.exports.getLikesByUserId = (req, res) => {
  const user_id = req.params.id
    con.query(`SELECT * FROM likes WHERE user_id = ${user_id}`, function (err, result, fields) {
      if (err) throw err;
      res.json(result)
    });
}