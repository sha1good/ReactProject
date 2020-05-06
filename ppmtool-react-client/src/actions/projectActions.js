 import axios from 'axios';
 import {GET_ERRORS}  from './types';


  export const createProject =(project,history) => async dispatch =>{

     try{
             const response = await axios.post("http://localhost:5050/api/project",project)
            history.push("/dashboard")
     }catch(err){
             dispatch({
                  type: GET_ERRORS,
                 payload: err.response.data
             })
     }
  }
