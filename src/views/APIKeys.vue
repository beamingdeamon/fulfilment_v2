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
            <div class="kaspi">
                <form action="" class="ml-4">
                    <div class="line"></div>
                    <legend>Ключи Kaspi</legend>
                    <h2>API Key</h2>
                    <input type="text" v-model="kaspi_key">
                </form>
                <button @click="saveKaspi">Сохранить</button>
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
        ozon_client_id : "",
        kaspi_key: "",
    }),
    methods : {
        saveOzon(){
            axios.post(`${BASE_URL}/ozon_api_key/` ,{
                "api_key" : this.ozon_api_key ,
                "client_id" : this.ozon_client_id
            },
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
            })
        },
        saveKaspi(){
            axios.post(`${BASE_URL}/kaspi_token_api/` ,{
                "token_api" : this.kaspi_key 
            },
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
            })
        },
        getOzon(){
            axios.get(`${BASE_URL}/ozon_api_key/`,
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                this.ozon_api_key = response.data.api_key
                this.ozon_client_id = response.data.client_id
            })
        },
        getKaspi(){
            axios.get(`${BASE_URL}/kaspi_token_api/` ,
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                this.kaspi_key = response.data.token_api
            })
        }
    },
    mounted() {
        this.getOzon(),
        this.getKaspi()
    },
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
            margin-bottom: 4vh
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
        .kaspi
            display: flex
            flex-direction: row
            .line
                position: absolute
                width: 42vw
                border: 1px solid gray
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