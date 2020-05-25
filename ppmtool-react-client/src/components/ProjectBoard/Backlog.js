import React, { Component } from 'react'
import ProjectTask from './ProjectTasks/ProjectTask';

 class Backlog extends Component {
  render() {

      const { project_tasks_props   } = this.props;

       const tasks = project_tasks_props.map( project_task =>(
           <ProjectTask  key={project_task.id} projectTaskProps={project_task}/>
       ));

   let  todoItems = [];
   let inprogressItems = [];
   let doneItemItems = [];

   for(let i=0; i<tasks.length; i++){
        console.log(tasks[i]);
       if(tasks[i].props.projectTaskProps.status ==="TO_DO"){
        todoItems.push(tasks[i]);
       }

        if(tasks[i].props.projectTaskProps.status ==="IN_PROGRESS"){
             inprogressItems.push(tasks[i]);
        }

         if(tasks[i].props.projectTaskProps.status ==="DONE"){
             doneItemItems.push(tasks[i]);
         }
   }

    return (
       

        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-secondary text-white">
                            <h3>TO DO</h3>
                        </div>
                    </div>
                    {todoItems}
                    {
                        //Render your  task here
                    }  
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-primary text-white">
                            <h3>In Progress</h3>
                        </div>
                    </div>
                      {inprogressItems}
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-success text-white">
                            <h3>Done</h3>
                        </div>
                    </div>
                    {doneItemItems}
                </div>
            </div>
        </div>
    )
  }
}


export default Backlog;