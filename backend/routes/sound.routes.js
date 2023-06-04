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

function getEveryNth(arr, nth) {
    const result = [];

    for (let index = 0; index < arr.length; index += nth) {
        result.push(arr[index]);
    }

    return result;
}

router.get("/latest", async (req, res) => {
    try {
        const url = dataJedi;
        const headers = {
            'Accept': 'application/vnd.ericsson.m2m.output+json;version=1.1'
        };
        const params = {
            resourceSpec: 'Grupa8Sound',
            latestNCount: 1
        };

        axios.get(url, { params, headers, auth, httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }) })
            .then(response => {
                console.log(response.data);
                let jsonData = response.data
                res.status(200)
                return res.json(jsonData.contentNodes)
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

router.get("/range", async (req, res) => {
    try {
        const time1 = req.query.t1
        const time2 = req.query.t2
        const url = dataJedi;
        const headers = {
            'Accept': 'application/vnd.ericsson.m2m.output+json;version=1.1'
        };
        const params = {
            resourceSpec: 'Grupa8Sound',
            maxPayloadsPerResource: 10000,
            t1: time1,
            t2: time2
        };

        axios.get(url, { params, headers, auth, httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }) })
            .then(response => {
                //console.log(response.data);
                let jsonData
                if (response.data.contentNodes.length > 100) {
                    jsonData = getEveryNth(response.data.contentNodes, Math.round(response.data.contentNodes.length / 100))
                }
                else {
                    jsonData = response.data.contentNodes
                }
                console.log(jsonData)
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