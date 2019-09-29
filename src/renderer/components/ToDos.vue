<template>
    <div>
        <div class="row">
            <header class="col-md-12">
                <nav class="navbar navbar-light bg-light">
                    <a class="navbar-brand">Vue TODO List</a>
                    <button class="btn btn-danger my-2 my-sm-0" @click="logout()" type="button">Logout</button>
                </nav>
            </header>
        </div>

        <div class="row" id="fetch-button-row">
            <div class="col-md-12">
                <button @click="fetchTodos()" class="btn btn-primary">Fetch Todos</button>
            </div>

        </div>

        <div class="row" id="todos-row">
            <div class="col-md-12">
                <ul class="list-group">
                    <li class="list-group-item" v-for="todo in todos" :key="todo.id">{{todo.title}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
  import authService from '../../main/services/auth-service'
  const { remote } = window.require('electron')
  const axios = require('axios')
  export default {
    name: 'HelloWorld',
    data: () => {
      return {
        todos: []
      }
    },

    methods: {
      async logout () {
        await authService.logout()
        remote.getCurrentWindow().close()
      },
      fetchTodos () {
        let accessToken = remote.getGlobal('accessToken')

        axios
          .get('http://localhost:3001/', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          .then(response => {
            this.todos = response.data
          })
          .catch(error => {
            if (error) throw new Error(error)
          })
      }
    }
  }
</script>


<style scoped>
    @import "~bootstrap/dist/css/bootstrap.min.css";

    #fetch-button-row,
    #todos-row {
        margin: 10px;
    }
</style>
