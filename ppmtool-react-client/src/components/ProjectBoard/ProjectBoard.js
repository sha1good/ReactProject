import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import Backlog from './Backlog';
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getProjectTaskByProjectIdentifier} from '../../actions/backlogActions';

class ProjectBoard extends Component {

 //constructor to handle errors

 constructor(){
    super();

    this.state ={
       errors: {}
    };
 }

  componentDidMount(){
       const { id } = this.props.match.params;
     this.props.getProjectTaskByProjectIdentifier(id);
  }

   componentWillReceiveProps(nextProps){
      if(nextProps.errors){
         this.setState({ errors : nextProps.errors});
      }
   }
  render() {
     
    const { id } =  this.props.match.params;
    
     const { project_tasks } =  this.props.project_task;

     const { errors } = this.state;

     let BoardContent;

      const  boardAlgorithms = (errors, project_tasks) =>{
            if(project_tasks.length <1){
               //Meaning that , the project tasks is empty array list {// the projectIdentifier that i used here is the replacement of project Not found if the user passed in inavliad Project Identifier in the route/path on the browser}
               if(errors.projectIdentifier){
                   return (
                        <div className="alert alert-danger text-center" role="alert">
                          {errors.projectIdentifier}  
                        </div>
                   );
               }else{
                    return(
                      <div className="alert alert-info text-center" role="alert">
                        No Project Task on this Board
                      </div>
                    );
               }
            }else{
                 return <Backlog  project_tasks_props ={project_tasks}/>;
            }
      };

      BoardContent = boardAlgorithms(errors,project_tasks);

    return (
  
      <div className="container">
      <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
      </Link>
      <br />
      <hr />
     {BoardContent}
  </div>
)
  }
}

ProjectBoard.propTypes ={
    getProjectTaskByProjectIdentifier : PropTypes.func.isRequired,
    project_task: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

 const mapStateToProps = state =>({
    project_task : state.backlog,
    errors : state.errors
 })
export default  connect(mapStateToProps, {getProjectTaskByProjectIdentifier}) (ProjectBoard);