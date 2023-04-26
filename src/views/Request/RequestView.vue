<template>
    <div class="request">
        <v-container>
            
            <router-link to="/requests">
                <v-btn
                    class="mt-3"               
                    color="grey"
                    dark
                >
                <v-icon
                dark
                left
                >
                mdi-arrow-left
                </v-icon>Назад к списку заявок
                </v-btn>
            </router-link>
            <span v-if="request.is_draft == true" class="">
            <v-dialog
            v-model="dialog"
            transition="dialog-top-transition"
            max-width="600"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                
                class="ml-5 mt-3"
                color="primary"
                v-bind="attrs"
                v-on="on"
                >Редактировать заявку</v-btn>
            </template>
            <template v-slot:default="dialog">
                <v-card>
                <v-toolbar
                    color="grey"
                    dark
                >Редактирование заявки</v-toolbar>
                <v-form class="card" @submit.prevent="patchRequest()">
                            
                            <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :return-value.sync="requestForm.date"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                                class="mt-5"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                        v-model="requestForm.date"
                                        label="Дата заявки"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="requestForm.date"
                                        no-title
                                        scrollable
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn
                                        text
                                        color="primary"
                                        @click="menu = false"
                                        >
                                        Закрыть
                                        </v-btn>
                                        <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.menu.save(requestForm.date)"
                                        >
                                        OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                                <v-select
                                v-model="requestForm.distributeType"
                                :items="shippingTypes"
                                item-text="type"
                                item-value="id"
                                label="Тип отправки"
                                :error-messages="distributeTypeErrors"
                                @change="$v.requestForm.distributeType.$touch()"
                                @blur="$v.requestForm.distributeType.$touch()"
                                ></v-select>
                                <v-btn color="green"
                                dark  type="submit" class="form__button mt-3" block>
                                    Сохранить
                                </v-btn>
                        </v-form>
                <v-card-actions class="justify-end">
                    <v-btn
                    text
                    @click="dialog.value = false"
                    >Назад</v-btn>
                </v-card-actions>
                </v-card>
            </template>
            </v-dialog>
            </span>
            <span v-if="request.goods_to_send != 0">
                <v-btn v-if="request.is_draft == true" @click.prevent="sendOrder()" class="mt-3 ml-5" color="green">
                    Отправить Заявку
                </v-btn>
            </span>
            <v-card
            
            elevation="7"
            shaped
            class="mt-5"
            >
                <div style="display: flex">
                    <v-card-title>
                        Заявка №: {{request.posting_number}}
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-title v-if="role == 'Admin_ff'">
                        Организация: {{request.organization}}
                    </v-card-title>
                </div>
                <div class="block">
                    <v-card-subtitle>
                        Дата заявки: {{request.date}}
                    </v-card-subtitle>
                    <v-card-subtitle>
                        Адрес доставки: {{request.address}}
                    </v-card-subtitle>
                    <v-card-subtitle>
                        Тип доставки: {{request.delivery_method}}
                    </v-card-subtitle>
                    <v-card-subtitle>
                        Статус: {{request.status}}
                    </v-card-subtitle>
                    <!-- <v-card-subtitle>
                        Ячейка на складе: {{request.status}}
                    </v-card-subtitle> -->
                </div>
            </v-card>
            <v-btn
            
            class="mt-3 ml-5 white--text" color="#1976d2"
            @click="actCreate"
            v-show="request.status === 'Ожидает сборки'"
            >Собрать товар</v-btn>
            <v-btn
            
            class="mt-3 ml-5 white--text" color="#1976d2"
            @click="productShip"
            v-show="request.status === 'Ожидает отправки'"
            >Отправить товар</v-btn>
        </v-container>
        <h2 class="products-head">Товары</h2>
        <v-simple-table class="table">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            №
                        </th>
                        <th class="text-left">
                            Название
                        </th>
                        <th class="text-left">
                            Артикул
                        </th>
                        <th class="text-left">
                            Цена
                        </th>
                        <th class="text-center">
                            Кол-во
                        </th>
                        
                    </tr>
                </thead>
                
                <tbody>
                    <tr
                    v-for="(product, index) in request.products"
                    :key="product.id"
                    >
                        <td>{{ index + 1 }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.offer_id }}</td>
                        <td>{{ parseInt(product.price) +"  "+ product.currency_code }}</td>
                        <td class="text-center">{{ product.quantity }}</td>
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
        request: {},
    }),
    methods:{
        actCreate(){
             axios.post(`${BASE_URL}/ozon/fbs/ship/`,{
                    "user": this.request.seller.id,
                    "delivery_method_id": this.request.delivery_method_id,
                    "status": this.request.status,
                    "shipment_date": this.request.shipment_date,
                    "posting_number": this.request.posting_number,
                    "products": this.request.products
                },
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                
                this.ordersList = response.data
            })
        }, 
        productShip(){
             axios.post(`${BASE_URL}/ozon/act/create/`,{
                    "user": this.request.seller.id,
                    "delivery_method_id": this.request.delivery_method_id,
                    "status": this.request.status,
                    "shipment_date": this.request.shipment_date,
                    "posting_number": this.request.posting_number,
                    "products": this.request.products
                },
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                
                this.ordersList = response.data
            })
        },
        getRequestData(){
           axios.get(`${BASE_URL}/ozon/unfulfilled/list/  `,
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                
                this.request = response.data[this.$route.params.id]
            })
        }
    },
    mounted(){
        this.getRequestData()
    },
}
</script>

<style lang="scss" scoped>
.block{
    display: flex;
}

.card{
    padding: 20px;
}
.cardd{
    padding: 20px;
}
.invalid-feedback{
    color: rgb(252, 20, 20);
}
.b {
    border-radius: 30%;
}
.products-head{
    margin-top: 3vh;
    margin-left: 15vw;
    margin-bottom: 2vh;
}
.table{
    width: 80vw;
    margin-left: 10vw;
    border: 1px solid gray;
}
</style>
