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
                                    v-model.trim="email" 
                                    class="input" 
                                    label="Введите электронную почту:" 
                                    placeholder="a@gmail.com"
                                    :error-messages="emailErrors"
                                    required
                                    @input="$v.email.$touch()"
                                    @blur="$v.email.$touch()"
                                />
                                <p class="notification" v-if="notificationStatus == true">{{notification}}</p>
                                <v-btn
                                type="submit"
                                block
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
import { required, email } from 'vuelidate/lib/validators'
export default {
    data: () => ({
        email: '',
        notificationStatus: false,
        notification: 'Вам на почту пришло сообщение, проверьте'
    }),
    methods:{
        submitHandler(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                axios.post('http://87.255.194.66:1337/auth/users/reset_password/',
                {
                    email: this.email
                },
                {
                    // headers:{
                    //     Authorization: 'Token ' + localStorage.getItem('usertoken')
                    // }
                }).then((response) => {
                    
                    this.notificationStatus = true
                }).catch((error) => {
                    
                })
            }
        }
    },
    computed:{
        emailErrors(){
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.required && errors.push('Данное поле обязательно для заполнения')
            !this.$v.email.email && errors.push('Данное поле должно содержать электронную почту')
            return errors
        }
    },
    validations: {
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
    width: 250px;
    height: 250px;
    img{
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

.notification{

}
</style>