const express = require('express');
const app = express();
app.use(express.static('./dist'));
// Run the app by serving the static files
// in the dist directory
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080,()=>
{
    console.log("app is running");
});