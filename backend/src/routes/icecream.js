const express = require("express")
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const Icecream = require("../models/icecream")
const upload = multer({ storage: storage });

//create ice cream
router.post("/cice", upload.single("image"), async (req, res) => {
  try {
    const { name, price, quantity, type, keyword, like } = req.body;
    const file = req.file;
    
    const newIcecreamData = {
      name: name,
      price: price,
      quantity: quantity,
      type: type,
      keyword: keyword,
      like: like,
    };

    if (file) {
      newIcecreamData.image = {
        data: file.buffer,
        contentType: file.mimetype,
      };
    }
    newIcecreamData.price=parseFloat(newIcecreamData.price).toFixed(2);
    const newIcecream = new Icecream(newIcecreamData);
    const savedIcecream = await newIcecream.save();
    res.status(201).json(savedIcecream);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

// Retrieve all ice cream objects

router.get("/allice", async (req, res) => {
  try {
    // console.log("log1");
    const allIceCreams = await Icecream.find();
    // console.log("log2");
    const modifiedIceCreams = allIceCreams.map((ice) => ({
      _id: ice._id,
      name: ice.name,
      price: ice.price,
      image: ice.image && ice.image.data
        ? `data:${ice.image.contentType};base64,${ice.image.data.toString("base64")}`
        : null,
      quantity: ice.quantity,
      type: ice.type,
      keyword: ice.keyword,
      like: ice.like,
    }));
    modifiedIceCreams.price=parseFloat(modifiedIceCreams.price).toFixed(2)
    res.status(200).json(modifiedIceCreams);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

//get single icecream post

router.get("/ice/:id", async (req, res) => {
  try {
    const iceCreamId = req.params.id;

    // Find the ice cream by ID
    const iceCream = await Icecream.findById(iceCreamId);

    // Check if the ice cream exists
    if (!iceCream) {
      return res.status(404).json({ error: "Ice cream not found" });
    }
    const modifiedIceCreams = {
      _id: iceCream._id,
      name: iceCream.name,
      price: iceCream.price,
      image: iceCream.image && iceCream.image.data
        ? `data:${iceCream.image.contentType};base64,${iceCream.image.data.toString("base64")}`
        : null,
      quantity: iceCream.quantity,
      type: iceCream.type,
      keyword: iceCream.keyword,
      like: iceCream.like,
    }
    modifiedIceCreams.price=parseFloat(modifiedIceCreams.price).toFixed(2)
    res.status(200).json(modifiedIceCreams);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to retrieve ice cream" });
  }
});

// Filter by type of ice-cream 

router.get("/ice", async (req, res) => {
  try {
    const type = req.query.type;

    // Find the ice cream by ID
    const iceCream = await Icecream.find({type});

    // Check if the ice cream exists
    if (!iceCream) {
      return res.status(404).json({ error: "Ice cream not found" });
    }

    res.status(200).json(iceCream);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to retrieve ice cream hello" });
  }
});


//update the icecream
router.put("/uice/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, price, quantity, type, keyword, like } = req.body;
    const file = req.file;
    const iceCreamId = req.params.id;

    // Find the ice cream by ID
    const iceCream = await Icecream.findById(iceCreamId);

    // Check if the ice cream exists
    if (!iceCream) {
      return res.status(404).json({ error: "Ice cream not found" });
    }

    // Update the ice cream properties
    iceCream.name = name;
    iceCream.price = price;
    iceCream.quantity = quantity;
    iceCream.type = type;
    iceCream.keyword = keyword;
    iceCream.like = like;

    // Update the image if a new file is uploaded
    if (file) {
      iceCream.image = {
        data: file.buffer,
        contentType: file.mimetype,
      };
    }
    iceCream.price=parseFloat(iceCream.price).toFixed(2)
    // Save the updated ice cream
    const updatedIcecream = await iceCream.save();

    res.status(200).json(updatedIcecream);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update ice cream" });
  }
});

router.delete("/dice/:id", async (req, res) => {
  try {
    const iceCreamId = req.params.id;

    // Find the ice cream by ID and remove it
    const deletedIcecream = await Icecream.findByIdAndRemove(iceCreamId);

    // Check if the ice cream exists
    if (!deletedIcecream) {
      return res.status(404).json({ error: "Ice cream not found" });
    }

    res.status(200).json({ message: "Ice cream deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete ice cream" });
  }
});



module.exports = router;