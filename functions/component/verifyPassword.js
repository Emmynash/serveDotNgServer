const admin = require('firebase-admin');

module.exports = (req, res) => {
    if (!req.body.code || !req.body.phone) {
        return res.status(422).send({ message: "code and phone are required!" })
    }

    const code = parseInt(req.body.code);
    const phone = String(req.body.phone).replace(/[^\d]/g, "");

    admin.database().ref('users/' + phone).on('value', snapshot => {
            const user = snapshot.val();
            console.log(snapshot.val());

            if (user.code !== code) {
                return res.status(422).send({
                    message: "code is invalid"
                });
            }

            return admin.database().ref('users/' + phone).update({
                codeValid: false
            })
        })

    admin.database().ref('users/' + phone).off();


    return admin.auth().createCustomToken(phone)
        .then((customToken) => {
            return res.send({ token: customToken });
        })
        .catch((error) => {
            res.status(422).send('Error creating custom token:', error);
        });
}