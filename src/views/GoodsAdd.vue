<template>
    <div class="view-invoice">
        <div class="popup-wrapper" id="popup">
            <div class="popup-contaitner">
                <div class="sucess-popup" v-if="this.responseChange.status == 200">
                    <h2>Данные успешно сохранены</h2>
                    <button @click="closePopup">Ok</button>
                </div>
                <div class="fail-popup" v-if="this.responseChange.status != 200 && this.responseChange.status != 100">
                    <h2>Данные не сохранились</h2>
                    <button @click="closePopup">Ok</button>
                </div>
                <div class="fail-popup" v-if="this.responseChange.status == 100">
                    <h2>Данные сохраняются</h2>
                </div>
            </div>
        </div>
        <div class="view-invoice__inner">
            <v-container>
                <router-link to="/goods">
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
                
            </v-container>
            <div class="cont">
                <h1>Изменение товара</h1>
                <div class="buttons">
                    <button class="save" @click="changeGoods">Сохранить</button>
                    <button class="delete" @click="deleteGood">Удалить</button>
                </div>
            </div>
            
            <div class = "wrapper">
                <form>
                    <div class = "input-item">
                        <v-text-field 
                            v-model="goodsItem.title" 
                            class="input" 
                            label= "Наименование" 
                            placeholder="Название"
                            :error-messages="numberErrors"
                        />
                    </div>
                    <div class = "input-item">
                        
                        <v-text-field 
                            v-model="goodsItem.vendor_code" 
                            class="input" 
                            label= "Баркод" 
                            placeholder="1234567890123"
                            :error-messages="numberErrors"
                        />
                    </div>
                    <div class = "input-item">
                        <v-text-field 
                            v-model="goodsItem.tax" 
                            class="input" 
                            label= "Стоимость" 
                            placeholder="24023"
                            :error-messages="numberErrors"
                        />
                    </div>
                    <div class = "input-item">
                        <v-text-field 
                            v-model="goodsItem.bar_code" 
                            class="input" 
                            label= "Штрихкод"
                            placeholder="1234567890123"
                            :error-messages="numberErrors"
                            :rules="bar_code_rule"
                        />
                    </div>
                    <div class = "input-item">
                        <v-text-field 
                            v-model="goodsItem.good_quantity" 
                            class="input" 
                            label= "Кол-во" 
                            placeholder="1"
                            :error-messages="numberErrors"
                            @change="triggerCapacity"
                        />
                    </div>
                    <div class = "input-item">
                        <v-text-field 
                            v-model="goodsItem.weight" 
                            class="input" 
                            label= "Вес" 
                            placeholder="1"
                            :error-messages="numberErrors"
                            
                        />
                    </div>
                    <div class = "input-item">
                        <v-text-field 
                            v-model="goodsItem.height_m" 
                            class="input" 
                            label= "Высота, см" 
                            placeholder="1"
                            :error-messages="numberErrors"
                            @change="triggerCapacity"
                        />
                    </div>
                    <div class = "input-item">
                        <v-text-field 
                            v-model="goodsItem.width_m" 
                            class="input" 
                            label= "Ширина, см" 
                            placeholder="1"
                            :error-messages="numberErrors"
                            @change="triggerCapacity"
                        />
                    </div>
                    <div class = "input-item">
                        <v-text-field 
                            v-model="goodsItem.length_m" 
                            class="input" 
                            label= "Длина, см" 
                            placeholder="1"
                            :error-messages="numberErrors"
                            @change="triggerCapacity"
                        />
                    </div>
                    <div class = "input-item">
                        <v-text-field 
                            v-model="capacity_m3" 
                            disabled
                            class="input" 
                            label= "Объем, м3" 
                            placeholder="1"
                            :error-messages="numberErrors"
                            @change="triggerCapacity"
                        />
                    </div>
                </form>
            </div>
        </div>

	</div>

</template>

