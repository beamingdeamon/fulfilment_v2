<template>
    <div class="form">
        <div class="form__inner">
            <v-container>
                <v-row class="form__row">
                    <v-col cols="6" >
                        <v-card class="form__card">
                            <v-form @submit.prevent="submitHandler()" class="form">
                                <h2>Добавить товар</h2>

                                <v-text-field 
                                v-model="number" 
                                class="input" 
                                label="Введите Баркод" 
                                placeholder="1234567890123"
                                :error-messages="numberErrors"
                                />

                                <v-select
                                    clearable
                                    v-model="username"
                                    label="Выберите пользователя"
                                    :items="users"
                                    ></v-select>
                                <v-btn color="green"
                                @click="saveGood"
                                dark 
                                class="form__button" block>
                                    Сохранить
                                </v-btn>
                                <router-link to= "/goods">
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
            </v-container>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { BASE_URL } from '../helpers/const'
export default {
    data: () => ({
        number: '',
        users: [],
        username: "",
        users_list:[],
        response: 0,
    }),
    methods:{
        getUsers(){
            axios.get(`${BASE_URL}/users/`,
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                for (const item of response.data) {
                    this.users.push(item.username)
                }
                this.users_list = response.data;
            })
        },
        saveGood(){
            let user_id;
            for (const item of this.users_list) {
                if(item.username === this.username){
                    user_id = item.id
                }
            }
            axios.post(`${BASE_URL}/goods/`,{
                 "vendor_code": this.number,
                 "seller" : user_id
            },
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                },
            }).then((response) => {
                console.log(response)
                if(response.status === 201){
                    this.$router.push("/goods")
                }
            })
        }
    },
   mounted(){
    this.getUsers()
   }
}
</script>

<style lang="scss" scoped>
.form {

		&__inner {
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

</style>