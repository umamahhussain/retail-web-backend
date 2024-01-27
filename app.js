const express=require('express');
const mongoose=require('mongoose');
const app=express();
const port=5000;
app.use(express.json());

// Connecting to the database
mongoose.connect("mongodb+srv://umamahhussain:umamah@cluster0.erk21jo.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log('Connected Successfully to DB'))
.catch((err) => { console.error(err); })

require('./models/admin');
require('./models/item');
app.use(require('./controllers/auth'));
app.use(require('./controllers/additem'));


app.listen(port,()=>
{
    console.log(`Server is running on ${port}`);
})