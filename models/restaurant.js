'use strict';

var admin = require('firebase-admin');

//firestore setup
admin.initializeApp({
    credential:admin.credential.applicationDefault()
});

//create an instance of our database connection
var db = admin.firestore();

//customize the db connection
const settings = {
    timestampsInSnapshots: true
};

//add settings to the connection
db.settings(settings);

//display a list of all restaurants
exports.restaurantList = async (req, res, next) => {
    var snapshot = await db.collection('restaurants').get();


//this is an attempt to send a dictionary indexed by the document 
var restaurantArray = [];

snapshot.docs.forEach((doc) => {
    var thisRestaurant = {"key": doc.id, "value":doc.data()};
    restaurantArray.push(thisRestaurant);
});

return restaurantArray;

}

//display a single restaurant by given id

exports.singleRestaurant = async (restaurantID) => {

    var restaurantData = await db.collection('restaurants').doc(restaurantID).get();

    return restaurantData;
}