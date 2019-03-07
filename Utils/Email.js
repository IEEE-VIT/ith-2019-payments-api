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
               <html>
               <body>
               <div style="
                background-color: #D8D8D8;
                padding: 36px;
              ">
                <div
                    style="
                        padding: 24px;
                        background-color: #fff;
                        color: #000;
                        border-radius: 3px;
                        text-align: center;
                    "
                >
                <p><strong>Hi ${name},</strong></p>
                <p>Thank you for registering for ITH 2019.</p>
                <p>Your Reference ID is : <strong>${ref}</strong></p><br/>
                <div style="text-align: left;">
                <p>With regards,</p>
                <p>IEEE-VIT</p>
                </div>
                </div>
                <p
                style="
                font-size: 12px;
                color:#909090;"
                >Gorbachev Rd, Vellore, Tamil Nadu 632014</p>
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