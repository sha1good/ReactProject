import axios from 'axios';
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from './types';



export const createProject = (project, history) => async dispatch => {

        try {
                const response = await axios.post("/api/project", project)
                history.push("/dashboard");
                dispatch({
                        type: GET_ERRORS,
                        payload: {}
                });
        } catch (err) {
                dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                });
        }
};

export const getProjects = () => async dispatch => {
        const response = await axios.get("/api/project/all");
        dispatch({
                type: GET_PROJECTS,
                payload: response.data
        });
};

export const getProject = (id, history) => async dispatch => {

        try {
                const response = await axios.get(`/api/project/${id}`)
                // history.push("/dashboard")
                dispatch({
                        type: GET_PROJECT,
                        payload: response.data
                });
        } catch (errors) {
                history.push("/dashboard"); //trying to get the project that does not exist in the ui
        }

};

export const deleteProject = id => async dispatch => {
        if(window.confirm(
   "Are you sure you want to delete ? It will delete your project and all the data related to it" 
)
){
 await axios.delete(`/api/project/${id}`)
        dispatch({
                type: DELETE_PROJECT,
                payload: id
          })
        }
       
}