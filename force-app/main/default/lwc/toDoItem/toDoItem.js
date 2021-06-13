import { LightningElement,api } from 'lwc';

// use pubsup module if we want to pass info from one component to another and none of them share 
// the heirarchial structure

export default class ToDoItem extends LightningElement {

    @api todoId;
    @api todoName;
    @api done = false;


  
//    * Update handler to edit current item
//    * You can switch the item status between completed and uncompleted
//    * Make a call to server to update the item
  
  updateHandler() {
    //create todo object based to the current item
    const todo = {
      todoId: this.todoId,
      done: !this.done,
      todoName: this.todoName
    };

    updateTodo({ payload: JSON.stringify(todo) })
      .then(result => {
        //on successful update, fire an event to notify parent component
        const updateEvent = new CustomEvent("update", { detail: todo });
        this.dispatchEvent(updateEvent);
      })
      .catch(error => {
        console.error("Error in updatig records ", error);
      });
    }

    deleteHandler() {
    //make a call to server to delete item
    deleteTodo({ todoId: this.todoId })
      .then(result => {
        //on successful delete, fire an event to notify parent component
        this.dispatchEvent(new CustomEvent("delete", { detail: this.todoId }));
      })
      .catch(error => {
        console.error("Error in updatig records ", error);
      });
  }




    get containerClass(){
        return this.done ? "todo completed" : "todo upcoming"; 
    }

}