const path = require('path');
const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT | 4444;

let express = require('express');



let app = express();
app.use(express.static(publicPath));


app.get('public');


app.listen(port, ()=>{
    console.log(`app listening on port ${port}`);
})
