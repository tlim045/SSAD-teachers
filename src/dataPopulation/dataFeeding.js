const axios = require('axios');

// axios.defaults.baseURL = "http://localhost:3000/";

const { questionBank } = require('./testData');

for(var i = 0; i < questionBank.length; i++){
    const data = {body: questionBank[i]}
    setTimeout(function(){
        axios.post('/createQuestion', data)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    },i * 2000)
}
