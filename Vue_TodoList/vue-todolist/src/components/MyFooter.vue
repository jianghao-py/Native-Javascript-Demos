<template>
     <div class="todo-footer">
          <label >
              
            <input type="checkbox" class="check-box" :checked="isAll()" @click="checkAll()"/>
          </label>
          <span class="line">
            已完成 <span class="done">{{doneTotal}}</span> <span class="icon"> / </span> 任务总数 <span class="all">{{todos.length}}</span>
          </span>
          <button class="btn" v-show="all" @click="clearAll">清除已完成任务</button>
    </div>
</template>

<script>
export default {
    name:"MyFooter",
    data(){
        return{
           all: false,
           

        }
    },
    props:["todos","delAllCompleted"],
    computed:{
        doneTotal(){
            let count = 0;
            this.todos.forEach((todo)=>{
                if(todo.completed === true){
                    count++;
                }
            });
            return count;
        },
        total(){
            return this.todos.length;
        }
    },
    methods:{
        checkAll(){
            if(event.target.checked){
                this.todos.forEach((todo)=>{
                    todo.completed = true;
                })
                this.all = true;
            }else{
                this.todos.forEach((todo)=>{
                    todo.completed = false;
                })
                this.all = false;
            }
        },
        clearAll(){
            this.delAllCompleted();
        },
        isAll(){
            let flag;
           this.todos.forEach((todo)=>{
               if(todo.completed === false){
                   flag = false;
               }else{
                   flag = true;
               }
           })
           if(flag){
               this.all = true;
           }else{
               this.all = false;
           }
           return flag;
        }
    }
    
}
</script>

<style scoped>
    .todo-footer{
        width: 100%;
        height: 30px;
        line-height: 30px;
        margin-top: 50px;
    }

    .todo-footer .check-box{
        display: inline-block;
        margin: 0;
        
        
    }

    .line{
        margin-left: 15px;
        color: #333;
        font-size: 15px;
    }

    .icon{
        margin: 0 15px 0 15px;
    }

    .btn{
        border: 0px;
        background-color: #ebc1c3;
        color: #333;
        margin-left: 50px;
        border: 1px solid #ebc1c3;
        border-radius: 15px;
        padding: 10px 25px 10px 25px;
    }

    .btn:hover{
        background-color: #f59398;
    }

    .done{
        margin-left: 10px;
        color:#29a78d;
        font-weight: bold;
    }

    .all{
        margin-left: 10px;
        color:#f59398;
        font-weight: bold;
    }
</style>