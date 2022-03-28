const router = require('express').Router();
const article = require('../controller/article-controller');


router.get("/articles", article.getArticles );
router.post("/articles", article.addArticles );
router.post("/articles/update", article.updateArticles );
router.get("/articles/:id", article.getArticlesByID );
router.get("/articles/delete/:id", article.deleteArticles );

module.exports = router;