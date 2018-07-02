const sendRequest = require('../helpers/index').sendRequest;
const async = require('async');

module.exports = {
    scrape: (req, res) => {
        if (!req.body.urls || !req.body.urls.length) {
            return res.status(400).send({
                error: true,
                message: 'Parameter required'
            });
        }
        var urls = req.body.urls;
        var output = {};        
        async.each(urls, function(url, callback) {
            console.log(url);
            sendRequest(url, function(err, data) {
                if (err) {
                    return callback();
                }

                output[url] = data;
                return callback();
            });
        }, function(err) {
            if (err) {
                return res.status(500).send({
                    error: true,
                    message: 'Internal server error'
                }); 
            }

            return res.status(200).send({
                error: false,
                data: output
            });
        });
    }
}