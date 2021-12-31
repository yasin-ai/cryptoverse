const express = require('express')
const axios = require('axios')
const newsr=express.Router()



newsr.get('/',async(req,res)=>{
    try {
        var url = 'https://kryptocal.com/api/events?fromDate=2021-12-31&toDate=2022-02-28';

        const news_get =await axios.get(url)
        res.render('event',{articles:news_get.data})




    } catch (error) {
        if(error.response){
            console.log(error)
        }

    }
})








module.exports=newsr