var express = require('express');
var router = express.Router();
// add this line
const request =require('request');



/* GET home page. */
router.get('/',(req, res, next)=>{

  //added the following 5line( be sure to add_the_API_key)
  const url="http://api.giphy.com/v1/gifs/random?api_key=OJLCQ36gkrkp8D0yNA5QcJofn2VKmT81";
  // we are requiring Request and assigning it to the variable
  //request–now we can access all of Request's functionality through that variable.
  request.get(url,(err,response,body)=>
{
  if(err){console.error(err)}

  body = JSON.parse(body);
  const imgUrl=body.data.image_url
  //will print messages in your terminal because this code runs on the server;
  res.render('index', { title: 'Make School Giphy',imgUrl:imgUrl });
  }
);
});

router.get('/search',(req,res,next)=>
{
  res.render('search');
})
module.exports = router;

router.post('/search',(req,res,next)=>
{
  const query=req.body['giphy-query']
  const url='http://api.giphy.com/v1/gifs/search?api_key=OJLCQ36gkrkp8D0yNA5QcJofn2VKmT81&q=${query}';

  request.get(url,(err,response,body)=>{

    if(err){console.error(err)}

    body=JSON.parse(body);

    const randomResult = body.data[Math.floor(Math.random() * body.data.length)];
    const searchResultUrl = randomResult.images.fixed_height.url;

    //pass the URL
    console.log(body);
    res.render('search', { searchResultUrl: searchResultUrl });
  });

});
