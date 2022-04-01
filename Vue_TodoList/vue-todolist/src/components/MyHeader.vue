<template>
    <div class="todo-header">
        <input type="text" placeholder="请输入您的任务" v-model="getInput" @keyup.enter="add">
    </div>
</template>

<script>
import {nanoid} from 'nanoid'
import dayjs from 'dayjs'

export default {
    name:"MyHeader",
    data(){
        return{
            getInput:"",
            time:dayjs().format("YYYY-MM-DD")
        }
    },
    props:["receiveInput"],
    methods:{
        add(){
            if(this.getInput === ""){
                alert("输入不能为空")
            }else{
                const todoObj = {id:nanoid(),title:this.getInput,completed:false,time:this.time}
                this.receiveInput(todoObj);
                this.getInput = ""
            }
            event.target.blur()
            

        }
    }
}
</script>

<style scoped>
    .todo-header{
        width: 100%;
    }

    .todo-header input{
        width: 90%;
        padding: 10px;
        outline: none;
        border: 2px solid #d8dfdd;
        border-radius: 10px;
    }

    .todo-header input:focus{
        border: 2px solid #76afa1;
        border-radius: 10px;
    }
</style>