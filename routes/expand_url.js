const express = require("express");
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

// checking the hash
const checkHash = (hash) => {
    let originalUrl = null;
    for (let url of existingURLs){
        if (hash == url.hash){
            originalUrl = url.url;
            break;
        }
    }
    return originalUrl;
};

const deleteUrl = (hash) => {
    let index =  0;
    for (let i in existingURLs){
        if (hash === existingURLs[i].hash){
            break;
        }
        index ++;
    }
    existingURLs.splice(index, 1);
    return existingURLs;
}

// the route with params
router.get('/:hash', async (req, res) => {
    try{
        const url = await checkHash(req.params.hash);
        if (!url){
            const hash = req.params.hash;
            const message = `The is no longer URL registered for hash value '${hash}'`
            return res.status(404).json(message);
        }
        res.status(200).json(url);
    }catch(err){
        console.log(err)
        res.status(404).json(err);
    }
    
});

router.delete('/:hash', async (req, res) =>{
    try{
        const url = await checkHash(req.params.hash);
        if (!url){
            const hash = req.params.hash;
            const message = `The is no longer URL registered for hash value '${hash}'`
            return res.status(404).json(message);
        }
        const result = deleteUrl(req.params.hash);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(404).json(err);
    }
});

module.exports = router