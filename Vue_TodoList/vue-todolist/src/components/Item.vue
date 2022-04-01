<template>
    <div>
        <li class="clearfix" ref="msgLi">
            <label>
              <input type="checkbox" class="check" :checked="todo.completed" @click="handleCheck(todo.id,$event)"/>
              <span class="time">{{todo.time}}</span>
              <span class="txt">{{todo.title}}</span>
              
              
            </label>
            
            <div class="btns">
                <button class="btnDel" @click="del(todo.id)">删除</button>
                <button class="btnEdit" @click="getEdit">编辑</button>
            </div>
            
        </li>
    </div>
</template>

<script>
export default {
    name:"Item",
    props:["todo","changeCompleted","delInput"],
    methods:{
        handleCheck(id,event){
            this.changeCompleted(id);
            if(event.target.checked){
                this.$refs.msgLi.style.backgroundColor = "#a9c6b6"
            }else{
                this.$refs.msgLi.style.backgroundColor = "#f0bfa9"
            }
          
        },
        del(id){
            if(confirm("确认删除")){
                // console.log(id);
                this.delInput(id);
            }
        },
        getEdit(){
            const data = prompt("输入修改内容");
            this.todo.title = data;
        }
    }
}
</script>

<style scoped>
    .clearfix::before,
    .clearfix::after{
        content:'';
        display: table;
        clear: both;
    }

    li{
        width: 100%; 
        margin-top:30px;
        height: 100px;
        line-height: 100px;
        background-color:#eff2f1;;
        border-radius: 15px;
    }

    
    label{
        float: left;
        width: 70%;
    }

    .txt{
        display: inline-block;
        width: 70%;
        height: 41px;
        line-height: 41px;
        margin-left: 30px;
        color: #333;
        font-weight: bold;

    }

    .btns{
        float: right;
        width: 25%;
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        margin-right: 10px;
    }

    .btns button{
        border: 0px;
        border-radius: 15px;
        padding: 10px 30px 10px 30px;
    }

    .btns .btnEdit{
        background-color: #9dded1;
        color: #333;
        border: 1px solid #9dded1;
    }

    .btns .btnDel{
        background-color: #ebc1c3;
        color: #333;
        border: 1px solid #ebc1c3;
    }

    .btns .btnEdit:hover{
        background-color: #49b6a0;
    }

    .btns .btnDel:hover{
        background-color: #f59398;
    }

    .time{
        display: inline-block;
        margin-left: 10px;
    }
</style>