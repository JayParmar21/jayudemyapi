const User = require('../schema/userSchema');

exports.post = (body, done) => {
    User.findOne({ where: { email: body.email } }).then((result) => {
        if (result) {
            done({ message: 'Email Id Already Exist' });
        } else {
            User.create(body).then((newUser) => {
                if (newUser) {
                    done(null, newUser);
                } else {
                    done({ message: 'User Not Created' });
                }
            }).catch((err) => {
                done(err);
            });
        }
    }).catch((err) => {
        done(err);
    })
}

exports.postlogin = (body, done) => {
    User.findOne({ where: { email: body.email } }).then((result) => {
        if (result) {
            done(null, result);
        }
        else {
            done(err);
        }
    }).catch((err) => {
        done(err);
    });
}

exports.authEmail = (email, done) => {
    User.findOne({ where: { email: email } }).then((result) => {
        if (result) {
            done(true);
        } else {
            done(false);
        }
    }).catch((err) => {

        if (err) {
            done(false);
        }
    })
}