module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT AVG(temp.freq) AS ravg FROM(SELECT c.uid, COUNT(c.id) AS freq FROM cookbook c GROUP BY c.uid ) temp";

        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            console.log(result)
            res.render('index.ejs', {
                ravg:result[0].ravg
            });
        });
    },
}