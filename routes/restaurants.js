var express = require('express');
var router = express.Router();

//require our model that has data we need
var restaurantModel = require('../models/restaurant.js');

// Get home page
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Restaurants'});
});

router.get('/all', async (req, res, next) =>  {
    var restaurantsFromDB = await restaurantModel.restaurantList();
    res.render('list', {title: 'All Restaurants', restaurants: restaurantsFromDB});
});

//get one restaurant
router.get('/:id', async (req, res, next) => {

try {
    //get a reference to the restaurant ID in the route
    res.locals.id = req.params.id;

    //create an instance of restaurant
    const restaurant = await restaurantModel.singleRestaurant(req.params.id);

    //display the restaurant information
    res.render('restaurant',{ restaurant: restaurant });

} catch(e) {
    res.send('Sorry! I can not find that one.' + e.message);
}

});

module.exports = router;