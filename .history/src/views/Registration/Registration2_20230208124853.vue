<template>
    <div class="form">
            <v-container>
                <v-row class="d-flex justify-center align-center">
                    <v-col class="d-flex align-center" cols="2">
                        <div class="logo">
                            <img src="../../assets/logo/fullfilment-logo.svg" alt="logo">
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <v-card class="form__card">
                            <v-form @submit.prevent="submitHandler()" class="form">
                                <h2>Регистрация</h2>
                                <!-- <h2>Этап 2</h2> -->
                                <v-text-field 
                                v-model="first_name" 
                                class="input" 
                                label="Фамилия" 
                                placeholder="Фамилия"
                                :error-messages="firstnameErrors"
                                required
                                @input="$v.first_name.$touch()"
                                @blur="$v.first_name.$touch()"
                                @keypress="isLetter"/>

                                <v-text-field 
                                v-model="last_name" 
                                class="input" 
                                label="Имя" 
                                placeholder="Имя"
                                :error-messages="lastnameErrors"
                                required
                                @input="$v.last_name.$touch()"
                                @blur="$v.last_name.$touch()"
                                @keypress="isLetter"/>

                                <v-text-field 
                                v-model="email" 
                                class="input" 
                                label="E-mail" 
                                placeholder="E-mail"
                                :error-messages="emailErrors"
                                required
                                @input="$v.email.$touch()"
                                @blur="$v.email.$touch()"/>

                                <v-text-field 
                                v-model="phone" 
                                class="input" 
                                label="Телефон"
                                maxlength="12" 
                            
                                v-mask="'+7 (###) ###-##-##'"
                                placeholder="+777******"
                                @keypress="isNumber"/>
                                
                                <p class="invalid-feedback" v-if="errors.exists">{{errors.exists}}</p>
                                <v-btn type="submit" class="form__button button-register" color="primary" block>
                                    Далее
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
                                <h2>Этап 2</h2>
                                <v-text-field 
                                v-model="first_name" 
                                class="input" 
                                label="Фамилия" 
                                placeholder="Фамилия"
                                :error-messages="firstnameErrors"
                                required
                                @input="$v.first_name.$touch()"
                                @blur="$v.first_name.$touch()"
                                @keypress="isLetter"/>

                                <v-text-field 
                                v-model="last_name" 
                                class="input" 
                                label="Имя" 
                                placeholder="Имя"
                                :error-messages="lastnameErrors"
                                required
                                @input="$v.last_name.$touch()"
                                @blur="$v.last_name.$touch()"
                                @keypress="isLetter"/>

                                <v-text-field 
                                v-model="email" 
                                class="input" 
                                label="E-mail" 
                                placeholder="E-mail"
                                :error-messages="emailErrors"
                                required
                                @input="$v.email.$touch()"
                                @blur="$v.email.$touch()"/>

                                <v-text-field 
                                v-model="phone" 
                                class="input" 
                                label="Телефон"
                                maxlength="12" 
                                placeholder="E-mail"
                                
                                @keypress="isNumber"/>
                                
                                <p class="invalid-feedback" v-if="errors.exists">{{errors.exists}}</p>
                                <v-btn type="submit" class="form__button button-register" color="primary" block>
                                    Далее
                                </v-btn>
                                
                            </v-form>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div> -->
    <!-- :error-messages="phoneErrors"
                                required
                                @input="$v.phone.$touch()"
                                @blur="$v.phone.$touch()" -->
                        
</template>

<script>
import axios from 'axios'
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import VueDirectiveMask from '@vuejs-community/vue-directive-mask'

Vue.use(VueDirectiveMask);
export default {
    data: () => ({
        first_name: '',
        last_name: '',
        phone: '+',
        email: '',
        errors:{
            exists: ''
        }
        // phoneNumberMask: {
        //     mask: '+{7}(000)000-00-00' ,
        //     lazy: true
        // }
    }),
    methods: {
        submitHandler(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                axios.patch('http://87.255.194.66:1337/users/' + localStorage.getItem('id') + '/update/', 
                {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    phone: this.phone,
                    email: this.email
                },
                )
                .then((response) => {
                    // localStorage.setItem('id', response.data)
                    console.log(response.data)
                    
                    this.$router.push('/registration/3')
                })
                .catch((error) => {
                    console.log(error)
                    if(error.response.data){
                        error.response.data.phone.forEach((element) => {
                            if(element == 'user with this phone already exists.'){
                                this.errors.exists = 'Пользователь с этим телефоном уже существует'
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


        // directives:{
        //     mask: VueDirectiveMask
        // },
//add directives 

        isLetter (e) {
        const regex = /^([а-яё\s]+|[a-z\s]+)$/iu
        if (!regex.test(e.key)) {
            e.returnValue = false;
            if (e.preventDefault) e.preventDefault();
            }
        } 
    },
    computed:{
        firstnameErrors () {
            const errors = []
            if (!this.$v.first_name.$dirty) return errors
            !this.$v.first_name.required && errors.push('Данное поле обязательно для заполнения')
            return errors
        },
        lastnameErrors () {
            const errors = []
            if (!this.$v.last_name.$dirty) return errors
            !this.$v.last_name.required && errors.push('Данное поле обязательно для заполнения')
            return errors
        },
        phoneErrors () {
            const errors = []
            if (!this.$v.phone.$dirty) return errors
            !this.$v.phone.required && errors.push('Данное поле обязательно для заполнения')
            !this.$v.phone.minLength && errors.push('Данное поле должно содержать номер телефона')
            return errors
        },
        emailErrors(){
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.required && errors.push('Данное поле обязательно для заполнения')
            !this.$v.email.email && errors.push('Данное поле должно содержать электронную почту')
            return errors
        }
    },
    validations:{
        first_name: {required},
        last_name: {required},
        phone: {required, minLength: minLength(11)},
        email: {required, email}
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
            
            border-radius: 5%;
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
    width: 150px;
    height: 150px;
    img{
        max-width: 100%;
        border-radius: 40%;
    }
}

.container{
    height: 100%;
}

.row{
    height: 100%;
}

</style>