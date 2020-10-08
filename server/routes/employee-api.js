/*
Title: WEB450 NodeBucket
Author: Professor Krasso
Date: October 2020
Modified By: Kimberly Pierce
Description: NodeBucket
*/


const express = require('express');
const Employee = require('../models/employees');
const itemSchema = require('../models/item');
const router = express.Router();
const BaseResponse = require('../services/base-response');
const ErrorResponse = require ('../services/error-response');
module.exports = router;



//FindEmployeeById API-test passed
router.get('/:empId', async(req, res) => {

    try {
        //throw new Error('Testing Error Response Object');

        Employee.findOne({'empId': req.params.empId}, function(err, employee){
  
          //database level error message
          if(err){
            console.log(err);
            const mongoDbErrorResponse= new ErrorResponse('500', 'Internal Server Error', err);
            res.status(500).send(mongoDbErrorResponse.toObject());

          //success response
          }else{
            console.log(employee);
            const employeeTasksResponse = new BaseResponse ('200', 'Query Successful', employee);
            res.json(employeeTasksResponse.toObject());
          }
        })

        //catch any potential errors we didn't prepare for
      }catch(e){
        console.log(e);
        const errorCatchResponse = new ErrorResponse('500','Internal Server Error', e.message);
        res.status(500).send(errorCatchResponse.toObject());
      }
  })
  //*end FindEmployeeById API
  

  //FindAllTasks API-test passed
