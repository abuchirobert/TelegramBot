require('dotenv').config()
console.log(process.env)
const express = require('express')
const app = express()
const axios = require('axios')
const path = require('path')

app.use(express.static('static'))
app.use(express.json())

const {Telegraf} = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN);

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname + '/index.html'));
})



bot.command('start', ctx=>{
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, "Hello there! Welcome to the Code Capsules Telegram Bot. \nI respond to /ethereum. Please try it", {

    })
})


bot.command('ethereum', ctx=>{
    var rate;
    console.log(ctx.from)
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
    .then(response =>{
        console.log(response.data)
        rate =  response.data.ethereum
        const message = 'Hello, the Ethereum rate today is '+rate.usd+'USD'
        bot.telegram.sendMessage(ctx.chat.id, message, {

        })
    })
})


bot.launch()
