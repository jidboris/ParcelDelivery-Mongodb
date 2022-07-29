const express = require("express");
const router = express.Router();
const parcelModel = require("../Modules/parcelModel")
const { mongoose } = require('mongoose');
const userController = require('../controllers/user');
router.use(express.json())

async function connect() {
    await mongoose.connect('mongodb://localhost:27017')
}
connect().then(() => console.log('connected to database')).catch((error) => { console.log('Error:', error()) })

router.post('/userSignup', userController.create);
router.post('/login', userController.authenticate)


// for each user to enter their parcel details
router.post('/', (req, res) => {
    const newParcel = new parcelModel(
        {
            Item: req.body.Item,
            attributes: req.body.attributes
        });
        
    newParcel.save()
    
    res.json(
        newParcel
    )
    console.log('New parcel', newParcel)
});
//This logic extracts all the parcel registered in database.
router.get('/', async (req, res) => {
        const Parcels = await parcelModel.find()
            
            console.log('Parcels', Parcels)
    res.json(Parcels)
});

//Logic uses the parcel id to get One Parcel detail
router.get('/:id', async (req, res) => {
    const Parcel = await parcelModel.findById(req.params.id).exec();
    if (!Parcel) 
    { 
        res.status(404).send('Parcel with the given id does not exist') 
     }
    
   else{ res.json(Parcel)
        console.log('parcel', Parcel)
}
});
//Logic to get the Item in a particular parcel
router.get('/parcelItem/:id', async (req, res) => {
    const Parcel = await parcelModel.findById(req.params.id).exec();
    if (!Parcel) {
        res.status(404).send('Parcel with the given id does not exist')
    }
    else {
         Parcel.Item = req.body.Item
         const PI = Parcel.Item
        res.json(PI)
        console.log('parcel', Parcel.Item)
    }
});

// Logic edits the parcel order details
router.put('/parcelEdit/:id', async (req, res) => {
    const Parcel = await parcelModel.findById(req.params.id);
    console.log(Parcel)
    if (!Parcel) {
     res.status(404).send('parcel with the given id does not exist')
     }
    else {Parcel.Item = req.body.Item
        Parcel.attributes = req.body.attributes
    const editParcel = await Parcel.save()
    console.log(editParcel)
    res.json(editParcel)
    }
});

// Logic for deleting parcel order 
    router.delete('/parcelDelete/:id', async (req, res) => {
        const Parcel = await parcelModel.findByIdAndRemove(req.params.id).exec()
        console.log('Parcel index', Parcel)
        if (!Parcel) res.status(404).send('parcel with the given id does not exist')
      const deleteParcel = await Parcel
        res.send('parcel deleted succesfully')
        console.log('deleted parcel', deleteParcel)
    });


module.exports = router