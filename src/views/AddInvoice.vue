<template>
    <div class="form">
        <div class="form__inner">
            <v-container>
                <v-row class="form__row">
                    <v-col cols="6" >
                        <v-card class="form__card">
                            <v-form @submit.prevent="submitHandler()" class="form">
                                <h2>Добавить накладную</h2>

                                <v-text-field 
                                v-model="number" 
                                class="input" 
                                label="Введите номер накладной:" 
                                placeholder="012354"
                                :error-messages="numberErrors"
                                required
                                @input="$v.number.$touch()"
                                @blur="$v.number.$touch()"
                                />

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
                                        label="Выберите дату"
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
                                <v-btn color="green"
                                dark 
                                type="submit" 
                                class="form__button" block>
                                    Сохранить
                                </v-btn>
                                <router-link to="/invoices">
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
import { required } from 'vuelidate/lib/validators'
import { BASE_URL } from '../helpers/const'
export default {
    data: () => ({
        number: '',
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false
    }),
    methods:{
        submitHandler(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                axios.post(`${BASE_URL}/api/invoices/`,
                {
                    number: this.number,
                    date: this.date
                },
                {
                    headers:{
                        Authorization: 'Token ' + localStorage.getItem('usertoken')
                    }
                }).then((response) => {
                    
                    this.$router.push('/invoices')
                }).catch((error) => {
                    
                })
            }
        }
    },
    computed:{
        numberErrors(){
            const errors = []
            if (!this.$v.number.$dirty) return errors
            !this.$v.number.required && errors.push('Данное поле обязательно для заполнения')
            return errors
        }
    },
    validations: {
        number: {required}
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