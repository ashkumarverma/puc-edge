var offerRequest = require("request");

var reqOfferGet = offerRequest.get("http://localhost:4000/offers", (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    //console.dir(JSON.parse(body));
    return JSON.parse(response.body);
});

module.exports = reqOfferGet;
