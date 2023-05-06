<template>
    <div class="goods">
         <div class="head-container">
                <h2 class="mt-5 ml-5">Товары</h2>
                <form class="search-container">
                    <div class="input-container">
                        <v-text-field clearable label="Поиск" variant="solo-filled" v-model="search_input"></v-text-field>
                        <button @click="search" class="search-button">Найти</button>
                    </div>

                        <h4 v-if="isRequest">Пожалуйста выберите тип поиска</h4>
                    <form class="checkbocks-wrapper">
                        <v-checkbox @click="isChecked" v-model="bar_code_search" name="check" class="check" label="по артикулу"></v-checkbox>
                        <v-checkbox @click="isChecked" v-model="name_search" name="check" class="check" label="по названию"></v-checkbox>

                    </form>
                </form>
            </div>
                <router-link to="/goods-new/">
                    <v-btn
                        v-if="role == 'Admin_ff'"
                        color="green"
                        dark
                        small
                        class="mt-5 ml-5"
                    >
                    Добавить Товар
                    </v-btn>
                </router-link>
                
        <div class="goods__inner"> 
            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            №
                        </th>
                        <th v-if="role === 'Admin_ff'" class="text-left">
                            Организация
                        </th>
                        <th class="text-left">
                            Наименование
                        </th>
                        <th class="text-left">
                            Баркод
                        </th>
                        <th class="text-left">
                            Стоимость
                        </th>
                        <th class="text-left">
                            Штрих-код
                        </th>
                        <th class="text-left">
                            Кол-во
                        </th>
                        <th class="text-left">
                            Вес 
                        </th>
                        <th class="text-left">
                            Высота, cм
                        </th>
                        <th class="text-left">
                            Ширина, cм
                        </th>
                        <th class="text-left">
                            Длина, cм
                        </th>
                        <th class="text-left">
                            Объем, м3
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="(good, index) in goodsList"
                    :key="good.id"
                    @click = "goToGood(good.id)"
                    class = "goods-list"
                    >
                        <td>{{ index + 1 }}</td>
                        <td>{{good.seller.username}} </td>
                        
                        <td>{{ good.title }}</td>
                        <td>{{ good.vendor_code }}</td>
                        <td>{{ good.tax }}</td>
                        <td>{{ good.bar_code }}</td>
                        <td>{{ good.good_quantity }}</td>
                        <td>{{ good.weight }}</td>
                        <td>{{ good.height_m }}</td>
                        <td>{{ good.width_m }}</td>
                        <td>{{ good.length_m }}</td>
                        <td>{{ good.capacity_m3 }}</td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { BASE_URL } from '../helpers/const'
export default {
    data: () => ({
        goodsList: [],
        role: "",
        bar_code_search: false,
        name_search: false,
        currency_choice: "",
        search_input: "",
        isRequest: false
    }),
    methods:{
        search(){
            if(this.search_input == null){
                this.search_input = ""
            }
            if(this.name_search){
                 axios.get(`${BASE_URL}/goods/list/?title=${this.search_input}`,
                {
                    headers:{
                        Authorization: 'Token ' + localStorage.getItem('usertoken')
                    }
                }).then((response) => {
                window.localStorage.removeItem('goodsList')
                window.localStorage.setItem('goodsList', response.data)
                console.log(response.data[0])
                    this.goodsList = response.data
                })
                this.isRequest = false
            }else if(this.bar_code_search){
                axios.get(`${BASE_URL}/goods/list/?vendor_code=${this.search_input}`,
                {
                    headers:{
                        Authorization: 'Token ' + localStorage.getItem('usertoken')
                    }
                }).then((response) => {
                window.localStorage.removeItem('goodsList')
                window.localStorage.setItem('goodsList', response.data)
                console.log(response.data[0])
                    this.goodsList = response.data
                })
                this.isRequest = false
            }else{
                this.isRequest = true
            }
        },
        isChecked() {
            if(this.bar_code_search === this.name_search){
                console.log(1)
                if(this.currency_choice === "bar_code"){
                    this.bar_code_search = false
                    console.log(2)
                }else if(this.currency_choice === "name"){
                    this.name_search = false
                    console.log(3)
                }
            }else if(this.bar_code_search != this.name_search){
                console.log(4)
                if(this.bar_code_search){
                    console.log(5)
                    this.currency_choice ="bar_code"
                }else if(this.name_search){
                    console.log(6)
                    this.currency_choice = "name"
                }
            }
        },
        getGoodsList(){
            axios.get(`${BASE_URL}/goods/list`,
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
               window.localStorage.removeItem('goodsList')
               window.localStorage.setItem('goodsList', response.data)
               console.log(response.data[0])
                this.goodsList = response.data
            })
        },
        goToGood(id){
            this.$router.push('/goods/'+ id)
        },
        getRole(){
           this.role = localStorage.getItem("user_role")
        }
    },
    mounted(){
        this.getRole()
        this.getGoodsList()
    }
}
</script>
<style lang="sass" scoped>

.input-container
    margin-left: 5vw
    height: 8vh
    display: flex
    flex-direction: row
    width: 40vw
    .input
        width: 25vw
    .search-button
        margin-top: 10px
        height: 3rem
        width: 8vw
        background-color: gray
        color: white
        border-radius: 10px
.search-container
    h4
        margin-left: 5vw
        color: red
.checkbocks-wrapper
    display: flex
    margin-left: 3vw
    flex-direction: row
    .check
        margin-left: 2vw
        font-size: 0.5rem
.goods-list
    cursor: pointer
</style>