const admin = require('firebase-admin');

const createUser = (req, res) => {
    if (!req.body.phone && !req.body.email) {
        return res.status(422).send({ error: "Phone or Email cannot be empty" })
    }

    const phone = String(req.body.phone).replace(/[^\d]/g, "");
    const email = String(req.body.email);

    return admin.auth().createUser({ uid: phone, email: email })
        .then((user) => {
            return res.send(user);
        }).catch(err => { res.status(422).send({ error: err }) });
}

module.exports = createUser;