router.get('/:empId/tasks', async(req, res) =>{

    try{
      
      Employee.findOne({'empId':req.params.empId, }, 'empId todo done', function(err,employee){//'empId todo done' projection to just access the data we need
        if(err){
            console.log(err);
            const findTaskMongoDbErrorResponse = new ErrorResponse ('500', 'Internal Server Error', err);
            res.status(500).send(findTaskMongoDbErrorResponse.toObject());
        }else{
          console.log(employee);
          const findTasksResponse = new BaseResponse ('200', "Success " , employee);
          res.json(findTasksResponse.toObject());
        }
      })
    }catch(e){
      console.log(e);
      const findTaskCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error', e.message);
      res.status(500).send(findTaskCatchErrorResponse.toObject());
    }
   })
  //*end FindAllTasks
  
  
  
  //CreateTask API tests passed!! 
  router.post('/:empId/tasks', async(req, res) =>{

    try{

      //find user by Id
      Employee.findOne({'empId':req.params.empId}, function(err,employee){

        //error response
        if(err){
          console.log(err);
          const createTaskMongoDbErrorResponse = new ErrorResponse ('500', 'Internal Server Error', err);
          res.status(500).send(createTaskMongoDbErrorResponse.toObject());

          //create new item
        }else{
          console.log(employee);
          const item = {
            text: req.body.text
          };

          //push item to do list
          employee.todo.push(item);

          //save item to database
          employee.save(function(err,updatedEmployee){

            //error response
            if(err){
              console.log(err);
              const createTaskOnSaveMongoDbErrorResponse = new ErrorResponse('500', "Internal Server Error", err);
              res.status(500).send(createTaskOnSaveMongoDbErrorResponse.toObject());
            }else{
              console.log(updatedEmployee);
              const createTaskOnSaveSuccessResponse = new BaseResponse ('200', "Your Task Has Been Added", updatedEmployee);
              res.json(createTaskOnSaveSuccessResponse.toObject());
            }
        })
      }
    })
    } catch (e){
      console.log(e);
      const createTaskCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error', e.message);
      res.status(500).send(createTaskCatchErrorResponse.toObject());
    }
  })
  
  //End CreateTask
  
  
  
  
  //UpdateTask API
  router.put('/:empId/tasks',async(req, res) =>{
    try{
      
      //find by empId
      Employee.findOne({ 'empId':req.params.empId }, function (err,employee ){

        //error response
        if(err){
          console.log(err);
          const updateTaskMongoDbErrorResponse = new ErrorResponse ('500', 'Internal Server Error', err);
          res.status(500).send(updateTaskMongoDbErrorResponse.toObject());

          //update task
        }else{
          console.log(employee);
          employee.set({
            todo:req.body.todo,
            done: req.body.done
          });

          //save updated task
          employee.save(function(err,updatedEmployee){

            //error response
            if(err){
              console.log(err);
              const updateTaskOnSaveMongoDbErrorResponse = new ErrorResponse ('500', 'Internal Server Error', err);
              res.status(500).send(updateTaskOnSaveMongoDbErrorResponse.toObject());

              //success response
            }else{
              console.log(updatedEmployee);
              const updatedTaskOnSaveSuccessResponse = new BaseResponse ('200', 'Update Successful', updatedEmployee);
              res.json(updatedTaskOnSaveSuccessResponse.toObject());
            }
          })
        }
      })  
          //catch all other errors
            } catch (e){
            console.log(e);
            const updateTaskCatchErrorResponse= new ErrorResponse ('500', 'Internal Server Error', e.message);
            res.status(500).send(updateTaskCatchErrorResponse.toObject());
            }
  })
  //End UpdateTask
  
  
  
  
  //DeleteTask API
  router.delete('/:empId/tasks/:taskId', async(req, res) =>{
    try{

      //search for task by empId
      Employee.findOne({'empId': req.params.empId}, function (err, employee){
        
        //error response
        if(err){
          console.log(err);
          const deleteTaskMongoDbErrorResponse = new ErrorResponse ('500', 'Internal Server Error', err);
          res.status(500).send(deleteTaskMongoDbErrorResponse.toObject());

        }else{
          console.log(employee);
          //search for tasks by ._id
          const todoItem = employee.todo.find(item => item._id.toString()=== req.params.taskId);
          const doneItem = employee.done.find(item => item._id.toString()=== req.params.taskId);

          //delete todo items
            if(todoItem){
              employee.todo.id(todoItem._id).remove();
              employee.save(function(err, updatedTodoItemEmployee){

              //error response
              if(err){
                console.log(err);
                const deleteToDoItemOnSaveMongoDbErrorResponse = new ErrorResponse ('500', 'Internal Server Error', err);
                res.status(500).send(deleteToDoItemOnSaveMongoDbErrorResponse.toObject());

                //success response
              }else{
                console.log(updatedTodoItemEmployee);
                const deleteToDoItemSuccessResponse = new BaseResponse('200', 'Item Removed', updatedTodoItemEmployee);
                res.json(deleteToDoItemSuccessResponse.toObject());
              }
              })

              //delete done items
              }else if (doneItem){ 
                employee.done.id(doneItem._id).remove();
                employee.save(function(err, updatedDoneItemEmployee){

                  //error response
                if(err){
                  console.log(err);
                  const deleteDoneItemOnSaveMongoDbErrorResponse = new ErrorResponse ('500', 'Internal Server Error', err);
                  res.status(500).send(deleteDoneItemOnSaveMongoDbErrorResponse.toObject());

                  //success response
              }else{
                  console.log(updatedDoneItemEmployee);
                  const deleteDoneItemSuccessResponse = new BaseResponse('200', 'Item Removed', updatedDoneItemEmployee);
                  res.json(deleteDoneItemSuccessResponse.toObject());
              }
            })

            //error response for invalid task 
            }else{
            console.log( 'Invalid Task Id');
            const deleteTaskNotFoundResponse = new ErrorResponse('200', 'Invalid Task Id', null);
            res.status(200).send(deleteTaskNotFoundResponse.toObject());
          }
        }
      })

      //catch all other errors response
    }catch(e){
      console.log(e);
      const deleteTaskCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error', e.message);
      res.status(500).send(deleteTaskCatchErrorResponse.toObject());
    }
  })   
  //*End Delete Task
  
