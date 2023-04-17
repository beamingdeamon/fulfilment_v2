<template>
    <!-- <div class="registration">
        <div class="retistration__inner">
            <v-container>
                <v-row class="form__row">
                    <v-col cols="6" >
                        <v-card class="form__card">
                            <v-form @submit.prevent="submitHandler()" class="form">
                                <h2>Регистрация</h2>
                                <h2>Этап 1</h2>
                                
                                <v-text-field 
                                v-model="username" 
                                class="input" 
                                label="Имя пользователя:" 
                                placeholder="Логин"
                                :error-messages="usernameErrors"
                                required
                                @input="$v.username.$touch()"
                                @blur="$v.username.$touch()"
                                />

                                <v-text-field 
                                v-model="password" 
                                class="input" 
                                label="Пароль" 
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
                                <p class="invalid-feedback" v-if="errors.similiar">{{errors.similiar}}</p>
                                <p class="invalid-feedback" v-if="errors.common">{{errors.common}}</p>
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
                                <!-- <h2>Этап 1</h2> -->
                                
                                <v-text-field 
                                v-model="username" 
                                class="input" 
                                label="Имя пользователя:" 
                                placeholder="Логин"
                                :error-messages="usernameErrors"
                                required
                                @input="$v.username.$touch()"
                                @blur="$v.username.$touch()"
                                />

                                <v-text-field 
                                v-model="password" 
                                class="input" 
                                label="Пароль" 
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
                                <p class="invalid-feedback" v-if="errors.similiar">{{errors.similiar}}</p>
                                <p class="invalid-feedback" v-if="errors.common">{{errors.common}}</p>
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
</template>

<script>
import axios from 'axios'
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
export default {
    data: () => ({
        username: '',
        password: '',
        repeatPassword: '',
        showPassword: false,
        showRepeatPassword: false,
        errors: {
            similiar: '',
            common: '',
            exists: ''
        },
        error: []
    }),
    methods:{
        submitHandler(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                axios.post('http://87.255.194.66:1337/auth/users/', 
                {
                    username: this.username,
                    password: this.password
                })
                .then((response) => {
                    
                    localStorage.setItem('id', response.data.id)
                    this.$router.push('/registration/2')
                })
                .catch((error) => {
                    
                        if(error.response.data.password){
                            error.response.data.password.forEach((element) => {
                                if(element == 'This password is too common.'){
                                    this.errors.common = 'Этот пароль слишком распространен'
                                }
                                if(element == 'The password is too similar to the username.'){
                                    this.errors.similiar = 'Пароль похож на имя пользователя.'
                                }
                            });
                        }
                        if(error.response.data.username){
                            error.response.data.username.forEach((element) => {
                                if(element == 'A user with that username already exists.'){
                                    this.errors.exists = 'Пользователь с таким именем уже существует'
                                }
                            });
                        }
                })
            }
        }
    },
    computed:{
        usernameErrors () {
            const errors = []
            if (!this.$v.username.$dirty) return errors
            !this.$v.username.required && errors.push('Данное поле обязательно для заполнения')
            return errors
        },
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
        username: {required},
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