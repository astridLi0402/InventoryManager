const router = require('express'). Router();
let Items = require('../models/items.model');

router.route('/'). get((req, res)=>{
    // mongoose method to get all crackers from mongodb db
    // in json format
    Items.find()
        .then(crackers => res.json(crackers))
        .catch(error => res.status(400).json('Error: ' + error));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const field = req.body.field;
    const price = Number(req.body.price);
    const count = Number(req.body.count);
    const date = Date.parse(req.body.date);

    const newCracker = new Items({
        name,
        field,
        price,
        count,
        date,
    });

    newCracker.save()
        .then(()=> res.json('Inventory Item added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// get one item by id
router.route('/:id').get((req, res) => {
    // get id directly from url
    Items.findById(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(400).json('Error: ' + err));
});

// update one item with item_id
router.route('/update/:id').post((req, res) => {
    // get id directly from url
    Items.findById(req.params.id)
        .then(item => {
            item.name = req.body.name;
            item.field = req.body.field;
            item.price = Number(req.body.price);
            item.count = Number(req.body.count);
            item.date = Date.parse(req.body.date);

            item.save()
                .then(() => res.json('Item updated!'))
                .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// delete one item with id
router.route('/:id').delete((req, res) => {
    Items.findByIdAndDelete(req.params.id)
        .then(() => res.json('An item deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// delet all items
router.route('/').delete((req, res) => {
    Items.deleteMany({})
        .then(() => res.json('All items deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
//nodemon server