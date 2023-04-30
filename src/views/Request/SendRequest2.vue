<template>
    <div class="request">
        <v-form ref="form" @submit.prevent="sendGoods()">
            <div style="display: flex; justify-content: end;" class="">
                <v-btn
                small
                class="mt-5 mr-5"
                color="green"
                :disabled="saveDisabled"
                type="submit">
                    Сохранить в черновик
                </v-btn>
                
            </div>
            <div style="display: flex; justify-content: end;" class="">
                <p class="invalid-feedback mr-5 mt-5" v-if="errors.arrayLength">{{errors.arrayLength}}</p>
            </div>
            
            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            Invoice ID
                        </th>
                        <th class="text-left">
                            Нумерация №
                        </th>
                        <th class="text-left">
                            Наименование товара
                        </th>
                        <th class="text-left">
                            Артикул
                        </th>
                        <th class="text-left">
                            Штрих-код
                        </th>
                        <th class="text-left">
                            Общий остаток 
                        </th>
                        <th class="text-left">
                            Выбрать 
                        </th>
                        <th class="text-left">
                             
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
                    v-for="(good, index) in goodsList"
                    :key="good.id"
                    v-if="good.result != 0"
                    >
                        <td>{{ good.invoice_id }}</td>
                        <td>{{ index + 1 }}</td>
                        <td>{{ good.title }}</td>
                        <td>{{ good.vendor_code }}</td>
                        <td>{{ good.bar_code }}</td>
                        <td>
                            <p v-if="good.result == null">{{ good.good_quantity }}</p>
                            
                            <p v-else>{{good.result}}</p>
                        </td>
                        <td>
                            <v-checkbox
                            color="success"
                            v-model.trim="form.selectedGood[index]"
                            :value="good.id">
                            </v-checkbox>
                            
                        </td>
                        <td>
                            <!-- <v-btn
                            class="mx-2 button"
                            fab
                            dark
                            color="green"
                            small
                            @click="appendQuantity(form.quantity_to_send[index], good.result, good.good_quantity)"
                            >
                                <v-icon dark>
                                    mdi-plus
                                </v-icon>
                            </v-btn> -->
                        </td>
                        <td>
                            <v-text-field
                            v-model.trim="form.quantity_to_send[index]"
                            @change="(value) => validateQuantity(value,good.good_quantity, good.result)"
                            @keypress="isNumber"
                            :rules="[rules.required]"
                            required
                            :disabled="!form.selectedGood[index]"></v-text-field>
                            <!-- {{index}} -->
                            <!-- v-if="form.selectedGood[index] != null" -->
                            <p class="invalid-feedback" v-if="form.quantity_to_send[index] > (good.result === null ?  good.good_quantity : good.result)">Количество не должно превышать остаток</p>
                            <p class="invalid-feedback" v-if="form.quantity_to_send[index] == 0">Количество товара должно превышать 0</p>
                            <!-- <div v-if="!$v.form.quantity_to_send[index].required">Description is required.</div> -->
                        </td>
                        <td>
                            <!-- <v-btn
                            class="button"
                            fab
                            dark
                            small
                            color="red"
                            @click="changeCounter('-1')"
                            >
                                <v-icon dark>
                                    mdi-minus
                                </v-icon>
                            </v-btn> -->
                        </td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </v-form>
    </div>
</template>


<script>
import axios from 'axios'
import { required, maxValue } from 'vuelidate/lib/validators'
import { BASE_URL } from '../../helpers/const'
export default {
    data: () => ({
        goodsList: [],
        form:{
            order: localStorage.getItem('orderId'),
            selectedGood: [],
            quantity_to_send: []
        },
        rules:{
            required: value => !!value || 'Данное поле обязательно',
        },
        modal: false,
        saveDisabled: false,
        errors:{
            arrayLength: ''
        }
    }),
    methods:{
        getOrdersGoodList(){
            axios.get(`${BASE_URL}/orders/good/list/`,
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                
                this.goodsList = response.data
            })
        },
        isNumber (e) {
        const regex = /[0-9]/
        if (!regex.test(e.key)) {
            e.returnValue = false;
            if (e.preventDefault) e.preventDefault();
            }
        },
        changeCounter: function(num){
			this.counter += +num
			
			!isNaN(this.counter) && this.counter > 0 ? this.counter : this.counter = 0;
		},
        appendQuantity(value, result, quantity){
            value++;
            // if(result == null){
            //     if(value > )
            // }
        },
        prependQuantity(){

        },
        sendGoods(){
            let goods = this.form.selectedGood
            let quantity = this.form.quantity_to_send
            let array = []
            for(let i in goods){
                if(goods[i] != null){
                    
                    array.push({
                        order: localStorage.getItem('orderId'),
                        good: goods[i],
                        quantity: quantity[i]
                    })
                    
                }
            }
            
            if(array.length == 0){
                this.errors.arrayLength = 'Пожалуйста, выберите товары перед сохранением'
            }
            else{
                axios.post(`${BASE_URL}/good_to_send/`,
                array,
                {
                    headers:{
                        Authorization: 'Token ' + localStorage.getItem('usertoken')
                    }
                }).then((response) => {
                    // console.log(response)
                    alert('Успешно')
                    this.$router.push({
                        name: 'requests-view',
                        params: {
                            id: localStorage.getItem('orderId')
                        }
                    })
                    // this.getOrdersGoodList()
                }).catch((error) => {
                    
                })
            }
            
        },
        validateQuantity(value, quantity, result){
            
            
            if (value > quantity || value == 0){
                this.saveDisabled=true;
            }
            // if(value == 0){
            //     this.saveDisabled=true;
            // }
            else {
                this.saveDisabled=false;
            }
        }
    },
    mounted(){
        this.getOrdersGoodList()
    }
}
</script>


<style lang="scss" scoped>
.button{
    width: 20px;
    height: 20px;
}

.invalid-feedback{
    color: rgb(252, 20, 20);
}
</style>

<!-- <td>
                            <v-btn
                            class="mx-2 button"
                            fab
                            dark
                            color="green"
                            small
                            @click="appendQuantity(form.quantity_to_send[index], good.result, good.good_quantity)"
                            >
                                <v-icon dark>
                                    mdi-plus
                                </v-icon>
                            </v-btn>
                        </td> -->

                        <!-- <td>
                            <v-btn
                            class="button"
                            fab
                            dark
                            small
                            color="red"
                            @click="changeCounter('-1')"
                            >
                                <v-icon dark>
                                    mdi-minus
                                </v-icon>
                            </v-btn>
                        </td> -->