const pool = require('../config/connect');
pool.on('error',(err)=> {
    console.error(err);
});

module.exports = {

    getArticles(req, res) {
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(`
                SELECT title, image_cover AS img, content, tags, created_at FROM articles WHERE deleted_at IS NULL`
            , function (error, results) {
                if(error) throw error;  
                res.json({ 
                    success: true, 
                    message: 'Success',
                    data: results 
                });
            });
            connection.release();
        })
    },
    getArticlesByID(req, res) {
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(`
                SELECT title, image_cover AS img, content, tags, created_at FROM articles WHERE deleted_at IS NULL AND id = ?`, [id]
            , function (error, results) {
                if(error) throw error;
                res.json({ 
                    success: true, 
                    message: 'Success',
                    data: results[0] ? results[0] : results 
                });
            });
            connection.release();
        })
    },
    addArticles(req, res) {
        let data = {
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(`
                INSERT INTO articles SET ?`, [data]
            , function (error, results) {
                if(error) throw error;
                res.json({ 
                    success: true, 
                    message: 'Berhasil insert data',
                });
            });
            connection.release();
        })
    },
    updateArticles(req, res) {
        let data = {
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags
        }
        let id = req.body.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(`
                UPDATE articles SET ? WHERE id = ?`, [data, id]
            , function (error, results) {
                if(error) throw error;
                res.json({ 
                    success: true, 
                    message: 'Berhasil update data',
                });
            });
            connection.release();
        })
    },
    deleteArticles(req, res) {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();

        const currentDate =year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

        let dataUpdate = {
            deleted_at : currentDate
        };
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(`
                UPDATE articles SET ? WHERE id = ?`, [dataUpdate, id]
            , function (error, results) {
                if(error) throw error;
                res.json({ 
                    success: true, 
                    message: 'Berhasil delete data',
                });
            });
            connection.release();
        })
    }
}