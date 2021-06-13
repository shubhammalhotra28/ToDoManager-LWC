import { LightningElement, track } from 'lwc';

import addTodo from "@salesforce/apex/ToDoController.addTodo";


export default class ToDoManager extends LightningElement {

    // making the properties as reactive properties : working as state (one way data binding)
    @track time = "8:16 PM";
    @track greeting = "Good Evening";

    @track todos = [];

    connectedCallback(){
        this.getTime();
        this.populateTodo();        
        setInterval( () => {
            this.getTime();
            console.log('set Interval called');
        },1000);


    }

    getTime(){
        const date = new Date();
        const hour = date.getHours();
        const min = date.getMinutes();

        this.time = `${this.getHour(hour)} : ${this.getDoubleDigit(min)} ${this.getMidDay(hour)}`

        this.setGreeting(hour);


    }

    getHour(hour){
        return (hour == 0) ? 12 : hour > 12 ? (hour - 12) : hour;
    }

    getMidDay(hour){
        return hour >= 12 ? "PM" : "AM"; 
    }

    getDoubleDigit(digit) {
        return digit < 10 ? "0"+digit : digit; 
    }

    setGreeting(hour){
        if (hour < 12){
            this.greeting = "Good morning";
        }
        else if (hour >= 12 && hour < 17){
            this.greeting = "Good Afternoon";

        }
        else{
            this.greeting = "Good Evening";
        }
    }

    addTodoHandler() {
        const inputBox = this.template.querySelector("lightning-input");

        const todo = {
            // toDoId : this.todos.length,
            todoName : inputBox.value,
            done: false
            // todoDate : new Date()
        };
        addTodo({payload : JSON.stringify(todo)}).then(response => {
            console.log('item inserted = 200');   
        }).catch(error => {
            console.log('error',' = error in insering todoItem' );
        });

        // this.todos.push(todo);
        inputBox.value = "";
    }


    populateTodo(){

        const todos = [
            {
            toDoId : 0,
            todoName : 'check1',
            done: false,
            todoDate : new Date()
            },
            {
                toDoId : 1,
                todoName : 'check2',
                done: false,
                todoDate : new Date()
            },
            {
                toDoId : 2,
                todoName : 'check3',
                done: true,
                todoDate : new Date()
            }
        ];
        this.todos = todos;

    }

    get upComingTasks(){
        return this.todos && this.todos.length ? this.todos.filter(todo => !todo.done) : [];
    }

    get completedTasks(){
        return this.todos && this.todos.length ? this.todos.filter(todo => todo.done) : [];
    }
    

  updateTodoHandler(event) {
    if (event) {
      this.fetchTodos();
    }
  }

  deleteTodoHandler(event) {
    if (event) {
      this.fetchTodos();
    }
  }
}