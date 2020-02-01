var express = require('express');
var router = express.Router();
var User =require('../../model/User');
var bcrypt =require('bcryptjs');
var Post =require('../../model/Post');

router.get('/list',function (req,res) {
  User.find(function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"Internal Server Error ",
        error:err
      })
    }else {
      res.status(200).json({
        users:rtn
      });
    }
  })
})

router.post('/add',function (req,res) {
  var user =new User();
  user.name =req.body.name;
  user.email=req.body.email;
  user.password =req.body.password;
  user.save(function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"Internal Server Error ",
        error:err
      })
    }else {
      res.status(201).json({
        message:"User Account Created!!",
        users:rtn
      });
    }
  })
  })

  router.get('/:id',function (req,res) {
  User.findById(req.params.id,function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"Internal Server Error ",
        error:err
    })
  }else{
      res.status(201).json({
        users:rtn
      })
    }
  })
})

router.patch('/:id',function (req,res) {
  var update ={};
  for (var opt of req.body) {
    update[opt.proName]=opt.proValue
      }
  User.findByIdAndUpdate(req.params.id,{$set:update},function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"Internal Server Error ",
        error:err
    })
  }else{
      res.status(200).json({
        message:"User Account Updated"
      })
    }
  })
})

router.delete('/:id',function (req,res) {
  User.findByIdAndRemove(req.params.id,function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"Internal Server Error ",
        error:err
    })
  }else{
      res.status(200).json({
        message:"User Account Deleted"
      })
    }
  })
})
module.exports = router;
