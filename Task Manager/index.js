const express = require('express');
const path = require('path'); // Import the 'path' module

const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs'); // Set EJS as the view engine

// Middleware to log requests
app.use(function (req, res, next) {
    console.log('middle');
    next();
});

// Route to render the 'index' view
app.get('/', function (req, res) {
    fs.readdir(`./files`, function (err, files) {
        console.log(files);
        res.render('index', { files: files });
    })
    // This should match a file 'index.ejs' in the 'views' directory
});

// Route to handle '/profile' requests
app.post('/create', function (req, res) {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function (err) {
        res.redirect("/");
    });
    // This should  a file 'index.ejs' in the 'views' directory
});


app.get('/files/:filename', function (req, res) {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, filedata) {
        res.render('show');
    })

});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
