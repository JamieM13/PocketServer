let express = require("express");
let app = express();

// app.get('/', (req, res) =>{
//     res.send("this is the root page");
// })

app.use('/', express.static('public'));

app.get('/about', (req, res) =>{
    res.send("this is the about page");
})

app.listen(3000, () => {
    console.log("listening at 3000");
})