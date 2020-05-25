import axios from 'axios';
import { SET_CURRENT_USER, GET_ERRORS} from './types';

import setJWTHeaders from '../SecurityUtils/setJWTHeaders';

import jwt_decode from 'jwt-decode';

export const createNewser=(newUser,history) =>async dispatch =>{

   try {
       await axios.post("/api/users/register",newUser);
       history.push("/login");
       dispatch({
           type:GET_ERRORS,
           payload:{}
       })
   } catch (error) {
       dispatch({
           type:GET_ERRORS,
           payload: error.response.data
       });
   }


}



 export const login = loginRequest => async dispatch =>{

    try {
        //Send a post request
  const res = await axios.post("/api/users/login", loginRequest);

     //Extract token from the response

      const { token } = res.data;

    //Store the token to the local storage
 localStorage.setItem("JWTToken",token);

 //set  the token in  the headers

 setJWTHeaders(token);

//Then decode token on react to collect claims(details) of the user
   const  decoded = jwt_decode(token);

//dispatch th token to our security reducer
    dispatch ({
         type:SET_CURRENT_USER,
         payload : decoded
    });
        
    } catch (error) {
          dispatch({
               type: GET_ERRORS,
               payload:error.response.data
          });
    }
  
 };

  export const logout =() => dispatch => {
      localStorage.removeItem("JWTToken");
      setJWTHeaders(false);
       dispatch({
                type:SET_CURRENT_USER,
                payload : {}
       });

  };


