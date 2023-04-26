<template>
    <div class="wrapper">
        <div class="container">
            <h1 class="mt-5">API ключи</h1>
            <div class="ozon">
                <form action="" class="ml-4">
                    <legend>Ключи OZON</legend>
                    <h2>Client Id</h2>
                    <input type="text" v-model="ozon_client_id">
                    <h2>API Key</h2>
                    <input type="text" v-model="ozon_api_key">
                </form>
                <button @click="saveOzon">Сохранить</button>
            </div>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { BASE_URL } from '../helpers/const'
export default {
    data: () => ({
        ozon_api_key : "",
        ozon_client_id : ""
    }),
    methods : {
        saveOzon(){
            axios.post(`${BASE_URL}/ozon/ozon_api_key/` ,{
                "api_key" : this.ozon_api_key ,
                "client_id" : this.ozon_client_id
            },
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
            })
        }
    }
}
</script>
<style lang="sass" scoped>
.wrapper
    width: 100vw
    height: 100vh
    display: flex
    justify-content: center
    .container
        width: 80vw
        .ozon
            display: flex
            flex-direction: row
            button
                margin-left: 5vw
                font-size: 1.2rem
                font-weight: 700
                margin-top: 4vh
                color: white
                width: 100px
                height: 45px
                border-radius: 10px
                background-color: green
            legend
                margin-top: 4vh
                font-size: 1.4rem
                margin-bottom: 3vh
                font-weight: 600
            input
                height: 2rem
                width: 30vw
                border: 1px solid gray
                border-radius: 10px
</style>