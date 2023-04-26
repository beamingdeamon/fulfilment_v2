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
                                <v-text-field 
                                    v-model="requestForm.organization" 
                                    class="input" 
                                    label="Кому:" 
                                    placeholder="ТОО/ИП"
                                    :error-messages="organizationErrors"
                                    required
                                    @input="$v.requestForm.organization.$touch()"
                                    @blur="$v.requestForm.organization.$touch()"
                                />
                                <v-text-field 
                                    v-model="requestForm.address" 
                                    class="input" 
                                    label="Адрес доставки:" 
                                    placeholder="Мынбаева, 92"
                                    :error-messages="addressErrors"
                                    required
                                    @input="$v.requestForm.address.$touch()"
                                    @blur="$v.requestForm.address.$touch()"
                                />
                                <v-text-field 
                                    v-model="requestForm.contacts" 
                                    class="input" 
                                    label="Контактные данные:" 
                                    placeholder="Контакты"
                                    :error-messages="contactsErrors"
                                    required
                                    @input="$v.requestForm.contacts.$touch()"
                                    @blur="$v.requestForm.contacts.$touch()"
                                />
                                
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
                        Заявка №: {{request.id}}
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
                        Адрес доставки: {{request.shipping_address}}
                    </v-card-subtitle>
                    <v-card-subtitle>
                        Получатель: {{request.recipient}}
                    </v-card-subtitle>
                    <v-card-subtitle>
                        Контакты: {{request.contacts}}
                    </v-card-subtitle>
                    <v-card-subtitle>
                        Тип доставки: {{request.shipping_type}}
                    </v-card-subtitle>
                    <v-card-subtitle v-if="role == 'Client'">
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
            >Собрать товар</v-btn>
            <div style="justify-content: space-between; display: flex;" v-if="role == 'Admin_ff'"  class="mt-5">
                
                    
            </div>
            <v-btn v-if="request.is_draft == true" @click.prevent="showButton = !showButton" class="mt-5" color="primary">
                Редактировать список товаров
            </v-btn>
            <router-link to="/request/2">
                <v-btn v-if="showButton == true" @click="setToStorage(request.id)" class="mt-5 ml-5" color="green">
                    Добавить товары
                </v-btn>
            </router-link>
            <v-simple-table v-if="role=='Admin_ff'" class="mt-5">
                <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            №
                        </th>
                        <th class="text-left">
                            Наименование товара
                        </th>
                        <th class="text-left">
                            Артикул
                        </th>
                        <th class="text-left">
                            Количество на отправку
                        </th>
                        <th class="text-left">
                            
                        </th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr
                    v-for="(good, index) in request.good_to_send"
                    :key="good.id"
                    >
                        <td>{{index + 1}}</td>
                        <td>{{good.good__title}}</td>
                        <td>{{good.good__vendor_code}}</td>
                        <td>{{good.total}}</td>
                        <td>
                            <v-btn v-if="showButton == true" @click="deleteGood(good.good)">
                                &#10006;
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
            <v-simple-table v-if="role=='Client'" class="mt-5">
                <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            №
                        </th>
                        <th class="text-left">
                            Наименование товара
                        </th>
                        <th class="text-left">
                            Артикул
                        </th>
                        <th class="text-left">
                            Количество на отправку
                        </th>
                        <th class="text-left">
                            
                        </th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr
                    v-for="(good, index) in request.good_to_send"
                    :key="good.id"
                    >
                        <td>{{index + 1}}</td>
                        <td>{{good.good__title}}</td>
                        <td>{{good.good__vendor_code}}</td>
                        <td>{{good.total}}</td>
                        <td>
                            <v-btn  class="b" color="error" v-if="showButton == true"  @click="deleteGood(good.good)">
                                &#10006;
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </v-container>
        
    </div>
</template>

<script>
import axios from 'axios'
import html2pdf from "html2pdf.js";
import { required, minLength } from 'vuelidate/lib/validators'
import { BASE_URL } from '../../helpers/const'
export default {
    data: () => ({
        dialog: false,
        dialogPackage: false,
        request: {},
        barcode: '',
        requestForm:{
            date: '',
            organization: '',
            address: '',
            contacts: '',
            distributeType: '',
        },
        menu: false,
        shippingTypes: [],
        orderStatuses: [],
        showButton: false,
        role: '',
        box: {
            height_m: '',
            width_m: '',
            length_m: '',
            capacity_m3: ''
        },
        cellstatus:{
            cell_number: '',
            cstatus: ''
        },
        errors:{
            capacity_m3_4: '',
            height_m_4: '',
            length_m_4: '',
            width_m_4: '',
            capacity_m3_10: '',
            height_m_10: '',
            length_m_10: '',
            width_m_10: ''
        }
    }),
    methods:{
        actCreate(){
             axios.post(`${BASE_URL}/ozon/act/create/`,{
                    "user": 1,
                    "delivery_method_id": 1020000346043000,
                    "shipment_date": "2023-04-27T07:00:00Z",
                },
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                
                this.ordersList = response.data
            })
        }
    },
    mounted(){
        
    },
    validations:{
        requestForm:{
            organization: {required},
            address: {required},
            contacts: {required},
            distributeType: {required},
        },
        box:{
            height_m: {required},
            width_m: {required},
            length_m: {required},
            capacity_m3: {required}
        },
        cellstatus:{
            // cell_number: {required},
            cstatus: {required}
        }
    }
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

</style>
