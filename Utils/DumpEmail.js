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
        html: `
        <!doctype html>
        <html>
        <head>
        <meta name="viewport" content="width=device-width">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Thank you for registering for ITH 2019</title>
        </head>
        <body>
        <div
        style="
        background-color: #F0F0F0;
        padding: 34px;
        "
        >

            <div
            style="
            padding: 24px;
            color: #000;
            "
            >

            <p>Hi ${name},</p>
            <p>Your registration for ITH 2019 is pending!</p>
            <p>Click <a href='http://ith.ieeevit.com/register'>here</a> to finish your registration process.</p>
            <br/>
            <p>We hope to see you soon! :)</p>
            <br/>
            <br/>
            <p>With Regards,</p>
            <p>IEEE-VIT</p>
            </div>

            <div
            style="
            text-align: center;
            color: #BEBEBE;
            "
            >
            Vellore Institute of Technology, Vellore, Tamil Nadu 632014
            +91 91592 89775
            </div>
        </div>
        </body>
        </html>
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