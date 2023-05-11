<template>
    <div class="requests">
            <h2 class="mt-5 ml-5">Список необработанных заявок</h2> <br>
            <router-link to="/request/1">
                <v-btn
                    v-if="role == 'Client'"
                    color="green"
                    dark
                    small
                    class="mt-5 ml-5"
                >
                    Добавить заявку
                </v-btn>
            </router-link>
            <div class="filter-cont">
                <v-btn
                    color="green"
                    dark
                    small
                    class="mt-5 ml-5"
                    @click="acceptRequests"
                >
                    Принять в обработку
                </v-btn>
                <div class="filter-wrapper">
                    <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="dateRangeText"
                            label="от ~ до"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="dates"
                        no-title
                        scrollable
                        range
                        >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="menu = false"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(date)"
                        >
                            OK
                        </v-btn>
                        </v-date-picker>
                    </v-menu>
                    <v-btn @click="searchByDate" color="primary" small class="ml-2">
                        Поиск
                    </v-btn>
                </div>
            </div>
            <div class="tab-buttons">
                <button id="kaspi_button" class="kaspi-button" @click="goToKaspiPage">Kaspi</button>
                <button id="ozon_button" class="ozon-button" @click="goToOzonPage">Ozon</button>
            </div>
            

            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            №
                        </th>
                        <th v-if="role == 'Admin_ff'"  class="text-left">
                            Организация
                        </th>
                        <th class="text-left">
                            Дата
                        </th>
                        <th class="text-left">
                            Адрес доставки
                        </th>
                        <th class="text-left">
                            Тип доставки 
                        </th>
                        <th v-if="role == 'Admin_ff'" class="text-left">
                            Штрих-код 
                        </th>
                        <th v-if="role == 'Admin_ff'" class="text-left">
                            Ячейка
                        </th>
                        <th v-if="role == 'Admin_ff'" class="text-left">
                            Объем посылки
                        </th>
                        <th class="text-left">
                            Статус
                        </th>
                        <th class="text-left">
                            Страница заявки
                        </th>
                        
                        
                    </tr>
                </thead>
                
                <tbody>
                    <tr
                    v-for="(order, index) in ordersList"
                    :key="order.id"
                    class="menu-row"
                    v-show="order.status != 'Не принимаются'"
                    >
                        <td>{{ index + 1 }}</td>
                        <td v-if="role == 'Admin_ff'">{{ order.seller.username}}</td>
                        <td>{{ order.date }}</td>
                        <td>{{ order.address }}</td>
                        <td>{{ order.delivery_method}}</td>
                        <td v-if="role == 'Admin_ff'">{{ order.barcodes?.lower_barcode}}</td>
                        <td v-if="role == 'Admin_ff'">{{ order.cell_number }}</td>
                        <td>{{ order.package }}</td>
                        <td v-if="role == 'Admin_ff'">{{ order.status }}</td>
                        <td v-show="order.resource != 'kaspi'">
                            <router-link :to="{name: 'requests-view', params: {id: index}}">
                                Перейти
                            </router-link>
                        </td>
                        <td v-if="order.resource == 'kaspi'">
                            <button @click="acceptKapiResquest(order)">Принять в обработку</button>
                        </td>
                         <!-- <td class="download-wrapper">
                                <a href="/test.pdf" download="PDF" ><img src="../../assets/download-icon.png" alt="" class="download-icon"></a>
                        </td> -->
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
            
        
    </div>
</template>

