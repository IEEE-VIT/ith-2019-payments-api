require('dotenv').config();

var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

const sendDumpMail = (to,name) => {
    var options = {
        service: 'gmail',
        auth: {
            api_user: process.env.U,
            api_key: process.env.P
        }
    }
    var mailer = nodemailer.createTransport(sgTransport(options));

    var email = {
        to: [to],
        from: '"Team ITH" <noreply@ieeevit.com>',
        subject: 'ITH Payment Failure',
        text: `
            Hi, ${name}\n
            You have initiated payment on our registration portal, but looks like you have forgotten about it!\n
            Kindly re-register at http://ith.ieeevit.com\n

            With Regards,
            IEEE-VIT

        `
    };
     
    mailer.sendMail(email, function(err, res) {
        if (err) { 
            console.log(err) 
        }
        console.log('Dump email sent')
    });

}

module.exports = sendDumpMail;