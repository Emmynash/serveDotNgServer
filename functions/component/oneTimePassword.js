const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const nodemailer = require('nodemailer');
// const Nexmo = require('../nexmo');

// admin.initializeApp();

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'emmy4nash@gmail.com',
        pass: '@djnsTing99'
    }
});


module.exports = (req, res) => {
    if (!req.body.phone || !req.body.email) {
        return res.status(422).send({ error: "Phone number and email are required!" })
    }

    const phone = String(req.body.phone).replace(/[^\d]/g, "");
    const email = String(req.body.email);

    const code = Math.floor((Math.random() * 8999 + 1000))


    return admin.auth().getUser(phone)
        .then(userRecord => {

            return cors(req, res, () => {

                // getting dest email by query string
                //  const dest = req.query.dest;

                const mailOptions = {
                    from: 'Cyberve Tecchnologies <e.akita91t@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
                    to: email,
                    subject: 'Sign up code!', // email subject
                    html: `<p style="font-size: 16px;">Your code is ${code}</p>
                <br />
                <img src="../../Serve/assets/icon.png" />
            ` // email content in HTML
                };

                // returning result
                return transporter.sendMail(mailOptions, (erro, info) => {
                    if (erro) {
                        return res.send(erro.toString());
                    }
                    return admin.database().ref('users/' + phone)
                        .update({
                                code: code,
                                email: email,
                                codeValid: true
                            },
                            () => {
                                res.send({
                                    success: true
                                })
                            }
                        )

                });

            });

        })
        .catch(error => res.send({ error: error }))



    //         return Nexmo.message.sendSms((from, to, text),
    //             (error) => {
    //                 if (error) {
    //                     return res.status(422).send({ error: error })
    //                 }
    //                 return admin.database().ref('users/' + details)
    //                     .update({
    //                             code: code,
    //                             email: email,
    //                             codeValid: true
    //                         },
    //                         () => {
    //                             res.send({
    //                                 success: true
    //                             })
    //                         }
    //                     )
    //             },
    //             (error) => {
    //                 return res.send({ error: error });
    //             })

    // .catch(error => res.send({ error: error }));

}