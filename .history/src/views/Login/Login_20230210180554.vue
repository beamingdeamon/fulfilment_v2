<template>
    <div class="form">
            <v-container>
                <v-row class="d-flex justify-center align-center justify-space-around" >
                    <v-col class="d-flex align-center justify-space-around " cols="2">
                        <div class="logo">
                            <img src="../../assets/logo/fullfilment-logo.svg" alt="logo">
                        </div>
                    </v-col>
                    <v-col  cols="6">
                        <v-card class="form__card">
                            <v-form @submit.prevent="submitHandler()" class="form">
                                <h1 class="lname">Fulfillment eTrade Partner</h1>
                                <br>
                                <h2 class="name">Вход</h2>
                                <v-text-field 
                                    v-model="username" 
                                    class="input" 
                                    label="Введите имя пользователя" 
                                    placeholder="Логин"
                                    :error-messages="usernameErrors"
                                    required
                                    @input="$v.username.$touch()"
                                    @blur="$v.username.$touch()"
                                />

                                <v-text-field 
                                    v-model="password" 
                                    class="input" 
                                    label="Введите пароль"
                                    :error-messages="passwordErrors"
                                    required
                                    @input="$v.password.$touch()"
                                    @blur="$v.password.$touch()"
                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showPassword ? 'text' : 'password'"
                                    @click:append="showPassword = !showPassword"
                                />
                                <p class="invalid-feedback" v-if="error">{{error}}</p>
                                <v-btn color="#C0C0C0" type="submit" class="form__button  "  block>
                                    Войти
                                </v-btn>
                                <p class="form__text">Или</p>
                                <router-link to="/registration/1">
                                    <v-btn color="primary" class="form__button mb-5 " block>
                                        Зарегистрироваться
                                    </v-btn>
                                </router-link>
                                <!-- <router-link to="/login/change/1">
                                    <a class="form__link" href="">Забыли пароль?</a>
                                </router-link> -->
                                <!-- <a @click.prevent="resetPassword()" class="form__link" href="">Забыли пароль?</a> -->
                            </v-form>
                        </v-card>
                    </v-col>
                </v-row>
                <a href="https://dzhandosoft.kz/" class="soft" target="_blank">  © Разработано компанией<ins> DzhandoSoft </ins></a> 
            
            </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import { required } from 'vuelidate/lib/validators'
export default {
    data: () => ({
        username: '',
        password: '',
        showPassword: false,
        error: ''
    }),
    methods:{
        submitHandler(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                axios.post('http://87.255.194.66:1337/auth/token/login/', 
                {
                    username: this.username,
                    password: this.password
                }).then((response) => {
                    
                    localStorage.setItem('usertoken', response.data.auth_token)
                    this.$router.push('/invoices')
                }).catch((error) => {
                    
                    error.response.data.non_field_errors.forEach((element) => {
                        if(element == 'Unable to log in with provided credentials.'){
                            this.error = 'Предоставленные учетные данные недействительны'
                        }
                    });
                })
            }
        },
        resetPassword(){
            axios.get('http://87.255.194.66:1337/auth/users/reset_password/',
            {
                // headers:{
                //     Authorization: 'Token ' + localStorage.getItem('usertoken')
                // }
            }).then(() => {
                this.$router.push('/login/change/1')
            })
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
            return errors
        }
    },
    validations:{
        username: {required},
        password: {required}
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
    }
}

.container{
    height: 100%;
}

.row{
    height: 100%;
}
.soft{
    margin: 0;
    position: absolute;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%) ;
   
    font-size: 18px;
    font-family:Georgia, 'Times New Roman', Times, serif;
    color: #000000;
}
.lname{
    text-align: center;
    font-size: 30px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    color:#414c4c;
   
}
.name{
    text-align: center;
    font-size: 25px;
    font-family:Georgia, 'Times New Roman', Times, serif;
    color:#111212;
   
}
</style>