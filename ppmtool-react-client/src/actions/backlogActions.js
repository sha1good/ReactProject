 import axios from 'axios';
 import { GET_BACKLOGS, GET_PROJECT_TASK, DELETE_PROJECT_TASK,GET_ERRORS } from  './types';


 export const createBacklogByProjectTaskIdentifier= (projectTaskIdentifier, projectTask, history) => async dispatch =>{

    try{
      await axios.post(`/api/backlog/${projectTaskIdentifier}`, projectTask);
        history.push(`/projectBoard/${projectTaskIdentifier}`);
        dispatch({
            type: GET_ERRORS,
            payload:{}
        })
    } catch(error){
        dispatch({
            type: GET_ERRORS,
            payload : error.response.data
        
        })
    }
    
 } 


  export const getProjectTaskByProjectIdentifier = projectTaskIdentifier => async dispatch =>{

    try {
         const response = await axios.get(`/api/backlog/${projectTaskIdentifier}`);
            dispatch({
                type: GET_BACKLOGS,
                payload : response.data
            });
    } catch (error) {
          
        dispatch({
             type: GET_ERRORS,
             payload: error.response.data
        });
    }
  }


   export const getProjectTaskByProjectIdentifierAndProjectSequence =(projectIdentifier,projectSequence,history) => async dispatch =>{

      try {
           const response = await axios.get(`/api/backlog/${projectIdentifier}/${projectSequence}`);
            dispatch({
                type:GET_PROJECT_TASK,
                payload:response.data
            });
      } catch (error) {
          history.push("/dashboard");
      }
   };

    export const updateProjectTaskByProjectIdentifierAndProjectSequence =(projectIdentifier,projectSequence,projectTask,history) => async dispatch =>{

        try {
             const response = await axios.patch(`/api/backlog/${projectIdentifier}/${projectSequence}`,projectTask);
               history.push(`/projectBoard/${projectIdentifier}`);
               dispatch({
                    type:GET_ERRORS,
                    payload :{}
               })
        } catch (error) {
             dispatch({
                 type: GET_ERRORS,
                 payload: error.response.data
             });
        }
    }

 export const deleteProjectTaskByProjectIdentifierAndProjectSequence =(projectIdentifier,projectSequence) => async dispatch =>{
     
   if(window.confirm(`You are about to delete project task ${projectSequence}, this cannot be undone !`)){
      await axios.delete(`/api/backlog/${projectIdentifier}/${projectSequence}`)
       dispatch({
            type : DELETE_PROJECT_TASK,
            payload: projectSequence
       })
    }
 }