<script>
import axios from 'axios'
import { BASE_URL } from '../../helpers/const'
export default {
    data: () => ({
        ordersList: [],
        status: '',
        role: '',
        dates: ['', ''],
        current_page: "kaspi"
    }),
    methods: {
        acceptKapiResquest(req){
            axios.post(`${BASE_URL}/kaspi/assemble/  `,{
                "id" : req.id,
                "code": req.code,
                "waybill": req.waybill,
                "related_link" : req.related_link
            },
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => { 
                alert("Sucess")
            })
        },
        kaspiResponseToOzonFormat(response_data){
            let array = []
            for (const item of response_data) {
                array.push({
                    "date": response_data.attributes ,
                    "address": response_data.attributes,
                    "delivery_method": response_data.attributes,
                    "barcodes" : {"lower_barcode": response_data.attributes},
                    "cell_number" : response_data.attributes,
                    "status": response_data.attributes,
                    "package": response_data.attributes
                })
            }
        },
        goToKaspiPage(){
            let kaspi_button = document.getElementById('kaspi_button')
            let ozon_button = document.getElementById('ozon_button')
            ozon_button.style.backgroundColor = "white"
            ozon_button.style.color = "black"
            kaspi_button.style.backgroundColor = "black"
            kaspi_button.style.color = "white"
            this.current_page = "kaspi"
            this.getKaspiOrderList()
        },
        goToOzonPage(){
            let kaspi_button = document.getElementById('kaspi_button')
            let ozon_button = document.getElementById('ozon_button')
            kaspi_button.style.backgroundColor = "white"
            kaspi_button.style.color = "black"
            ozon_button.style.backgroundColor = "black"
            ozon_button.style.color = "white"
            this.current_page = "ozon"
            this.getOzonOrderList()
        },
        validateDate(date){
            return date = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " 00:00:00"
        },
        searchByDate(){
            if(new Date(this.dates[0]) > new Date(this.dates[1])){
                let date;
                date =  this.dates[0];
                this.dates[0] = this.dates[1]
                this.dates[1] = date
            }
            let date1 = new Date(this.dates[0]);
            let date2 = new Date(this.dates[1]);
            date1 = this.validateDate(date1)
            date2 = this.validateDate(date2)
            if(this.current_page === "kaspi"){
                this.getByDateKaspiOrders(date1, date2)
            }else if(this.current_page === "ozon"){
                this.getOzonByDate(date1, date2)
            }
        },
        getByDateKaspiOrders(date1 , date2){
            axios.post(`${BASE_URL}/kaspi/orders/ `,{
                "cutoff_from" : date1,
                "cutoff_to": date2
            },
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => { 
                console.log(response)
                this.ordersList = response.data
            })
        },
        getOzonByDate(date1 , date2){
            axios.post(`${BASE_URL}/ozon/unfulfilled/list/ `,{
                "cutoff_from" : date1,
                "cutoff_to": date2
            },
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => { 
                console.log(response)
                this.ordersList = response.data[0].data
            })
        },
        getKaspiOrderList(){
            let date_now = new Date()
            let date_from = new Date()
            date_from.setDate(date_from.getDate() - 7)

            date_now = this.validateDate(date_now)
            date_from = this.validateDate(date_from)

            axios.post(`${BASE_URL}/kaspi/orders/ `,{
                "cutoff_from" : "2023-05-04 00:00:00",
                "cutoff_to": "2023-05-11 00:00:00"
            },
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => { 
                console.log(response.data)
                this.ordersList = response.data
            })
        },
        getOzonOrderList(){
             axios.post(`${BASE_URL}/ozon/unfulfilled/list/ `,{
                "cutoff_from" : null,
                "cutoff_to": null
            },
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => { 
                console.log(response)
                if(response.data.length === 0){
                    this.ordersList = []
                }
                this.ordersList = response.data[0].data
            })
        },
        getUserRole(){
            this.role = localStorage.getItem('user_role')
        }
    },
    mounted(){
        this.getUserRole()
        this.getKaspiOrderList()
    },
    computed: {
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
    },
}
</script>

<style lang="sass" scoped>
.filter-cont
    display: flex
    flex-direction: row
    .filter-wrapper
        margin-left: 60vw
        display: flex
        flex-direction: row
        align-items: center
        justify-content: center
        width: 20vw
.download-wrapper
    display: flex
    align-items: center
    justify-content: center
    .download-icon
        width: 24px
        height: 24px
.tab-buttons
    margin-left: 2vw
    .kaspi-button
        background-color: black
        padding: 10px 20px 10px 20px
        color: white
        border-top-left-radius: 10px
        border-top-right-radius: 10px
        border: 1px solid black
    .ozon-button
        background-color: white
        padding: 10px 20px 10px 20px
        border-top-left-radius: 10px
        border-top-right-radius: 10px
        color: black
        border: 1px solid black
</style>