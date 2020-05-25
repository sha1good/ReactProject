import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import classnames from 'classnames';
import {createBacklogByProjectTaskIdentifier }  from '../../../actions/backlogActions';

 class AddProjectTask extends Component {
     
    constructor(props){
         super(props); 
        // The  reason why we set this props is because, we are passing the ProjectTaskIdentifier in the url for us to submit the backlog
      
        const { id } = this.props.match.params;

       this.state ={
        summary : "",
        acceptanceCriteria : "",
        dueDate : "",
        priority: 0,
        status: "",
        projectIdentifier:id,
        errors: {}
       }  

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this); 
    }

    onChange(event){
          this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(event){
        event.preventDefault();

        const projectTask ={
            summary : this.state.summary,
            acceptanceCriteria : this.state.acceptanceCriteria,
            dueDate : this.state.dueDate,
            priority: this.state.priority,
            status: this.state.status
        }

        this.props.createBacklogByProjectTaskIdentifier(this.state.projectIdentifier,projectTask,                                                      this.props.history);
    }
     componentWillReceiveProps(nextProps){
         if(nextProps.errors){
             this.setState({errors: nextProps.errors});
         }
     }

  render() {

       const { id } = this.props.match.params;
        const { errors } = this.state;

    return (
        <div className="add-PBI">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to={`/projectBoard/${id}`} className="btn btn-light">
                        Back to Project Board
                    </Link>
                    <h4 className="display-4 text-center">Add  Project Task</h4>
                    <p className="lead text-center">Project Name + Project Code</p>
                    <form  onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="text" 
                            className={classnames("form-control form-control-lg", {"is-invalid": errors.summary})} name="summary" placeholder="Project Task summary"
                             value={this.state.summary} 
                             onChange={this.onChange}/>
                             {errors.summary && (
                                 <div className="invalid-feedback">{errors.summary}</div>
                             )}
                        </div>
                        <div className="form-group">
                            <textarea className={classnames("form-control form-control-lg",{"is-invalid":errors.acceptanceCriteria}
                         )} placeholder="Acceptance Criteria" name="acceptanceCriteria"
                              value ={this.state.acceptanceCriteria}
                              onChange={this.onChange}></textarea>
                        {errors.acceptanceCriteria && (
                             <div className="invalid-feedback">{errors.acceptanceCriteria}</div>
                        )}
                        </div>
                        <h6>Due Date</h6>
                        <div className="form-group">
                            <input type="date" className="form-control form-control-lg" name="dueDate" 
                            value={this.state.dueDate}
                            onChange={this.onChange}/>
                         </div>
                        <div className="form-group">
                            <select className="form-control form-control-lg" name="priority"
                            value={this.state.priority}
                            onChange={this.onChange}>
                                <option value={0}>Select Priority</option>
                                <option value={1}>High</option>
                                <option value={2}>Medium</option>
                                <option value={3}>Low</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <select className="form-control form-control-lg" name="status"
                            value={this.state.status}
                            onChange={this.onChange}>
                                <option value="">Select Status</option>
                                <option value="TO_DO">TO DO</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="DONE">DONE</option>
                            </select>
                        </div>

                        <input type="submit" className="btn btn-primary btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
    </div>

    )
  }
}

AddProjectTask.propTypes ={
    createBacklogByProjectTaskIdentifier :PropTypes.func.isRequired,
    errors :PropTypes.object.isRequired
}

 const mapStateToProps = state =>({
    errors : state.errors
 });

export default connect(mapStateToProps, {createBacklogByProjectTaskIdentifier}) (AddProjectTask);