<script>
import axios from 'axios'
import { BASE_URL } from '../helpers/const'
export default {
    data: () => ({
        goodsItem: {},
        capacity_m3: 0,
        responseChange : {status: 100, message : null},
        bar_code_rule : []
    }),
    methods:{
        triggerCapacity(){
            this.capacity_m3 = ((this.goodsItem.height_m * this.goodsItem.width_m * this.goodsItem.length_m) / 1000000) * this.goodsItem.good_quantity
            
            this.capacity_m3 = this.capacity_m3.toFixed(3)
            console.log(this.capacity_m3)
        },
        deleteGood(){
            axios.delete(`${BASE_URL}/goods/` + this.$route.params.id ,
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
               
                this.$router.push("/goods")
            })
        },
        closePopup(){
            document.getElementById('popup').style.display = "none"
            this.$router.push("/goods")
        },
        getGoodsItem(){
            axios.get(`${BASE_URL}/goods/` + this.$route.params.id ,
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
               response.data.height_m = Math.trunc(response.data.height_m)
               response.data.width_m= Math.trunc(response.data.width_m)
               response.data.length_m= Math.trunc(response.data.length_m)
                this.goodsItem = response.data
                this.capacity_m3 = ((this.goodsItem.height_m * this.goodsItem.width_m * this.goodsItem.length_m) / 1000000) * this.goodsItem.good_quantity
            })
        },
        changeGoods(){
            if(this.goodsItem.bar_code != "" && this.goodsItem.bar_code?.length < 13){
                alert("У штрихкода должно быть минимум 13 символов!")
            }else if(this.goodsItem.bar_code != "" && this.goodsItem.bar_code?.length >14){
                alert("У штрихкода должно быть максимум 14 символов!")
            }
            else{
                axios.put(`${BASE_URL}/goods/` + this.$route.params.id + "/",{
                    "title": this.goodsItem.title,
                    "vendor_code": this.goodsItem.vendor_code,
                    "tax": this.goodsItem.tax,
                    "bar_code": this.goodsItem.bar_code,
                    "good_quantity": this.goodsItem.good_quantity,
                    "weight": this.goodsItem.weight,
                    "height_m": this.goodsItem.height_m,
                    "width_m": this.goodsItem.width_m,
                    "length_m": this.goodsItem.length_m,
                    "capacity_m3": this.capacity_m3,
                    "seller" : this.goodsItem.seller
                },
                {
                    headers:{
                        Authorization: 'Token ' + localStorage.getItem('usertoken')
                    },
                }).then((response) => {
                this.responseChange = response
                }).catch((error) => {
                    this.responseChange = error.response.status;
                }); 
                document.getElementById('popup').style.display = "flex"
            }
        }
    },
    mounted(){
        this.getGoodsItem()
    }
}
</script>

<style lang="sass" scoped>
.popup-wrapper
    position: absolute
    width: 100vw
    height: 100vh
    background-color: rgba(0,0 ,0 ,0.6 )
    display: none
    z-index: 100
    align-items: center
    justify-content: center
    .popup-contaitner
        height: 15%
        width: 35%
        border-radius: 20px
        background-color: white
        margin-bottom: 14vh
        .sucess-popup
            display: flex
            flex-direction: column
            align-items: center
            justify-content: center
            width: 100%
            height: 100%
            button
                font-size: 1.2rem
                font-weight: 700
                margin-top: 1%
                color: white
                width: 75px
                height: 45px
                border-radius: 10px
                background-color: green
        .fail-popup
            display: flex
            flex-direction: column
            align-items: center
            justify-content: center
            width: 100%
            height: 100%
            button
                font-size: 1.2rem
                font-weight: 700
                margin-top: 1%
                color: white
                width: 75px
                height: 45px
                border-radius: 10px
                background-color: red
.cont
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-between
    h1
        margin-left: 12vw
        margin-bottom: 2vh
    .save
        margin-right: 2vw
        color: white
        height: 6vh
        width: 10vw
        font-size: 1.2rem
        border-radius: 10px
        background-color: #439400
    .delete
        margin-right: 18vw
        color: white
        height: 6vh
        width: 10vw
        font-size: 1.2rem
        border-radius: 10px
        background-color: red
.wrapper
    width: 100vw
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    form
        width: 80vw
        display: grid
        grid-template-columns: 1fr 1fr 1fr 1fr
        .input-title
            font-size: 1.4rem
            margin-top: 3vh
        input
            border-radius: 10px
            padding: 10px
            border: 1px solid gray
            font-size: 1.2rem
</style>
