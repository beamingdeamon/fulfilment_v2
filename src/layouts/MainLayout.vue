<template>
    <div class="main">
        
            <v-card
            class="mx-auto overflow-hidden card"
            >
                <v-app-bar 
                color="rgb(38, 50, 56)"
                
                prominent
                :height="58"
                >
                <!-- dark -->
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                <v-toolbar-title class="title">Fulfillment eTrade Partner</v-toolbar-title>

                <v-spacer></v-spacer>

                <!-- <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn> -->

                <v-spacer></v-spacer>

                <!-- <v-btn icon>
                    <v-icon>mdi-filter</v-icon>
                </v-btn> -->
                <div class="mr-5">
                    <v-toolbar-title class="mt-4" style="font-size: 15px">{{username}}</v-toolbar-title>
                    
                </div>
                <v-btn @click="logout()" color="primary" small class="mt-3">
                    Выйти
                </v-btn>

                </v-app-bar>

                <v-navigation-drawer
                v-model="drawer"
                absolute
                bottom
                temporary
                color=""
                >
                <v-list
                    nav
                    dense
                >
                    <v-list-item-group 
                    v-model="group"
                    active-class="deep-purple--text text--accent-4"
                    >
                    <!-- <router-link to="/main">
                        <v-list-item>
                            <v-list-item-title>Главная</v-list-item-title>
                        </v-list-item>
                    </router-link> -->
                    
                    <!-- <router-link to="/profile">
                        <v-list-item>
                            <v-list-item-title>Профиль</v-list-item-title>
                        </v-list-item>
                    </router-link> -->

                    <router-link to="/invoices">
                        <v-list-item>
                            <v-list-item-title>Накладные</v-list-item-title>
                        </v-list-item>
                    </router-link>
                    
                    <router-link to="/ozon">
                        <v-list-item>
                            <v-list-item-title>Накладные OZON</v-list-item-title>
                        </v-list-item>
                    </router-link>

                    <router-link to="/goods">
                        <v-list-item>
                            <v-list-item-title>Товары</v-list-item-title>
                        </v-list-item>
                    </router-link>

                    <router-link to="/ready-requests">
                        <v-list-item v-if ="role=='Admin_ff'">
                            <v-list-item-title>Обрабатываемые заявки</v-list-item-title>
                        </v-list-item>
                    </router-link>

                    <router-link to="/requests">
                        <v-list-item v-if ="role=='Admin_ff'">
                            <v-list-item-title>Не обработанные заявки</v-list-item-title>
                        </v-list-item>
                    </router-link>


                    <!-- <router-link to="/returns">
                        <v-list-item>
                            <v-list-item-title>Возврат и брак</v-list-item-title>
                        </v-list-item>
                    </router-link> -->

                    <router-link to="/keys">
                        <v-list-item>
                            <v-list-item-title>API ключи</v-list-item-title>
                        </v-list-item>
                    </router-link>

                    <router-link to="/organizations"  >
                        <v-list-item v-if ="role=='Admin_ff'">
                            <v-list-item-title>Пользователи</v-list-item-title>
                        </v-list-item>
                    </router-link>

                    </v-list-item-group>
                    
                </v-list>
            </v-navigation-drawer>
            <router-view/>
            </v-card>
    </div>
</template>

<script>
import axios from 'axios'
import { BASE_URL } from '../helpers/const'
export default {
    data: () => ({
        username: '',
        role: '',
        drawer: false,
        group: null,
    }),
    methods:{
        logout(){
            axios.post(`${BASE_URL}/auth/token/logout/`,
            {

            },
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then(() => {
                this.$router.push('/login')
                localStorage.clear()
            })
        },
        getUserName(){
            axios.get(`${BASE_URL}/auth/users/`,
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
               
                this.username = localStorage.getItem("username")
                for (const item of response.data) {
                    if(item.username ===  localStorage.getItem("username")){
                        console.log(this.username)
                        localStorage.setItem('user_id', item.id)
                    }
                }
                this.getUserRole()
            }).catch(error => {
                this.$router.push("/login")
            })
        },
        getUserRole(){
            axios.get(`${BASE_URL}/users/`+ localStorage.getItem('user_id') +'/role/',
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                
                this.role = response.data.role
                localStorage.setItem('user_role', response.data.role)
            }).catch(error => {
                console.log(error.response.data.error)
            })
        }
    },
    mounted(){
        this.getUserName()
        if(!window.localStorage.getItem("usertoken")){
            this.$router.push("/login")
        }
    },
    watch: {
      group () {
        this.drawer = false
      },
    }
}
</script>

<style lang="scss" scoped>
.main {
    z-index: 200;
    height: 100%;
		&__inner {
            
		}

        &__menu{
            margin-left: 20px;
        }

		&__nav-btn {
            margin-left: 10px;
		}

		&__content {
            
		}
        &__user-header{
            display: flex;
            align-items: center;
            p{
                margin: 0;
                
            }
        }
}

.card{
    height: 100%;
}

.title{
    font-family: "Lucida Console";
    font-size: 1.53rem !important;
    color:rgb(213, 211, 211);
    
}
.mt-4{
    color: aliceblue;
}
.v-toolbar__content{
    .v-btn{
        color:#d4d4d4;
    }
}

</style>