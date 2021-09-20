const express = require("express");
const btoa = require('btoa');
const router = express.Router();
const fetch = require("fetch").fetchUrl;

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

// encoding: longUrl => shortUrl
const createShortUrl = (url) => {
    encodedString = btoa(url);
    return encodedString;
}

// create a new id
const getId = () => {
    let id = 0;
    for (let url in existingURLs){
        id++;
    }
    return id + 1;
}

// check whether the url is exist
const checkUrl = (data) =>{
    let status = true
    for (let urls of existingURLs){
        if (data === urls.url){
            status = false;
            break;
        }
    }
    return status;
}

const validateUrl = (url) => {
    // check protocol 
    if (url.slice(0,8) === "https://"){
        url = url.slice(8);
    }else if (url.slice(0,7) === "http://"){
        url = url.slice(7);
    }

    // remove www
    if (url.slice(0,4) === "www."){
        url = url.slice(4);
    }

    // check others
    let pattern = new RegExp('((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                            '(\\#[-a-z\\d_]*)?$','i'  // fragment locator
                        );    
    returnData = [pattern.test(url), url];
    return returnData;
}

// add record into the array
router.post('/', async (req, res) => {
    try{
        // validate url
        const validationResult = await validateUrl(req.body.url);
        if (!validationResult[0]){
            return res.status(404).json("Invalid url");
        }

         // convert url
        url = `www.${validationResult[1]}`;

        // check Url is used or not
        const status = await checkUrl(url);
        if (!status){
            return res.status(404).json("The url is used");
        }

        // generate hash value
        const hashValue = await createShortUrl(url); // getting hash value
        let id = await getId();
        const result = {id, url, hashValue};
        existingURLs.push(result);
        
        res.status(200).json(existingURLs);

    }catch(err){
        console.log(err)
        return res.send("Unable to shorten url")
    }
});

module.exports = router