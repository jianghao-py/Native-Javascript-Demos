<template>
  <div id="app">
      <div class="todo-container">
        <div class="todo-wrap">
          <my-header :receiveInput="receiveInput"></my-header>
          <list :todos="todos" :changeCompleted="changeCompleted" :delInput="delInput"></list>
          <my-footer :todos="todos" :delAllCompleted="delAllCompleted"></my-footer>
        </div>
      </div>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader.vue'
import MyFooter from './components/MyFooter.vue'
import List from './components/List.vue'

export default {
  name: 'App',
  components: {
    MyHeader,
    MyFooter,
    List  
  },
   data(){
        return{
            todos:JSON.parse(localStorage.getItem("todos")) || []
        }
    },
    methods:{
        receiveInput(value){
          this.todos.unshift(value)
        },
        changeCompleted(id){
          this.todos.forEach((todo)=>{
            if(todo.id === id){
              todo.completed = !todo.completed;
            }
          })
        },
        delInput(id){
          this.todos = this.todos.filter(todo =>{
            return todo.id != id;
          })
        },
        delAllCompleted(){
        this.todos = this.todos.filter(todo =>{
          return !todo.completed;
        })
      }

    },
    watch:{
      todos:{
        deep:true,
        handler(value){
          localStorage.setItem("todos",JSON.stringify(value))
        }
        
      }
    }
   
}
</script>

<style>
body {
  background: #eff2f1;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.todo-container {
  background-color: #d8dfdd;
  width: 1000px;
  margin: 100px auto;
  border: 5px solid #d8dfdd;
  border-radius: 15px;
}
.todo-container .todo-wrap {
  padding: 20px 50px 20px 50px;
 
}
</style>
