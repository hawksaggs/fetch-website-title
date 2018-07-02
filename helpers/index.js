const request = require('request');
const cheerio = require('cheerio');

exports.sendRequest = (url, callback) => {
    request(url, function(error, response, html) {
        if (!error) {
            if (response.statusCode === 200) {
                const $ = cheerio.load(html);
                const webpageTitle = $("title").text();
                const metaDescription =  $('meta[name=description]').attr("content");
                const webpage = {
                    title: webpageTitle,
                    metaDescription: metaDescription
                }

                return callback(null, webpage);
            }

            return callback(null, {});
        }

        return callback(error);
    });
}