<template>
    <div class="organization">
        <div class="organization__inner">
            <h2 class="mt-5 ml-5">Организации</h2>
            <br>
            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            №
                        </th>
                        <th class="text-left">
                            Организация
                        </th>
                        <th class="text-left">
                            Логин
                        </th>
                        <th class="text-left">
                            Контакты
                        </th>
                        <th class="text-left">
                            Тип
                        </th>
                        <th class="text-left">
                           ФИО
                        </th>
                        <th class="text-left">
                            Статус
                        </th>
                        <th class="text-left">
                           Активация 
                        </th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="(organization, index) in organizationList"
                    :key="organization.id"
                    >
                        <td>{{ index + 1 }}</td>
                        <td>{{ organization.organization }}</td>

                        <td>{{ organization.invoice_detail[0] }}</td>

                        <td>{{ organization.contacts }}</td>

                        <td>{{ organization.title }}</td>
                        <td>{{ organization.vendor_code }}</td>
                        <td>{{ organization.good_quantity }}</td>
                        
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default
{
    data: () => ({
        organizationList: []
    }),

    methods:{
        getOrganizationList(){
            axios.get('http://0.0.0.0:8000//users/',
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                console.log(response.data)
                this.organizationList = response.data
            })
        }
    },
    mounted(){
        this.getOrganizationList()
    }
    
}



</script>