require('dotenv').config();

var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

const sendMail = (to,ref,name) => {
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
        subject: 'ITH 2019',
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
            background-color: #fff;
            "
            >

            <p>Hi ${name},</p>
            <p>Congratulations! You have successfully registered for ITH 2019.</p>
            <p>Your reference ID is <strong>${ref}</strong></p>
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
            font-size: 10px;
            padding: 4px;
            "
            >
            <p>Vellore Institute of Technology, Vellore, Tamil Nadu 632014</p>
            <p>+91 91592 89775</p>
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
        console.log('Email sent')
    });

}

module.exports = sendMail;