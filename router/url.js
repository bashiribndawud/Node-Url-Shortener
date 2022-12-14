const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const createDB = require("../config/db");
const Url = require("../models/urlModel");

// async function connectToDB(){
//     try {
//         await createDB.authenticate();
//         console.log("Connection has been established successfully.");
//     } catch (error) {
//       console.error("Unable to connect to the database:", error); 
//     }
// }

const baseUrl = "http://localhost/1337/urlapi";

createDB.sync().then(() => {
    console.log('Connected to Database')
})


// connectToDB()


router.post("/", async (req, res) => {
  try {
    const { longUrl } = req.body;
    const shortId = nanoid(4);
    const shortUrl = await Url.create({
        longUrl,
        shortUrl: shortId
    })
    res.status(200).json({status: "Ok", shortUrl: `${baseUrl}/${shortId}`})
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/:short", async (req, res) => {
    let shortId = req.params.short;
    try {
        let url = await Url.findOne({ where: { shortUrl: shortId } });
        if(!url){
            res.status(404).send("Invalid short url")
        }
        return res.redirect(res.longUrl)
    } catch (error) {
       res.status(500).send(error) 
    }
})

module.exports = router;
