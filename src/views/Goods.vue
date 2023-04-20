<template>
    <div class="goods">
        <div class="goods__inner">
            <h2 class="mt-5 ml-5">Товары</h2>
            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
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
                    v-for="(good, index) in goodsList"
                    :key="good.id"
                    @click = "goToGood(good.id)"
                    class = "goods-list"
                    >
                        <td>{{ index + 1 }}</td>
                        
                        <td>{{ good.title }}</td>
                        <td>{{ good.vendor_code }}</td>
                        <td>{{ good.tax }}</td>
                        <td>{{ good.bar_code }}</td>
                        <td>{{ good.good_quantity }}</td>
                        <td>{{ good.weight }}</td>
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
        goodsList: []
    }),
    methods:{
        getGoodsList(){
            axios.get(`${BASE_URL}/api/goods`,
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
               window.localStorage.removeItem('goodsList')
               window.localStorage.setItem('goodsList', response.data)
               console.log(response.data[0])
                this.goodsList = response.data
            })
        },
        goToGood(id){
            this.$router.push('/goods/'+ id)
        }
    },
    mounted(){
        this.getGoodsList()
    }
}
</script>
<style lang="sass" scoped>
.goods-list
    cursor: pointer
</style>