const express = require('express');
const Employee = require('../models/employees');
const router = express.Router();

module.exports = router;



//FindEmployeeById API
router.get('/:empId', async(req, res) => {

    try {
        Employee.findOne({'empId': req.params.empId}, function(err, employee){
  
          //database level error message
          if(err){
            console.log(err);
            res.status(500).send({
              'message': "Internal Server Error"
            })
          }else{//no error return data
            console.log(employee);
            res.json(employee);
          }
        })
      }catch(e){//catch any potential errors we didn't prepare for
        console.log(e);
        res.status(500).send({
        'message': 'Internal Server Error',
          })
        }
  })
  //*end FindEmployeeById API
  

  //FindAllTasks API
router.get('/:empId/tasks', async(req, res) =>{

    try{
      Employee.findOne({'empId':req.params.empId, }, 'empId todo done', function(err,employee){
        if(err){
            console.log(err);
            res.status(500).send({
              'message': "Internal Server Error"
            })
        }else{
          console.log(employee);
          res.json(employee);
        }
      })
    }catch(e){
      console.log(e);
      res.status(500).send({
        'message': "Internal Server Error"
      })
    }
   })
  //*end FindAllTasks
  
  
  /*
  //CreateTask API
  app.post('/api/employees/:todo',async(req, res) =>{
    const item = new Item {
  
    }
  })
  
  //*End CreateTask
  
  
  
  //UpdateTask API
  app.post('/api/employees/:todo/:done',async(req, res) =>{
  
  })
  //*End UpdateTask
  
  
  
  
  //DeleteTask API
  app.post('/api/employees/:todo/:done', async(req, res) =>{
  
  })
  
  //*End Delete Task
  
  */