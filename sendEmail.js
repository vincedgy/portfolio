var nodemailer = require("nodemailer");
// create reusable transporter object using SMTP transport

var CONFIG = {
    "SERVICE": "Gmail",
    "USER": "vincent.dagoury@gmail.com",
    "PASSWORD": "uagodymudpcwpstq"
};

function sendMail() {
    var transporter = nodemailer.createTransport({
        service: CONFIG.SERVICE,
        auth: {
            user: CONFIG.USER,
            pass: CONFIG.PASSWORD
        }
    });

    this.send = function(err, pEmailto, pWebsitename, pName, pEmail, pSubject, pMessage, callback) {
        if (pEmailto != '' && pWebsitename != '' && pName != '' && pEmail != '' && pSubject != '' && pMessage != '') {
            console.log('Sending message : ' + pEmailto + ':' + pWebsitename + ':' + pName + ':' + pEmail + ':' + pSubject + ':' + pMessage);
            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: pName + '<' + pEmail + '>', // sender address
                to: pEmailto, // list of receivers
                subject: 'From ' + pWebsitename + ':' + pSubject, // Subject line
                text: pMessage, // plaintext body
                html: pMessage // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return err(error);
                } else {
                    return callback(info.response);
                }
            });
        } else {
            return err('Missing arguments');
        }
    };
};

module.exports = new sendMail();

