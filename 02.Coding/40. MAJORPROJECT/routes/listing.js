const express= require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listings.js");

router.route("/")
.get(wrapAsync (listingController.index)) //Index Route
// .post(validateListing, isLoggedIn, wrapAsync(listingController.createListing)); //Create Route 
.post(upload.single('listing[image]'), (req,res) => {
res.send(req.file);
})
//new Route - to open the form to create new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing)) //Show Route - to print all data of an individual listing
.put(validateListing, isLoggedIn, isOwner, wrapAsync(listingController.updateListing)) //Update Route
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); //Delete Route

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;