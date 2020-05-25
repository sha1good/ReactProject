import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { deleteProjectTaskByProjectIdentifierAndProjectSequence } from '../../../actions/backlogActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class ProjectTask extends Component {

    onDeleteClick =(projectIdentifier,projectSequence)=>{
          this.props.deleteProjectTaskByProjectIdentifierAndProjectSequence(projectIdentifier,projectSequence)
    }

  render() {

     const  { projectTaskProps } =  this.props;
       
     let priorityString;
     let priorityClass;

     if(projectTaskProps.priority===1){
        priorityClass ="bg-danger text-light"
        priorityString ="HIGH"
     }

     if(projectTaskProps.priority===2){
         priorityClass ="bg-warning text-light"
         priorityString= "MEDIUM"
     }
      if(projectTaskProps.priority===3){
           priorityClass= "bg-primary text-light"
            priorityString ="LOW"
      }

    return (
       
         <div className="card mb-1 bg-light">

             <div className={`card-header text-primary ${priorityClass}`}>
                 ID: {projectTaskProps.projectSequence} --
                  Priority: {priorityString}
             </div>
             <div className="card-body bg-light">
                 <h5 className="card-title">{projectTaskProps.summary}</h5>
                 <p className="card-text text-truncate ">
                     {projectTaskProps.acceptanceCriteria}
                 </p>
                 <Link to={`/updateProjectTask/${projectTaskProps.projectIdentifier}/${projectTaskProps.projectSequence}`} className="btn btn-primary">
                     View / Update
                 </Link>

                 <button className="btn btn-danger ml-4" onClick={this.onDeleteClick.bind(this,projectTaskProps.projectIdentifier,projectTaskProps.projectSequence)}>
                     Delete
                 </button>
             </div>
         </div>

    )
  }
}

 ProjectTask.propTypes = {
      deleteProjectTaskByProjectIdentifierAndProjectSequence : PropTypes.func.isRequired
 }

export default connect(null, {deleteProjectTaskByProjectIdentifierAndProjectSequence}) (ProjectTask);