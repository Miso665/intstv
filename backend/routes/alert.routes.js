const express = require("express");
const router = express.Router();
const fetch = require("node-fetch")
const axios = require("axios")
//const base64 = require('base-64');
require('dotenv').config();
const dataJedi = process.env.DATAJEDI
const auth = {
    username: process.env.USER,
    password: process.env.PASSWORD
};

router.post("/", async (req, res) => {
    try {
        const url = dataJedi;
        const headers = {
            'Content-Type': 'application/vnd.ericsson.simple.input.hierarchical+json;version=1.0'
        };
        const json = JSON.stringify({
            "deviceId": "Grupa8VirtualInstance",
            "header": {
                "timeStamp": new Date().getTime()
            },
            "body": {
                "Grupa8VirtualAktuator": {
                    "Grupa8Alarm": 1
                }
            }
        })

        axios.post(url, json, { headers, auth, httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }) })
            .then(response => {
                console.log(response.data);
                let jsonData = response.data
                res.status(200)
                return res.json(jsonData)
            })
            .catch(error => {
                console.error(error);
                return res.status(400).send("Bad request");
            });
    } catch (err) {
        console.log(err);
        res.status(501).send("Server error");
    }
});



module.exports = router;