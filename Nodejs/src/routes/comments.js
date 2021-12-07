var express = require('express');
var router = express.Router();
const CommentModel = require('../models/comment.model');


//GET comments . //
router.get('/', async (req, res) => {  
 
   const comment = await CommentModel.find().sort({date : -1});
	res.json(comment);

  })

  router.delete("/delete/:id", async (req, res) => {
    const id=req.params.id;

             CommentModel.findByIdAndRemove(id, function(err){
                if(err){
                    console.log(error)
              
              } else {

                }
             });

        
    });

    router.post("/add", async (req, res) => {
  
        const matchs = req.body.matchs;
        const description = req.body.description;
        const date = req.body.date; 
      
       const comment = new CommentModel({
                    matchs :matchs,
                    description : description,
                    date : date,
          });
          
        try {
          await comment.save();
       
        } catch(error){}
       
      });

  router.put("/update", async (req, res) => {
  
    const id = req.body.id;
    const matchs = req.body.matchs;
    const description = req.body.description;
    const date = req.body.date; 
  
    try {
  
      const result = await CommentModel.updateOne({id},{
                matchs :matchs,
                description : description,
                date : date,
      });
      console.log(result);
   
    } catch(error)
      {
        console.log("error");
      }
   
  });
  
  
  module.exports = router;
