<template>
    <div class="view-invoice">
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
                <button>Сохранить</button>
            </div>
            
            <div class = "wrapper">
                <form>
                    <div class = "input-item">
                        <h2 class = "input-title">Наименование</h2>
                        <input v-bind:placeholder = goodsItem.title>
                    </div>
                    <div class = "input-item">
                        <h2 class = "input-title">Артикул</h2>
                        <input v-bind:placeholder = goodsItem.vendor_code>
                    </div>
                    <div class = "input-item">
                        <h2 class = "input-title">Стоимость</h2>
                        <input v-bind:placeholder = goodsItem.tax>
                    </div>
                    <div class = "input-item">
                        <h2 class = "input-title">Штрихкод</h2>
                        <input v-bind:placeholder = goodsItem.bar_code>
                    </div>
                    <div class = "input-item">
                        <h2 class = "input-title">Кол-во</h2>
                        <input v-bind:placeholder = goodsItem.good_quantity>
                    </div>
                    <div class = "input-item">
                        <h2 class = "input-title">Вес</h2>
                        <input v-bind:placeholder = goodsItem.box_full_weight>
                    </div>
                    <div class = "input-item">
                        <h2 class = "input-title">Высота, м</h2>
                        <input v-bind:placeholder = goodsItem.height_m>
                    </div>
                    <div class = "input-item">
                        <h2 class = "input-title">Ширина, м</h2>
                        <input v-bind:placeholder = goodsItem.width_m>
                    </div>
                    <div class = "input-item">
                        <h2 class = "input-title">Длина, м</h2>
                        <input v-bind:placeholder = goodsItem.length_m>
                    </div>
                    <div class = "input-item">
                        <h2 class = "input-title">Объем, м3</h2>
                        <input v-bind:placeholder = goodsItem.capacity_m3>
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
        goodsItem: {}
    }),
    methods:{
        getGoodsItem(){
            axios.get(`${BASE_URL}/api/goods/` + this.$route.params.id,
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
               
                this.goodsItem = response.data
            })
        }
    },
    mounted(){
        this.getGoodsItem()
    }
}
</script>

<style lang="sass" scoped>
.cont
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-between
    h1
        margin-left: 12vw
        margin-bottom: 2vh
    button
        margin-right: 18vw
        color: white
        height: 4vh
        width: 8vw
        background-color: #439400
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
