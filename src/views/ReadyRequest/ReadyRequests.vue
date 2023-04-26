<template>
    <div class="requests">
            <h2 class="mt-5 ml-5">Список обработанных заявок</h2>
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
                        
                        
                    </tr>
                </thead>
                
                <tbody>
                    <tr
                    v-for="(order, index) in ordersList"
                    :key="order.id"
                    class="menu-row"
                    v-show="order.task"
                    >
                        <td>{{ index + 1 }}</td>
                        <td v-if="role == 'Admin_ff'">{{ order.seller.username}}</td>
                        <td>{{ order.shipment_date }}</td>
                        <td>{{ order.address }}</td>
                        <td>{{ order.delivery_method}}</td>
                        <td v-if="role == 'Admin_ff'">{{ order.barcodes.lower_barcode}}</td>
                        <td v-if="role == 'Admin_ff'">{{ order.cell_number }}</td>
                        <td>{{ order.status}}</td>
                        <td v-if="role == 'Admin_ff'">{{ order.package }}</td>
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
        role: ''
    }),
    methods: {
        getOrderList(){
            axios.get(`${BASE_URL}/api/rq/  `,
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
    }
}
</script>

<style lang="sass" scoped>
.download-wrapper
    display: flex
    align-items: center
    justify-content: center
    .download-icon
        width: 24px
        height: 24px
</style>