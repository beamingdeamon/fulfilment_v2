<template>
    <div class="form">
            <v-container>
                <v-row class="d-flex justify-center align-center justify-space-around">
                    <v-col class="d-flex align-center" cols="2">
                        <div class="logo">
                            <img src="../../assets/logo/fullfilment-logo.svg" alt="logo">
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <v-card class="form__card">
                            <v-form @submit.prevent="submitHandler()" class="form">
                                <h2>Регистрация</h2>
                                <!-- <h2>Этап 3</h2> -->
                                <v-select
                                v-model="typeId"
                                :items="typeList"
                                item-text="type"
                                item-value="id"
                                label="Тип организации"
                                :error-messages="orgtypeErrors"
                                @change="$v.typeId.$touch()"
                                @blur="$v.typeId.$touch()"
                                ></v-select>
                                
                                <v-text-field 
                                class="input" 
                                v-model="name" 
                                label="Имя организации" 
                                placeholder="Имя организации"
                                :error-messages="nameErrors"
                                @input="$v.name.$touch()"
                                @blur="$v.name.$touch()"
                                />

                                <v-text-field 
                                class="input" 
                                v-model="BIN" 
                                label="BIN" 
                                placeholder="BIN"
                                maxLength="12"
                                @keypress="isNumber"
                                :error-messages="binErrors"
                                @input="$v.BIN.$touch()"
                                @blur="$v.BIN.$touch()"
                                />

                                <v-text-field 
                                class="input" 
                                v-model="address" 
                                label="Адрес" 
                                placeholder="Адрес"
                                :error-messages="addressErrors"
                                @input="$v.address.$touch()"
                                @blur="$v.address.$touch()"
                                />

                                <v-select
                                v-model="bankId"
                                :items="bankList"
                                item-text="name"
                                item-value="id"
                                label="Выберите банк"
                                :error-messages="bankErrors"
                                @change="$v.bankId.$touch()"
                                @blur="$v.bankId.$touch()"
                                >
                                </v-select>
                                
                                <v-text-field 
                                class="input" 
                                v-model="IBAN" 
                                label="IBAN" 
                                placeholder="IBAN"
                                maxLength="21"
                                :error-messages="ibanErrors"
                                @change="$v.IBAN.$touch()"
                                @blur="$v.IBAN.$touch()"
                                />

                                <v-text-field 
                                class="input" 
                                v-model="phone" 
                                label="Телефон" 
                                
                                :error-messages="phoneErrors"
                                @change="$v.phone.$touch()"
                                @blur="$v.phone.$touch()"
                               

                                v-mask="'+7 (###) ###-##-##'"
                                placeholder="+777******"
                                @keypress="isNumber"
                                
                                maxLength="18"
                                />

                                <v-text-field 
                                class="input" 
                                v-model="director_name" 
                                label="Имя директора" 
                                placeholder="Имя директора"
                                :error-messages="directornameErrors"
                                @change="$v.director_name.$touch()"
                                @blur="$v.director_name.$touch()"
                                />

                                <v-text-field 
                                class="input" 
                                v-model="director_phone" 
                                label="Телефон директора" 
                                placeholder="+777******"
                                @keypress="isNumber"
                                maxlength="18"
                                
                                v-mask="'+7 (###) ###-##-##'"
                                :error-messages="directorphoneErrors"
                                @change="$v.director_phone.$touch()"
                                @blur="$v.director_phone.$touch()"
                                />

                                <!-- <v-text-field
                                class="input" 
                                v-model="fulfillment" 
                                label="Fulfillment" 
                                placeholder="Fulfillment"
                                :error-messages="fulfillmentErrors"
                                @change="$v.fulfillment.$touch()"
                                @blur="$v.fulfillment.$touch()"
                                /> -->
                                <p class="invalid-feedback" v-if="errors.exists">{{errors.exists}}</p>
                                <v-btn type="submit" class="form__button button-register" color="primary" block>
                                    Зарегистрироваться
                                </v-btn>
                                
                            </v-form>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
    </div>
    <!-- <div class="registration">
        <div class="retistration__inner">
            <v-container>
                <v-row class="form__row">
                    <v-col cols="6" >
                        <v-card class="form__card">
                            <v-form @submit.prevent="submitHandler()" class="form">
                                <h2>Регистрация</h2>
                                <h2>Этап 3</h2>
                                <v-select
                                v-model="typeId"
                                :items="typeList"
                                item-text="type"
                                item-value="id"
                                label="Тип организации"
                                :error-messages="orgtypeErrors"
                                @change="$v.typeId.$touch()"
                                @blur="$v.typeId.$touch()"
                                ></v-select>
                                
                                <v-text-field 
                                class="input" 
                                v-model="name" 
                                label="Имя организации" 
                                placeholder="Имя организации"
                                :error-messages="nameErrors"
                                @input="$v.name.$touch()"
                                @blur="$v.name.$touch()"
                                />

                                <v-text-field 
                                class="input" 
                                v-model="BIN" 
                                label="BIN" 
                                placeholder="BIN"
                                maxLength="12"
                                @keypress="isNumber"
                                :error-messages="binErrors"
                                @input="$v.BIN.$touch()"
                                @blur="$v.BIN.$touch()"
                                />

                                <v-text-field 
                                class="input" 
                                v-model="address" 
                                label="Адрес" 
                                placeholder="Адрес"
                                :error-messages="addressErrors"
                                @input="$v.address.$touch()"
                                @blur="$v.address.$touch()"
                                />

                                <v-select
                                v-model="bankId"
                                :items="bankList"
                                item-text="name"
                                item-value="id"
                                label="Выберите банк"
                                :error-messages="bankErrors"
                                @change="$v.bankId.$touch()"
                                @blur="$v.bankId.$touch()"
                                >
                                </v-select>
                                
                                <v-text-field 
                                class="input" 
                                v-model="IBAN" 
                                label="IBAN" 
                                placeholder="IBAN"
                                maxLength="21"
                                :error-messages="ibanErrors"
                                @change="$v.IBAN.$touch()"
                                @blur="$v.IBAN.$touch()"
                                />

                                <v-text-field 
                                class="input" 
                                v-model="phone" 
                                label="Телефон" 
                                placeholder="+77001616757"
                                :error-messages="phoneErrors"
                                @change="$v.phone.$touch()"
                                @blur="$v.phone.$touch()"
                                maxLength="12"
                                />

                                <v-text-field 
                                class="input" 
                                v-model="director_name" 
                                label="Имя директора" 
                                placeholder="Имя директора"
                                :error-messages="directornameErrors"
                                @change="$v.director_name.$touch()"
                                @blur="$v.director_name.$touch()"
                                />

                                <v-text-field 
                                class="input" 
                                v-model="director_phone" 
                                label="Телефон директора" 
                                placeholder="+77001616757"
                                maxLength="12"
                                :error-messages="directorphoneErrors"
                                @change="$v.director_phone.$touch()"
                                @blur="$v.director_phone.$touch()"
                                />

                                <v-text-field
                                class="input" 
                                v-model="fulfillment" 
                                label="Fulfillment" 
                                placeholder="Fulfillment"
                                :error-messages="fulfillmentErrors"
                                @change="$v.fulfillment.$touch()"
                                @blur="$v.fulfillment.$touch()"
                                />
                                <p class="invalid-feedback" v-if="errors.exists">{{errors.exists}}</p>
                                <v-btn type="submit" class="form__button button-register" color="primary" block>
                                    Зарегистрироваться
                                </v-btn>
                                
                            </v-form>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div> -->
