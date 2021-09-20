const express = require("express");
const nodeNotifier = require("node-notifier");
const router = express.Router();

const existingURLs = [
    { 
        id: "1", 
        url: "www.google.com", 
        hash: "MQ==" 
    },
    { 
        id: "2", 
        url: "www.facebook.com", 
        hash: "Mg==" 
    }
];

// get the url of using the hash
const getUrl = (hash) =>{
    for (let urls of existingURLs){
        if (hash === urls.hash){
            return urls.url;
        }
    }
    return null;
}

router.get("/", (req, res) => {
    res.send("Hello world!");
});

// redirect to external url
router.get("/:someHash", async (req, res) => {
    try{
        const url = await getUrl(req.params.someHash);
        res.redirect(`https://${url}`);
    }catch(err){
        console.log(err);
        res.send("Hash is not found");
    }
})

module.exports = router