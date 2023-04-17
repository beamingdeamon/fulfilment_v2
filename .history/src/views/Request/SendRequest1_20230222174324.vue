<template>
    <div class="request">
        <v-container>
            <div class="request__inner">
                <v-row class="display-flex justify-center mt-10">
                    <v-col cols="6">
                        <v-card class="card">
                            <v-form @submit.prevent="submitHandler()">
                                <h2 class="ln">Создание заявки на отправку</h2>
                                <br>
                                <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :return-value.sync="date"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                                class="mt-5"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                        v-model="date"
                                        label="Дата заявки"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="date"
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
                                        @click="$refs.menu.save(date)"
                                        >
                                        OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                                <v-text-field 
                                    v-model="organization" 
                                    class="input" 
                                    label="Кому:" 
                                    placeholder="ТОО/ИП"
                                    :error-messages="organizationErrors"
                                    required
                                    @input="$v.organization.$touch()"
                                    @blur="$v.organization.$touch()"
                                />
                                <v-text-field 
                                    v-model="address" 
                                    class="input" 
                                    label="Адрес доставки:" 
                                    placeholder="Мынбаева, 92"
                                    :error-messages="addressErrors"
                                    required
                                    @input="$v.address.$touch()"
                                    @blur="$v.address.$touch()"
                                />
                                <v-text-field 
                                    v-model="contacts" 
                                    class="input" 
                                    label="Контактные данные:" 
                                    placeholder="Контакты"
                                  
                                    :error-messages="contactsErrors"
                                    required
                                    @input="$v.contacts.$touch()"
                                    @blur="$v.contacts.$touch()"
                                />
                                
                                <v-select
                                v-model="distributeType"
                                :items="shippingTypes"
                                item-text="type"
                                item-value="id"
                                label="Тип отправки"
                                :error-messages="distributeTypeErrors"
                                @change="$v.distributeType.$touch()"
                                @blur="$v.distributeType.$touch()"
                                ></v-select>
                                <v-btn color="green"
                                dark  type="submit" class="form__button mt-3" block>
                                    Продолжить
                                </v-btn>
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
                                        </v-icon>Назад
                                    </v-btn>
                                </router-link>
                            </v-form>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import { required, minLength } from 'vuelidate/lib/validators'
import { BASE_URL } from '../../helpers/const'
export default {
    data:() => ({
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        organization: '',
        address: '',
        contacts: '',
        distributeType: '',
        menu: false,
        shippingTypes: []
    }),
    methods:{
        submitHandler(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                axios.post(`${BASE_URL}//api/orders/`, 
                {
                    date: this.date,
                    recipient: this.organization,
                    shipping_address: this.address,
                    contacts: this.contacts,
                    shipping_type: this.distributeType,
                    // organization: parseInt(localStorage.getItem('user_id'))
                },
                {
                    headers:{
                        Authorization: 'Token ' + localStorage.getItem('usertoken')
                    }
                }).then((response) => {
                    
                    localStorage.setItem('orderId', response.data.id)
                    this.$router.push('/request/2')
                }).catch((error) => {
                    
                })
                
                
            }
        },
        getShippingTypes(){
            axios.get(`${BASE_URL}/api/shipping_types/`,
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                this.shippingTypes = response.data
            })
        }
    },
    mounted(){
        this.getShippingTypes()
    },
    computed:{
        organizationErrors () {
            const errors = []
            if (!this.$v.organization.$dirty) return errors
            !this.$v.organization.required && errors.push('Данное поле обязательно для заполнения')
            return errors
        },
        addressErrors(){
            const errors = []
            if (!this.$v.address.$dirty) return errors
            !this.$v.address.required && errors.push('Данное поле обязательно для заполнения')
            return errors
        },
        contactsErrors(){
            const errors = []
            if (!this.$v.contacts.$dirty) return errors
            !this.$v.contacts.required && errors.push('Данное поле обязательно для заполнения')
            return errors
        },
        distributeTypeErrors(){
            const errors = []
            if (!this.$v.distributeType.$dirty) return errors
            !this.$v.distributeType.required && errors.push('Данное поле обязательно для заполнения')
            return errors
        }
    },
    validations:{
        organization: {required},
        address: {required},
        contacts: {required},
        distributeType: {required},
    }
}
</script>

<style lang="scss" scoped>
.card{
    padding: 20px;
}
.ln{
font-size: 25px;
}
</style>