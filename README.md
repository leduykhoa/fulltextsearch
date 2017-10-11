## Demo

[demo](https://fulltextsearchdemo.herokuapp.com/twitter_user)

## Installation

install via npm:
```bash
npm install fulltextsearch --save
```
## Basic Usage
1. Include
```javascript
const fullTextSearch = require('fulltextsearch');
var fullTextSearchVi = fullTextSearch.vi;
```
2. Router
```javascript
/* GET list json */
router.get('/list.json', function (req, res) {
    var filter = {};
    if (req.query.name != '') {
        filter.name = new RegExp(fullTextSearchVi(req.query.name), "i");
    }
    if (req.query.screen_name != '') {
        filter.screen_name = new RegExp(req.query.screen_name, "i");
    }
    if (req.query.location != '') {
        filter.location = new RegExp(fullTextSearchVi(req.query.location), "i");
    }
    if (req.query.status != '') {
        filter.description = new RegExp(fullTextSearchVi(req.query.description), "i");
    }

    collection.find(filter).toArray(function (err, result) {
        if (err != null) {
            req.flash('danger', err.message);
        }
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({data: result});      
    });
});
```