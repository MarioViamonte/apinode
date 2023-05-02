const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
require('dotenv').config()
const app = express()
const port = 3000
const pass = process.env.pass

app.use(express.json())

//routes
app.get('/',(req, res) => {
    res.send('hello API')
} )

app.get('/blog',(req, res) => {
    res.send('hello blog')
} )

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const products = await Product.findById(id)
        res.status(200).json(products)
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/products/', async (req, res) =>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    }catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }

})

app.put('/products/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product){
           return res.status(404).json({message: `não encontrado produto com id ${id}`})
        }
        const updateproduct = await Product.findById(id)
        res.status(200).json(updateproduct)
    }catch (error){
        res.status(500).json({message: error.message})
    }
})

app.delete('/products/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if (!product){
            return res.status(404).json({message: `não encontrado produto com id ${id}`})
        }
        res.status(200).json(product)
    }catch (e) {
        res.status(500).json({message: error.message})
    }
})

mongoose.connect(`mongodb+srv://mario:${pass}@apinode.okdq7ai.mongodb.net/apinode?retryWrites=true&w=majority`)
.then(() => {
    console.log("conectado ao mongo")
        app.listen(port, ()=> {
        console.log(`rodando na porta ${port}`)
    });
}).catch(() => {
    console.log(error)
})


