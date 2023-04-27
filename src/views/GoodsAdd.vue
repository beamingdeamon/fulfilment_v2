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
                        <h2 class = "input-title">Наименование</h2>
                        <input type="text" v-model="goodsItem.title" v-bind:placeholder = goodsItem.title>
                    </div>
                    <div class = "input-item">
                        <h2 class = "input-title">Артикул</h2>
                        <input type="number" v-model="goodsItem.vendor_code" v-bind:placeholder = goodsItem.vendor_code>
                    </div>
                    <div class = "input-item">
                        <h2 class = "input-title">Стоимость</h2>
                        <input type="number" v-model="goodsItem.tax" v-bind:placeholder = goodsItem.tax>
                    </div>
                    <div class = "input-item">
                        <h2 class = "input-title">Штрихкод</h2>
                        <input type="text" v-model="goodsItem.bar_code" v-bind:placeholder = goodsItem.bar_code>
                    </div>
                    <div class = "input-item">
                        <h2 class = "input-title">Кол-во</h2>
                        <input type="number" v-model="goodsItem.good_quantity" v-bind:placeholder = goodsItem.good_quantity>
                    </div>
                    <div class = "input-item">
                        <h2 class = "input-title">Вес</h2>
                        <input type="number" v-model="goodsItem.weight" v-bind:placeholder = goodsItem.weight>
                    </div>
                    <div class = "input-item">
                        <h2 class = "input-title">Высота, м</h2>
                        <input type="number" v-model="goodsItem.height_m" v-bind:placeholder = goodsItem.height_m>
                    </div>
                    <div class = "input-item">
                        <h2 class = "input-title">Ширина, м</h2>
                        <input type="number" v-model="goodsItem.width_m" v-bind:placeholder = goodsItem.width_m>
                    </div>
                    <div class = "input-item">
                        <h2 class = "input-title">Длина, м</h2>
                        <input type="number" v-model="goodsItem.length_m" v-bind:placeholder = goodsItem.length_m>
                    </div>
                    <div class = "input-item">
                        <h2 class = "input-title">Объем, м3</h2>
                        <input type="number" v-model="goodsItem.capacity_m3" v-bind:placeholder = goodsItem.capacity_m3>
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
        responseChange : {status: 100, message : null}
    }),
    methods:{
        deleteGood(){
            axios.delete(`${BASE_URL}/api/goods/` + this.$route.params.id ,
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
            axios.get(`${BASE_URL}/api/goods/` + this.$route.params.id ,
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
               
                this.goodsItem = response.data
            })
        },
        changeGoods(){
             axios.put(`${BASE_URL}/api/goods/` + this.$route.params.id + "/",{
                 "title": this.goodsItem.title,
                 "vendor_code": this.goodsItem.vendor_code,
                "tax": this.goodsItem.tax,
                "bar_code": this.goodsItem.bar_code,
                "good_quantity": this.goodsItem.good_quantity,
                "weight": this.goodsItem.weight,
                "height_m": this.goodsItem.height_m,
                "width_m": this.goodsItem.width_m,
                "length_m": this.goodsItem.length_m,
                "capacity_m3": this.goodsItem.capacity_m3,
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
