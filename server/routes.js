//imports
const router = require('express').Router();
const {getUser,
     getUserById, 
     getUserByLogin, 
     getPost, 
     getPostByIdPost,
     getPostByIdUser,
     addPost,
     addUser,
     putUserById,
     getAbonnement,
     getAbonnementByUserId,
     getAbonnementByAbonneId,
     postAbonnement,
     deleteAbonnement,
     getLikes,
     getLikesBothId,
     getLikesByPostId,
     getLikesByUserId


} = require('./controllers.js');

// Destination

router.get('/user', getUser) // Recuperer tous les users
router.get('/user/id/:id', getUserById) // Recuperer un user grâce à l'id
router.put('/user/put/:id', putUserById) // Modification d'un user grâce à l'id
router.get('/user/login/:login', getUserByLogin) // Recuperer un user grâce au login

router.get('/post/', getPost) // Recuperer tous les posts
router.get('/post/post/:id', getPostByIdPost) // Recuperer un post grâce à l'id
router.get('/post/user/:id', getPostByIdUser) // Recuperer tous les posts grâce à l'id d'un suer

router.post('/addpost', addPost) // Ajouter un post
router.post('/adduser', addUser) // Ajouter un user

router.get('/abonnement', getAbonnement) // Recuperer tous les abonnements
router.get('/abonnement/user/:id', getAbonnementByUserId) // Recuperer tous les abonnés d'un user grâce à son id
router.get('/abonnement/abonne/:id', getAbonnementByAbonneId) // Recuperer tous les abonnement d'un user grâce à son id
router.post('/abonnement/', postAbonnement) // Ajouter un abonnement
router.delete('/abonnement/delete/:id', deleteAbonnement) // Supprimer un abonnement

router.get('/likes/', getLikes) // Recuperer tous les likes
router.get('/likes/post/:id', getLikesByPostId) // Recuperer tous les likes d'un post grâce à son id
router.get('/likes/user/:id', getLikesByUserId) // Recuperer tous les likes d'un user grâce à son id 
router.get('/likes/both/:postId/:userId', getLikesBothId) // Si post pas liké => Ajouter un like SINON le retirer
// router.post('/likes/both/:postId/:userId', addLike);
// router.delete('/likes/both/:postId/:userId', removeLike);


//export
module.exports = router;