<template>
    <div class="view-invoice">
        <div class="view-invoice__inner">
            <v-container>
                <router-link to="/invoices">
                    <v-btn
                        class="mt-3 mb-5"     
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
                <v-row>
                    <v-col cols="4">
                        <v-card
                        elevation="7"
                        shaped
                        >
                            <v-col class="mt-3 ml-3" style="display:flex; justify-content: space-between;">
                                <div class="">
                                    <h3>Накладная № {{invoiceNumber}}</h3>
                                    <p>Дата накладной: {{invoiceDate}}</p>
                                </div>
                                <div class="mr-3">
                                    <h3 v-if="role == 'Admin_ff'">Организация: {{organization}}</h3>
                                </div>
                            </v-col>
                        </v-card>
                    </v-col>
                    <v-col cols="8" v-if="role == 'Client'">
                        <form @submit.prevent="sendFile()" action="">
                            <v-row class="mt-5">
                                <v-col >
                                    <v-file-input
                                        
                                        id="file"
                                        ref="file"
                                        v-on:change="handleFileUpload"
                                        accept=".xlsx"
                                        label="Загрузить Excel"
                                    ></v-file-input>
                                </v-col>

                                
                                <v-col >
                                    
                                    <v-btn
                                    dark
                                    type="submit"
                                    color="green"
                                    >
                                    <v-icon
                                    dark
                                    
                                    >
                                    mdi-checkbox-marked-circle
                                    </v-icon>
                                        Загрузить
                                    </v-btn>
                                    <p class="invalid-feedback" v-if="error">{{error}}</p>
                                </v-col>
                                
                                
                                <v-col></v-col>
                            </v-row>
                        </form>
                    </v-col>
                </v-row>
            </v-container>
            <v-btn class="mt-4 mb-3 mr-10">Общий объем: {{ getSum() }} м3</v-btn>
            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                        <!-- <th class="text-left">
                            Накладная
                        </th> -->
                        <th class="text-left">
                            №
                        </th>
                        <th class="text-left">
                            Наименование
                        </th>
                        <th class="text-left">
                            Артикул
                        </th>
                        <th class="text-left">
                            Стоимость
                        </th>
                        <th class="text-left">
                            Штрих-код
                        </th>
                        <th class="text-left">
                            Кол-во
                        </th>
                        <th class="text-left">
                            Вес 
                        </th>
                        <th class="text-left">
                            Высота, м
                        </th>
                        <th class="text-left">
                            Ширина, м
                        </th>
                        <th class="text-left">
                            Длина, м
                        </th>
                        <th class="text-left">
                            Объем, м3
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="(good, index) in goodList"
                    :key="good.id"
                    >
                        <!-- <td>{{ good.invoice_detail[0] }}</td> -->
                        <td>{{ index + 1 }}</td>
                        
                        <td>{{ good.title }}</td>
                        <td>{{ good.vendor_code }}</td>
                        <td>{{ good.tax }}</td>
                        <td>{{ good.bar_code }}</td>
                        <td>{{ good.good_quantity }}</td>
                        <td>{{ good.weight}}</td>
                        <td>{{ good.height_m }}</td>
                        <td>{{ good.width_m }}</td>
                        <td>{{ good.length_m }}</td>
                        <td>{{ good.capacity_m3 }}</td>
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
        file: '',
        invoiceNumber: '',
        invoiceDate: '',
        goodList: [],
        role: '',
        organization: '',
        error: ''
    }),
    methods:{
        
        sendFile(){
            let formData = new FormData();
            formData.append('file', this.file);
            formData.append('invoice', localStorage.getItem('invoiceId'))
            
            axios.post(`${BASE_URL}/goods/download/`,
            
                formData,
            
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken'),
                    // 'X-CSRF-TOKEN': csrfToken,
                    'Content-Type': 'multipart/form-data'
                }
            }) .then((response) => {
               
                alert('Успешно')
                this.getInvoiceGoods()
                this.$refs.file.reset()

                // responresponse.data.status == "201"
                // this.response = "Успешно"

            }) .catch((error) => {
                if(error.response.data.error == 'No file uploaded or file data does not correspond required format to upload goods'){
                    this.error = 'Файл не прикреплен или формат не соответствует требованиям'
                }

                if(error.response.data.error == 'Data is not valid'){
                    this.error = 'Данные файла содержат ошибки'
                }
            })
            
        },
        handleFileUpload: function(file){
            this.file = file;
            this.error = ''
        },
         async getInvoiceGoods(){
           await axios.get(`${BASE_URL}/organization/invoice/` + localStorage.getItem('invoiceId'),
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                
                this.invoiceDate = response.data.date,
                this.invoiceNumber = response.data.number,
                this.goodList = response.data.goods,
                this.organization = response.data.organization.name
            })
        },
        getUserRole(){
            this.role = localStorage.getItem('user_role')
        }, 
         getSum(){
         console.log("goodlist",this.goodList)
         const sum = this.goodList.reduce((a,b)=> + a + + b.capacity_m3, 0);

         return sum;
        }
    },
     async mounted(){
        this.getUserRole(),
         await this.getInvoiceGoods()
    }
}

</script>

<style lang="scss" scoped>
.invalid-feedback{
    color: rgb(252, 20, 20);
}
.mt-4 {

position: relative;
left:85%;
size: 20ch;
height: 3px;
font-size:10px ;
color:rgb(78, 78, 78);
align-content: end;

}
</style>