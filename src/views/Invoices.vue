<template>
    <div class="invoices">
        <div class="invoices__inner">
            <h2 class="mt-5 ml-5">Накладные</h2>
            <router-link to="/invoices/add">
                <v-btn
                    v-if="role == 'Client'"
                    color="green"
                    dark
                    small
                    class="mt-5 ml-5"
                >
                Добавить накладную
                </v-btn>
            </router-link>
            
            <v-simple-table >
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                                №
                            </th>
                            <th class="text-left">
                                Номер накладной
                            </th>
                            <th class="text-left">
                                Дата накладной
                            </th>
                            <th class="text-left">
                                Отправитель
                            </th>
                            <th class="text-left">
                                Получатель
                            </th>
                            <th class="text-center">
                                Скачать
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="(item, index) in invoiceList"
                        :key="item.name"
                        >   
                            <td>{{index + 1}}</td>
                            <!-- <td>{{ item.number }}</td> -->
                            <td>
                                <router-link :to="{name: 'invoices-view', params: {id: item.id}}">
                                    <a @click="setIdToStorage(item.id)" href="">
                                        {{ item.number }}
                                    </a>
                                </router-link>
                            </td>
                            <td>{{ item.date }}</td>
                            <td>
                                <p v-if="role == 'Client'">{{organization.name}}</p>
                                <p v-if="role == 'Admin_ff'">{{item.organization}}</p>
                            </td>
                            <td>
                                <!-- <p v-if="role == 'Client'">{{organization.fulfillment}}</p>
                                <p v-if="role == 'Admin_ff'">eTrade Partner</p> -->
                                eTrade Partner
                            </td>
                            <td class="download-wrapper">
                                <a href="/test.pdf" download="PDF" ><img src="../assets/download-icon.png" alt="" class="download-icon"></a>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { BASE_URL } from '../helpers/const'
  export default {
    data: () => ({
        invoiceList: [],
        organization: {},
        selectedInvoice: {},
        dialog: false,
        role: ''
    }),
    methods:{
        // requests(){
        //     if(this.role == 'Client'){
        //         this.getClientOrganizationInvoices(),
        //         this.getOrganization()
        //     }
        //     if(this.role == 'Admin_ff'){
        //         this.getAdminOrganizationInvoices()
        //     }
        // },
        getOrganizationInvoices(){
            axios.get(`${BASE_URL}/api/organization/invoices/`,
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            })
            .then((response) => {
              
                this.invoiceList = response.data
            })
        },
        // getAdminOrganizationInvoices(){
        //     axios.get('http://87.255.194.27:8001/api/invoices/',
        //     {
        //         headers:{
        //             Authorization: 'Token ' + localStorage.getItem('usertoken')
        //         }
        //     })
        //     .then((response) => {
                
        //         this.invoiceList = response.data
        //     })
        // },
        getOrganization(){
            axios.get(`${BASE_URL}/api/organizations/1`,
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            })
            .then((response) => {
                this.organization = response.data
            })
        },
        pickInvoice(value){
            this.selectedInvoice = value
        },
        setIdToStorage(value){
            localStorage.setItem('invoiceId', value)
        },
        getRole(){
            this.role = localStorage.getItem('user_role')
        },
        getUserName(){
            axios.get(`${BASE_URL}/auth/users/`,
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                
                this.username = response.data[0].username,
                localStorage.setItem('user_id', response.data[0].id)
                this.getUserRole()
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
            })
        }
    },
    mounted(){
        this.getUserName()
        this.getRole()
        this.getOrganizationInvoices()
        this.getOrganization()
        // this.requests()
        
    }
  }
</script>
<style lang="sass" scoped>
.download-wrapper
    display: flex
    align-items: center
    justify-content: center
    .download-icon
        width: 24px
        height: 24px
</style>