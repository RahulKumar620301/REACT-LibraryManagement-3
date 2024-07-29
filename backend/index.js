const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer  = require('multer')
const mongoose= require('mongoose');
const path=require('path')

const app = express()
const port = 3000


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({origin: '*'}))
app.use('/uploads', express.static('uploads'));


const { Schema } = mongoose;
mongoose.connect('mongodb://127.0.0.1:27017/empdb');



const libSchema = new Schema({
    title: { type: String, required: [true,'title is Required'] },
    author: { type: String, required: [true,'Author is Required'] },
    image: { type: String, default: null },
    description: { type: String, required: [true,'Description is Required'] },
    price: { type: Number, required: [true,'Price is Required'] ,    
        min: [500, 'Min Values is 500'],
        max: [2000, 'Max Values is 2000'],
    },
    status:{ type: Boolean, default: true } ,
    category: { type: String, required: [true,'Category is Required'] },
})

const Lib = mongoose.model('Lib',libSchema);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, fileName)
    }
  })

  const upload = multer({
    storage: storage,
    limits: {    fileSize: 1024 * 1024 * 5     },
    fileFilter: (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {                                
        cb(null, true);        
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  })

  app.post('/',(req, res) => {
    r=req.body;
    console.log(r)
    let data  = new Lib({
        title:r.title,
        author:r.author,
        price:parseInt(r.price),
        status:r.status,
        category:r.category,
        image:r.image,
        description:r.description});
    data.save().then(() => res.send('Record Save'));
})

app.get('/:id',(req,res)=>{
  let id=req.params.id;
  Lib.findOne({_id:id}).then((result)=>res.send(result));
  })

app.get('/', (req, res) => {
    Lib.find().then((result)=>res.send(result));
    })
    
app.delete('/:id', (req, res) => {
    let id=req.params.id;
    Lib.deleteOne({_id:id}).then((result)=>{
        res.send(result)
    })
    })

    app.put('/:id', (req, res) => {
      let id=req.params.id;
      let r=req.body;
      console.log(r)
      let data  = {
        title:r.title,
        author:r.author,
        price:parseInt(r.price),
        status:r.status,
        category:r.category,
        image:r.image,
        description:r.description};
      Lib.updateOne({_id:id},data)
      .then((result)=>{res.send(result)})
      })

      app.patch('/status/:id', (req, res) => {
          let id=req.params.id;
          Lib.updateOne({_id:id},{$set:{status:req.body.status}}).then((result)=>{
              res.send(result);  
              })
          })
          app.patch('/image/:id',upload.single('image'), (req, res) => {
              let id=req.params.id;
              let img="http://localhost:3000/uploads/"+req.file.filename;
              Lib.updateOne({_id:id},{$set:{image:img}})
              .then((result)=>{ res.send(result); })
          })
          //http://localhost:3000/
          app.listen(port, () => console.log(`Ready`))
