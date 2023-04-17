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
                            Тип
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
                        <td>{{ organization.org_type }}</td>
                        <td>{{ organization.org_name }}</td>
                        <td>{{ organization.username }}</td>
                        <td>{{ organization.phone }}</td>
                        <td>{{ organization.full_name }}</td>
                        <td>
                            <p class="a" v-if="organization.is_active == true">Активен</p>
                            <p class="d" v-if="organization.is_active == false">Неактивен</p>
                        </td>
                        <td>
                            <v-btn class="aa"  @click.prevent="changeUserStatus(organization.id)" v-if="organization.is_active == false">
                                Активировать
                            </v-btn>
                            <v-btn class="dd" color="red"  @click.prevent="changeUserStatus(organization.id)" v-if="organization.is_active == true">
                                Деактивировать
                            </v-btn>
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
export default
{
    data: () => ({
        organizationList: []
    }),

    methods:{
        getOrganizationList(){
            axios.get('http://87.255.194.66:1337/users/',
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                console.log(response.data)
                this.organizationList = response.data
            })
        },
        changeUserStatus(value){
            axios.patch('http://87.255.194.66:1337/users/'+ value +'/set_activity_status/', 
                {
                    
                },
                {
                    headers:{
                        Authorization: 'Token ' + localStorage.getItem('usertoken')
                    }
                })
                .then((response) => {
                    this.getOrganizationList()
                })
                .catch((error) => {
                    console.log(error)
                    
                    
                })
        }
    },
    mounted(){
        this.getOrganizationList()
    }
    
}




</script>
<style lang="scss" scoped>
.a {
    font-size: 0.975rem;
    color: green;
}
.d {
    font-size: 0.975rem;
    color: red;
}
.aa {
    font-size: 0.775rem;
    opacity: 70%;
    height: 29px;
    width: 160px;
    color: green;
    border-color: green;
}
.dd {
    font-size: 0.775rem;
    opacity: 65%;
    height: 29px;
    width: 160px;
    color:  white;
    color: red;
    border-color: red;
}

</style>