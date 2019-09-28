<template>
    <div>
        <div>
            <div>
                <button @click="fetchTodos()" class="btn btn-primary">Fetch Todos</button>
            </div>
        </div>
        <div>
            <div>
                <ul>
                    <li v-for="todo in todos" :key="todo.id">{{todo.task}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
  const axios = require('axios')
  export default {
    name: 'ToDos',
    data: () => {
      return {
        todos: []
      }
    },
    methods: {
      async fetchTodos () {
        axios
          .get('http://localhost:1337/todos')
          .then(response => {
            console.log(response)
            this.todos = response.data
            console.log(this.todos)
          })
          .catch(error => {
            if (error) throw new Error(error)
          })
      }
    }
  }
</script>
