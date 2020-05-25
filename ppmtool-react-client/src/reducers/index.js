import { combineReducers } from "redux";
import errorReducer from './errorReducer';
import projectsReducers from './projectsReducers';
import backlogReducers from './backlogReducers';
import SecurityReducer from './SecurityReducer';

export default combineReducers({
    errors: errorReducer,
    project: projectsReducers,
    backlog : backlogReducers,
    security : SecurityReducer
});

//this is the combine reducer