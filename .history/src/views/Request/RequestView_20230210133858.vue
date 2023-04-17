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
                color="rgb(206, 234, 251)"
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
            <div style="justify-content: space-between; display: flex;" v-if="role == 'Admin_ff'"  class="mt-5">
                
                <div class="">
                    <v-btn
                    v-if="request.bar_code == null"
                    class="mt-3 white--text"
                    color="green"
                    @click="generateBarCode()">
                    
                        Сгенерировать штрих-код
                    </v-btn>
                    <span v-if="request.package == null">
                        <v-dialog
                        transition="dialog-top-transition"
                        max-width="600"
                        v-model="dialogPackage"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                        
                            class="mt-3 ml-3"
                            color="primary"
                            v-bind="attrs"
                            v-on="on"
                            >Создать посылку</v-btn>
                        </template>
                        <template v-slot:default="dialog">
                            <v-card>
                            <v-toolbar
                                color="#708090"
                                dark
                            >Создание посылки</v-toolbar>
                            <v-form class="cardd" @submit.prevent="sendBox()">
                                            <v-text-field 
                                                v-model="box.height_m" 
                                                class="input" 
                                                label="Высота:" 
                                                placeholder="м"
                                                :error-messages="boxHeightErrors"
                                                required
                                                @keypress="isDecimal"
                                                @input="$v.box.height_m.$touch()"
                                                @blur="$v.box.height_m.$touch()"
                                            />
                                            <p class="invalid-feedback" v-if="errors.height_m_4">{{errors.height_m_4}}</p>
                                            <p class="invalid-feedback" v-if="errors.height_m_10">{{errors.height_m_10}}</p>
                                            <v-text-field 
                                                v-model="box.width_m" 
                                                class="input" 
                                                label="Ширина:" 
                                                placeholder="м"
                                                :error-messages="boxWidthErrors"
                                                required
                                                @keypress="isDecimal"
                                                @input="$v.box.width_m.$touch()"
                                                @blur="$v.box.width_m.$touch()"
                                            />
                                            <p class="invalid-feedback" v-if="errors.width_m_4">{{errors.width_m_4}}</p>
                                            <p class="invalid-feedback" v-if="errors.width_m_10">{{errors.width_m_10}}</p>
                                            <v-text-field 
                                                v-model="box.length_m" 
                                                class="input" 
                                                label="Длина:" 
                                                placeholder="м"
                                                :error-messages="boxLengthErrors"
                                                required
                                                @keypress="isDecimal"
                                                @input="$v.box.length_m.$touch()"
                                                @blur="$v.box.length_m.$touch()"
                                            />
                                            <p class="invalid-feedback" v-if="errors.length_m_4">{{errors.length_m_4}}</p>
                                            <p class="invalid-feedback" v-if="errors.length_m_10">{{errors.length_m_10}}</p>
                                            
                                            <v-text-field 
                                                v-model="box.capacity_m3" 
                                                class="input" 
                                                label="Объем:" 
                                                placeholder="м3"
                                                :error-messages="boxCapacityErrors"
                                                required
                                                @keypress="isDecimal"
                                                @input="$v.box.capacity_m3.$touch()"
                                                @blur="$v.box.capacity_m3.$touch()"
                                            />
                                            <p class="invalid-feedback" v-if="errors.capacity_m3_4">{{errors.capacity_m3_4}}</p>
                                            <p class="invalid-feedback" v-if="errors.capacity_m3_10">{{errors.capacity_m3_10}}</p>
                                            
                                            

                                            
                                            
                                            
                                            
                                            <v-btn color="green"
                                            dark  type="submit" class="form__button mt-3" block>
                                                Сохранить
                                            </v-btn>
                                    </v-form>
                            <v-card-actions class="justify-end">
                                <v-btn
                                text
                                @click="dialog.value = false"  color="#708090"
                                >Назад</v-btn>
                            </v-card-actions>
                            </v-card>
                        </template>
                        </v-dialog>
                    </span>
                    <v-btn
                    class="mt-3 ml-5"
                    color="green"
                    @click="exportToPDF">
                        Сохранить в PDF
                    </v-btn>
                </div>
                <div class="">
                    
                    <v-dialog
                    transition="dialog-top-transition"
                    max-width="600"
                    v-model="dialog"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        
                        class="mt-3 ml-5" color="#87CEFA"
                        v-bind="attrs"
                        v-on="on"
                        >Редактировать</v-btn>
                    </template>
                    <template v-slot:default="dialog">
                        <v-card>
                        <v-toolbar
                            color="#708090"
                            dark
                        >Редактировать</v-toolbar>
                        <v-form class="card" @submit.prevent="sendStatus()">
                                        <v-text-field 
                                            v-model="cellstatus.cell_number" 
                                            class="input" 
                                            label="Номер ячейки:" 
                                            placeholder="454"
                                            
                                            required
                                            
                                            
                                        />
                                        <v-select
                                        v-model="cellstatus.cstatus"
                                        :items="orderStatuses"
                                        item-text="status"
                                        item-value="id"
                                        label="Статус отправки"
                                        :error-messages="statusCellStatusErrors"
                                        @change="$v.cellstatus.cstatus.$touch()"
                                        @blur="$v.cellstatus.cstatus.$touch()"
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
                </div>
            </div>
            <v-card
            v-if="role == 'Admin_ff'"
            elevation="7"
            shaped
            class="mt-5"
            >
                <div class="block">
                    <v-card-subtitle>
                        Штрих-код: 
                        <div  id="element-to-convert" class="mt-5" v-html="barcode">
                
                        </div>
                    </v-card-subtitle>
                    <v-card-subtitle>
                        Объем посылки: {{request.package}}
                    </v-card-subtitle>
                    <v-spacer></v-spacer>
                    <v-card-subtitle>
                        Ячейка: {{request.cell_number}}
                    </v-card-subtitle>
                    <v-card-subtitle>
                        Статус заявки: {{request.status}}
                    </v-card-subtitle>
                </div>
            </v-card>
            <v-btn v-if="request.is_draft == true" @click.prevent="showButton = !showButton" class="mt-5" color="rgb(206, 234, 251)">
                Редактировать список товаров
            </v-btn>
            <router-link to="/request/2">
                <v-btn v-if="showButton == true" @click="setToStorage(request.id)" class="mt-5 ml-5" color="rgb(204, 249, 195)">
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
                        <td>{{good.good_name}}</td>
                        <td>{{good.good_vendor_code}}</td>
                        <td>{{good.quantity}}</td>
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
                            <v-btn color="red" v-if="showButton == true"  @click="deleteGood(good.good)">
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
        getRequestData(){
            axios.get('http://87.255.194.66:1337/api/orders/' +  localStorage.getItem('orderId') + '/detail/',
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                console.log(response.data)
                this.request = response.data
                this.requestForm.organization = response.data.recipient,
                this.requestForm.address = response.data.shipping_address,
                this.requestForm.contacts = response.data.contacts,
                this.requestForm.date = response.data.date
                console.log(response.data)
                if(response.data.barcode_file){
                    this.showButton = false
                    this.barcode = response.data.barcode_file.join('')
                }
                
            })
        },
        getShippingTypes(){
            axios.get('http://87.255.194.66:1337/api/shipping_types/',
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                this.shippingTypes = response.data
            })
        },
        patchRequest(){
            this.$v.requestForm.$touch()
            if(!this.$v.requestForm.$invalid){
                axios.put('http://87.255.194.66:1337/api/orders/' + localStorage.getItem('orderId') +'/', 
                {
                    organization: this.request.organization,
                    date: this.requestForm.date,
                    recipient: this.requestForm.organization,
                    shipping_address: this.requestForm.address,
                    contacts: this.requestForm.contacts,
                    shipping_type: this.requestForm.distributeType
                },
                {
                    headers:{
                        Authorization: 'Token ' + localStorage.getItem('usertoken')
                    }
                }).then((response) => {
                    alert('Успешно')
                    this.getRequestData()
                    this.dialog = false
                })
            }
            
        },
        deleteGood(value){
            axios.delete('http://87.255.194.66:1337/api/order/' + this.request.id + '/good/' + value + '/good_to_send/delete', 
            {
                headers:{
                   Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            })
            .then(() => {
                alert('Успешно')
                this.getRequestData()
            })
        },
        setToStorage(value){
            localStorage.setItem('orderId', value)
        },
        sendOrder(){
            axios.patch('http://87.255.194.66:1337/api/orders/'+ localStorage.getItem('orderId') +'/immutable/',
            {

            },
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then(() => {
                alert('Успешно')
                this.getRequestData()
            })
        },
        generateBarCode(){
            axios.put('http://87.255.194.66:1337/api/orders/' + localStorage.getItem('orderId') + '/barcode/generate/',
            {
                
            },
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                
                this.getRequestData()
            })
        },
        exportToPDF() {
			html2pdf(document.getElementById("element-to-convert"), {
				margin: 1,
  			    filename: "Заявка",
			});
		},
        getUserRole(){
            this.role = localStorage.getItem('user_role')
        },
        getOrderStatuses(){
            axios.get('http://87.255.194.66:1337/api/order_statuses/',
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                console.log(response)
                this.orderStatuses = response.data
            })
        },
        sendBox(){
            this.$v.box.$touch()
            if(!this.$v.box.$invalid){
                axios.post('http://87.255.194.66:1337/api/packages/',
                {
                    order: this.request.id,
                    height_m: this.box.height_m,
                    width_m: this.box.width_m,
                    length_m: this.box.length_m,
                    capacity_m3: this.box.capacity_m3,
                },
                {
                    headers:{
                        Authorization: 'Token ' + localStorage.getItem('usertoken')
                    }
                }).then(() => {
                    alert('успешно')
                    this.getRequestData()
                    this.dialogPackage=false
                }).catch((error) => {
                    console.log(error)
                    Object.keys(error.response.data).forEach((key) => {
                        console.log(key, error.response.data[key])
                        if(error.response.data[key][0] == 'Ensure that there are no more than 4 decimal places.'){
                            this.errors.capacity_m3_4 = 'Недопустимо более 4 чисел после десятичной точки в поле объем'
                        }
                        if(error.response.data[key][0] == 'Ensure that there are no more than 4 decimal places.'){
                            this.errors.length_m_4 = 'Недопустимо более 4 чисел после десятичной точки в поле длина'
                        }
                        if(error.response.data[key][0] == 'Ensure that there are no more than 4 decimal places.'){
                            this.errors.height_m_4 = 'Недопустимо более 4 чисел после десятичной точки в поле высота'
                        }
                        if(error.response.data[key][0] == 'Ensure that there are no more than 4 decimal places.'){
                            this.errors.width_m_4 = 'Недопустимо более 4 чисел после десятичной точки в поле ширина'
                        }
                        

                        if(error.response.data[key][0] == 'Ensure that there are no more than 10 digits in total.'){
                            this.errors.capacity_m3_10 = 'Общее количество чисел в поле объем не должно превышать 10'
                        }
                        if(error.response.data[key][0] == 'Ensure that there are no more than 10 digits in total.'){
                            this.errors.length_m_10 = 'Общее количество чисел в поле длина не должно превышать 10'
                        }
                        if(error.response.data[key][0] == 'Ensure that there are no more than 10 digits in total.'){
                            this.errors.height_m_10 = 'Общее количество чисел в поле высота не должно превышать 10'
                        }
                        if(error.response.data[key][0] == 'Ensure that there are no more than 10 digits in total.'){
                            this.errors.width_m_10 = 'Общее количество чисел в поле ширина не должно превышать 10'
                        }
                    });
                })
            }
        },
        sendStatus(){
            this.$v.cellstatus.$touch()
            if(!this.$v.cellstatus.$invalid){
                axios.put('http://87.255.194.66:1337/api/orders/' + localStorage.getItem('orderId') + '/fulfillment/update/',
                {
                    cell_number: this.cellstatus.cell_number,
                    status: this.cellstatus.cstatus
                },
                {
                    headers:{
                        Authorization: 'Token ' + localStorage.getItem('usertoken')
                    }
                }).then(() => {
                    alert('успешно')
                    this.getRequestData()
                    this.dialog=false
                })
            }
        },
        isNumber (e) {
        const regex = /[0-9]/
        if (!regex.test(e.key)) {
            e.returnValue = false;
            if (e.preventDefault) e.preventDefault();
            }
        },
        isDecimal (e) {
        const regex = /^\d*\.?\d*$/
        if (!regex.test(e.key)) {
            e.returnValue = false;
            if (e.preventDefault) e.preventDefault();
            }
        },
    },
    computed:{
        organizationErrors () {
            const errors = []
            if (!this.$v.requestForm.organization.$dirty) return errors
            !this.$v.requestForm.organization.required && errors.push('Данное поле обязательно для заполнения')
            return errors
        },
        addressErrors(){
            const errors = []
            if (!this.$v.requestForm.address.$dirty) return errors
            !this.$v.requestForm.address.required && errors.push('Данное поле обязательно для заполнения')
            return errors
        },
        contactsErrors(){
            const errors = []
            if (!this.$v.requestForm.contacts.$dirty) return errors
            !this.$v.requestForm.contacts.required && errors.push('Данное поле обязательно для заполнения')
            return errors
        },
        distributeTypeErrors(){
            const errors = []
            if (!this.$v.requestForm.distributeType.$dirty) return errors
            !this.$v.requestForm.distributeType.required && errors.push('Данное поле обязательно для заполнения')
            return errors
        },
        boxHeightErrors(){
            const errors = []
            if (!this.$v.box.height_m.$dirty) return errors
            !this.$v.box.height_m.required && errors.push('Данное поле обязательно для заполнения')
            return errors
        },
        boxWidthErrors(){
            const errors = []
            if (!this.$v.box.width_m.$dirty) return errors
            !this.$v.box.width_m.required && errors.push('Данное поле обязательно для заполнения')
            return errors
        },
        boxLengthErrors(){
            const errors = []
            if (!this.$v.box.length_m.$dirty) return errors
            !this.$v.box.length_m.required && errors.push('Данное поле обязательно для заполнения')
            return errors
        },  
        boxCapacityErrors(){
            const errors = []
            if (!this.$v.box.capacity_m3.$dirty) return errors
            !this.$v.box.capacity_m3.required && errors.push('Данное поле обязательно для заполнения')
            return errors
        },
        // statusCellnumberErrors(){
        //     const errors = []
        //     if (!this.$v.cellstatus.cell_number.$dirty) return errors
        //     !this.$v.cellstatus.cell_number.required && errors.push('Данное поле обязательно для заполнения')
        //     return errors
        // },
        statusCellStatusErrors(){
            const errors = []
            if (!this.$v.cellstatus.cstatus.$dirty) return errors
            !this.$v.cellstatus.cstatus.required && errors.push('Данное поле обязательно для заполнения')
            return errors
        }
    },
    mounted(){
        this.getUserRole(),
        this.getRequestData(),
        this.getShippingTypes(),
        this.getOrderStatuses()
        
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

</style>