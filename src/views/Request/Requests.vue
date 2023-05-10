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
                        <td v-if="role == 'Admin_ff'">{{ order.barcodes.lower_barcode}}</td>
                        <td v-if="role == 'Admin_ff'">{{ order.cell_number }}</td>
                        <td>{{ order.status }}</td>
                        <td v-if="role == 'Admin_ff'">{{ order.package }}</td>
                        <td>
                            <router-link :to="{name: 'requests-view', params: {id: index}}">
                                Перейти
                            </router-link>
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
        dates: ['', '']
    }),
    methods: {
        acceptRequests(){
             axios.post(`${BASE_URL}/ozon/unfulfilled/list/  `,{
                ordersList
             },
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                
                console.log(response)
            })
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
            axios.post(`${BASE_URL}/ozon/unfulfilled/list/ `,{
                "cutoff_from" : date1,
                "cutoff_to": date2
            },
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                
                this.ordersList = response.data
            })

        },
        getOrderList(){
            axios.post(`${BASE_URL}/ozon/unfulfilled/list/  `,{
                "cutoff_from": null,
                "cutoff_to": null
            },
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                
                this.ordersList = response.data
            })
        },
        getUserRole(){
            this.role = localStorage.getItem('user_role')
        }
    },
    mounted(){
        this.getUserRole(),
        this.getOrderList()
        // this.getStatusList()
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
</style>