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
                            Накладная
                        </th>
                        <th class="text-left">
                            Наименование
                        </th>
                        <th class="text-left">
                            Артикул
                        </th>
                        <th class="text-left">
                            шт.
                        </th>
                        <th class="text-left">
                            Коробок
                        </th>
                        <th class="text-left">
                            Вложимость штук в коробку
                        </th>
                        <th class="text-left">
                            Общий вес коробки
                        </th>
                        <th class="text-left">
                            Вес 1 шт. 
                        </th>
                        <th class="text-left">
                            Штрих-код
                        </th>
                        <th class="text-left">
                            Цена НДС
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
                    >
                        <td>{{ index + 1 }}</td>
                        <td>{{ good.invoice_detail[0] }}</td>
                        
                        <td>{{ good.title }}</td>
                        <td>{{ good.vendor_code }}</td>
                        <td>{{ good.good_quantity }}</td>
                        <td>{{ good.box_quantity }}</td>
                        <td>{{ good.good_quantity_in_box }}</td>
                        <td>{{ good.box_full_weight }}</td>
                        <td>{{ good.good_unit_weight }}</td>
                        <td>{{ good.bar_code }}</td>
                        <td>{{ good.tax }}</td>
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
            axios.get('http://87.255.194.66:1337/api/goods',
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
               
                this.goodsList = response.data
            })
        }
    },
    mounted(){
        this.getGoodsList()
    }
}
</script>