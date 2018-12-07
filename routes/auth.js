var express = require('express');
var router = express.Router();
var firebase = require('firebase');

let config = {
    apiKey: "AIzaSyA1f3kyu8RSrEBoveUeXbc2sTx2fhqsUeY",
    authDomain: "tonal-bank-198910.firebaseapp.com",
    databaseURL: "https://tonal-bank-198910.firebaseio.com",
    projectId: "tonal-bank-198910",
    storageBucket: "tonal-bank-198910.appspot.com",
    messagingSenderId: "400192559764"
};

firebase.initializeApp(config);

var email = 'user@gmail.com';
var password = '1qaz2wsx';

/**
 * User sign in
 */
router.get('/', function(req, res, next) {
    let user = firebase.auth().currentUser;
    
    /* 
     * 檢查目前是否有session存在，若有則回傳，若無則重新sign in 
     * 換言之，A B可同時共用一組token
     * 
     * 備註：access token同時只有最新的那一組會有效。
     */
    if (user) {
        res.send(user)
    } else {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(result => {
                res.send(result.user)
            }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    res.send('Wrong password.');
                } else {
                    res.send(errorMessage);
                }
        });
    }
});

/**
 * User sign out
 */
router.get('/signOut', function(req, res, next) {
    firebase.auth().signOut().then(function() {
        res.send('Signed Out.');
    }, function(error) {
        res.send('Sign Out Error.');
    });
});

module.exports = router;
