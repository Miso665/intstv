const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");
const { urlencoded } = require('express');
const PORT = process.env.PORT || 5000;


const routers = {
    '/api/temperatura': require('./routes/temperatura.routes'),
    '/api/buka': require('./routes/buka.routes'),
    '/api/ljudi': require('./routes/ljudi.routes'),
}

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

//definicije ruta
for (const path in routers) {
    app.use(path, routers[path]);
}

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
    });
}

//slusanje na portu
app.listen(PORT, () => {
    console.log(`Server je na portu ` + PORT);
});