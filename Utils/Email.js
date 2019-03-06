require('dotenv').config();

var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

const sendMail = (to,link,name) => {
    var options = {
        auth: {
            api_user: process.env.U,
            api_key: process.env.P
        }
    }
    var mailer = nodemailer.createTransport(sgTransport(options));

    var email = {
        to: [to],
        from: {
            email: 'noreply@ieeevit.com',
            name: 'Team ITH'
        },
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
                    "
                >
                <p>Hi ${name},</p>
                <p>Thank you for registering for ITH 2019.</p>
                <p>To confirm your participation, proceed to the payment portal by clicking on the button below.</p><br/>
                <a
                style="
                background-color: #2196f3;
                color: #fff;
                font-weight: bolder;
                padding: 8px 18px;
                font-size: 12px;
                border-radius: 3px;
                text-decoration: none;"
                href=${link}
                "
                >Finish Payment</a><br/>
                <p style="font-size: 10px; color: #B0B0B0;">Ignore this email if you have already paid</p>
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