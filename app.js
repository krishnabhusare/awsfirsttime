const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const dirname = path.dirname('');

const sequelize = require('./util/database');

const Expense = require('./models/expense');






const app = express();
app.use(express.json());
app.use(cors());

app.post('/expense/add-expense', async (req, res, next) => {
    try {
        const { amount, description, category } = req.body;
        await Expense.create({ amount, description, category });
    }
    catch (err) {
        res.status(500).json({ message: 'failed while adding expenses' });
    }



})

app.get('/expense/get-expense',async(req,res,next)=>{
    try{
        const allexpenses = await Expense.findAll();
        res.status(200).json({message:'successfully got all expenses',allexpenses});

    }catch(err){
        res.status(500).json({message:'failed while getting expenses'});
    }
})

app.use((req,res,next)=>{
   
    res.sendFile(path.join(__dirname,`public/${req.url}`));
   
})







sequelize.sync({})
    .then(() => {
        app.listen(3000);
    })
