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
                                <h2>Смена пароля</h2>
                                <v-text-field 
                                v-model="password" 
                                class="input" 
                                label="Новый пароль:" 
                                placeholder="Пароль"
                                :error-messages="passwordErrors"
                                required
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPassword ? 'text' : 'password'"
                                @click:append="showPassword = !showPassword"
                                
                                @input="$v.password.$touch()"
                                @blur="$v.password.$touch()"
                                />

                                <v-text-field 
                                v-model="repeatPassword" 
                                class="input" 
                                label="Повторить пароль:" 
                                placeholder="Пароль"
                                :error-messages="repeatPasswordErrors"
                                :append-icon="showRepeatPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showRepeatPassword ? 'text' : 'password'"
                                @click:append="showRepeatPassword = !showRepeatPassword"
                                required
                                @input="$v.repeatPassword.$touch()"
                                @blur="$v.repeatPassword.$touch()"
                                />
                                <v-btn
                                type="submit"
                                block
                                class="mt-5"
                                color="#0099FF">
                                    Продолжить
                                </v-btn>
                            </v-form>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
export default {
    data:() => ({
        showPassword: false,
        showRepeatPassword: false,
        password: '',
        repeatPassword: ''
    }),
    methods:{
        submitHandler(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                axios.post('http://87.255.194.66:1337/auth/users/reset_password_confirm/', 
                {
                    
                }).then((response) => {
                    this.$router.push('/login/change/after')
                }).catch((error) => {
                    
                    
                })
            }
        },
        getToken(){
            axios.get('http://87.255.194.66:1337/users/password/reset/confirm/',
            {
                // headers:{
                //     Authorization: 'Token ' + localStorage.getItem('usertoken')
                // }
            }).then((response) => {
                // console.log(response.data)
                
            })
        }
    },
    mounted(){
        this.getToken()
    },
    computed:{
        passwordErrors(){
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push('Данное поле обязательно для заполнения')
            !this.$v.password.minLength && errors.push('Данное поле должно содержать не менее 8 символов')
            return errors
        },
        repeatPasswordErrors(){
            const errors = []
            if (!this.$v.repeatPassword.$dirty) return errors
            !this.$v.repeatPassword.required && errors.push('Данное поле обязательно для заполнения')
            !this.$v.repeatPassword.sameAsPassword && errors.push('Данное поле должно совпадать с предыдущим')
            return errors
        }
    },
    validations:{
        password: {required, minLength: minLength(8)},
        repeatPassword: {required, sameAsPassword: sameAs('password')}
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
        border-radius: 50%;
    }
}

.container{
    height: 100%;
}

.row{
    height: 100%;
}

</style>