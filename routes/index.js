var express = require('express');
var router = express.Router();
var request = require('request')
const apiKey = require('./config')
const apiBaseUrl = 'http://api.themoviedb.org/3';
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300'
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;

/* GET home page. */
router.get('/', function(req, res, next) {
    request.get(nowPlayingUrl, (error, response, body)=>{
      // console.log(body)
      const parsedData = JSON.parse(body)
      // console.log(parsedData);
      // we now have the data from movieApi.
      // lets send it over to the view/EJS!
      res.render('now_playing',{
        parsedData: parsedData.results,
        imageBaseUrl: imageBaseUrl
      })
      // res.json(parsedData);
    })
  // res.render('index', { title: 'Express' });
});

router.get('/search', (req, res)=>{
  res.render('search', {title: 'Search'})
})

router.post('/search/movie', (req, res)=>{
  // submitted data from forms comes in the req object
  // querystring data, is in req.body
  res.json(req.body)
})
module.exports = router
