<template>
    <div class="list">
        <ul class="todo-main">
            <item v-for="todoItem in todos" :key="todoItem.id" :todo="todoItem" :changeCompleted="changeCompleted" :delInput="delInput"></item>
        </ul>
    </div>
</template>

<script>
import item from './Item.vue'
export default {
    name:"List",
    components:{
        item
    },
    props:["todos","changeCompleted","delInput"]

}
</script>

<style scoped>
    .list{
        width: 100%;
        margin-top: 50px;
    }

    ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }
</style>