</template>

<script>
import axios from 'axios'
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import { BASE_URL } from '../../helpers/const'
export default {
    data: () => ({
        typeList: [],
        bankList: [],
        bankId: '',
        typeId: '',
        name: '',
        BIN: '',
        address: '',
        IBAN: '',
        phone: '+',
        director_name: '',
        director_phone: '+',
        fulfillment: '',
        errors:{
            exists: ''
        }
    }),
    methods:{
        getOrgType(){
            axios.get(`${BASE_URL}/org_types/`)
            .then((response) => {
                
                this.typeList = response.data
            })
        },
        getBankList(){
            axios.get(`${BASE_URL}/banks/`)
            .then((response) => {
                
                this.bankList = response.data
            })
        },
        submitHandler(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                axios.post(`${BASE_URL}/user/organization/create/`, 
                {
                    user: localStorage.getItem('id'),
                    type: this.typeId,
                    name: this.name,
                    BIN: this.BIN,
                    address: this.address,
                    bank: this.bankId,
                    IBAN: this.IBAN,
                    phone: this.phone,
                    director_name: this.director_name,
                    director_phone: this.director_phone,
                    fulfillment: this.fulfillment
                },
                {
                    params: {
                        user: localStorage.getItem('id')
                    }
                }
                )
                .then((response) => {
                    // alert('Успешно')
                    this.$router.push('/registration/after')
                    // localStorage.removeItem('id')
                })
                .catch((error) => {
                    
                    if(error.response.data){
                        error.response.data.phone.forEach((element) => {
                            if(element == 'organization with this phone already exists.'){
                                this.errors.exists = 'Организация с этим телефоном уже существует'
                            }
                        });
                    }
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
        isLetter (e) {
        const regex = /^([а-яё\s]+|[a-z\s]+)$/iu
        if (!regex.test(e.key)) {
            e.returnValue = false;
            if (e.preventDefault) e.preventDefault();
            }
        }
    },
    computed:{
        bankErrors () {
            const errors = []
            if (!this.$v.bankId.$dirty) return errors
            !this.$v.bankId.required && errors.push('Обязательно для выбора')
            return errors
        },
        orgtypeErrors () {
            const errors = []
            if (!this.$v.typeId.$dirty) return errors
            !this.$v.typeId.required && errors.push('Обязательно для выбора')
            return errors
        },
        nameErrors () {
            const errors = []
            if (!this.$v.name.$dirty) return errors
            !this.$v.name.required && errors.push('Обязательное поле для заполнения')
            return errors
        },
        binErrors () {
            const errors = []
            if (!this.$v.BIN.$dirty) return errors
            !this.$v.BIN.required && errors.push('Обязательное поле для заполнения')
            !this.$v.BIN.minLength && errors.push('Данное поле должно содержать 12 символов')
            return errors
        },
        addressErrors () {
            const errors = []
            if (!this.$v.address.$dirty) return errors
            !this.$v.address.required && errors.push('Обязательное поле для заполнения')
            return errors
        },
        ibanErrors () {
            const errors = []
            if (!this.$v.IBAN.$dirty) return errors
            !this.$v.IBAN.required && errors.push('Обязательное поле для заполнения')
            return errors
        },
        phoneErrors () {
            const errors = []
            if (!this.$v.phone.$dirty) return errors
            !this.$v.phone.required && errors.push('Обязательное поле для заполнения')
            !this.$v.phone.minLength && errors.push('Данное поле должно содержать номер телефона')
            return errors
        },
        directornameErrors () {
            const errors = []
            if (!this.$v.director_name.$dirty) return errors
            !this.$v.director_name.required && errors.push('Обязательное поле для заполнения')
            return errors
        },
        directorphoneErrors () {
            const errors = []
            if (!this.$v.director_phone.$dirty) return errors
            !this.$v.director_phone.required && errors.push('Обязательное поле для заполнения')
            return errors
        },
        fulfillmentErrors () {
            const errors = []
            if (!this.$v.fulfillment.$dirty) return errors
            !this.$v.fulfillment.required && errors.push('Обязательное поле для заполнения')
            return errors
        },
    },
    validations:{
        bankId: {required},
        typeId: {required},
        name: {required},
        BIN: {required, minLength: minLength(12)},
        address: {required},
        IBAN: {required},
        phone: {required, minLength: minLength(11)},
        director_name: {required},
        director_phone: {required}
    },
    mounted(){
        this.getOrgType(),
        this.getBankList()
    }
}
</script>

<style lang="scss" scoped>
.form {
    height: 100%;
		&__inner {
            height: 100%;
		}

        &__card{
            padding: 20px;
            
            border-radius: 3%;
        }

        &__row{
            display: flex;
            justify-content: center;
            margin: 100px 0 0 0;
        }

        &__text{
            text-align: center;
            margin: 10px 0 0 0;
        }

        &__button{
            margin: 10px 0 0 0;
            &:last-child{
                margin-bottom: 10px;
            }
        }

        &__link{
            text-align: center;
            width: 100%;
            margin: 20px 0 0 0;
        }

        
}
.form {
}
.input {
}
.invalid-feedback{
    color: rgb(252, 20, 20);
}

.logo{
     position: absolute;
    // width: 150px;
    // height: 150px;
   
    img{
        // position:fixed;
        max-width: 60%;
        border-radius: 40%;
    }}


.container{
    height: 100%;
}

.row{
    height: 100%;
}

</style>
