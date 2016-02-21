var path = require('path'),
    querystring = require('querystring'),
    https  = require('https'),
    config = require('../config.js'),
    sendEmail = require(path.join(config.API_DIR,'sendEmail.js'));

module.exports = function (req, res) {

    var emailto = req.body.emailto;
    var websitename = req.body.websitename;
    var formName = req.body.formName;
    var formEmail = req.body.formEmail;
    var formSubject = req.body.formSubject;
    var formMessage = req.body.formMessage;
    var gReCaptchaResponse = req.body['g-recaptcha-response'];
    var ReCaptchaSecret="6Le6yhgTAAAAAPcYNrH7bYUqrpqOHAjUAwR4cCaf";


    function sendEmailError(err) {
        console.error(err);
        return res.status(500).send(err);
    }

    function sendEmailSuccess(message) {
        console.log(message);
        res.status(200).send('Email sent ' + message);
    }

    var callback = function(res) {
        //console.log("STATUS: " + res.statusCode);
        //console.log("HEADERS: " + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var str = "";
        res.on('data', function (chunk) {
            str += chunk;
        });
        res.on('end', function () {
            //console.log(str);
            var strKeys = JSON.parse(str);
            if (strKeys && strKeys["success"] === true) {
                return sendEmail.send(sendEmailError, emailto, websitename, formName, formEmail, formSubject, formMessage, sendEmailSuccess);
            } else {
                sendEmailError("Captcha can't be verified. Please, try again.")
            }
        });
        req.on('error', function (e) {
            console.log("problem with request: ${e.message}");
        });
    };

    var postData = querystring.stringify({
        "secret" : ReCaptchaSecret,
        "response" : gReCaptchaResponse,
        "remoteip" : req.connection.remoteAddress
    });

    var options = {
        host: "www.google.com",
        path: "/recaptcha/api/siteverify",
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };

    var req = https.request(options, callback);
    req.write(postData);
    req.end();

};