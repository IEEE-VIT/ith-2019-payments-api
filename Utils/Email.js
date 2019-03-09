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
        text: `
            Hi, ${name}\n
            You have successfully registered for ITH 2019.
            Your reference ID is : ${ref}

            With Regards,
            IEEE-VIT

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