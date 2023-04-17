<template>
    <div class="main">
        <div class="main__inner">
            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            Организация
                        </th>
                        <th class="text-left">
                            Штрих-код
                        </th>
                        <th class="text-left">
                            Вес
                        </th>
                        <th class="text-left">
                            Высота
                        </th>
                        <th class="text-left">
                            Ширина
                        </th>
                        <th class="text-left">
                            Длина
                        </th>
                        <th class="text-left">
                            Статус
                        </th>
                        <th class="text-left">
                            Адрес отправки
                        </th>
                        <th class="text-left">
                            Отправитель
                        </th>
                        <th class="text-left">
                            Телефон
                        </th>
                        <th class="text-left">
                            Сумма
                        </th>
                        <th class="text-left">
                            Сумма НДС
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="item in desserts"
                    :key="item.name"
                    >
                        <td>{{ item.name }}</td>
                        <td>{{ item.calories }}</td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Jelly bean',
            calories: 375,
          },
          {
            name: 'Lollipop',
            calories: 392,
          },
          {
            name: 'Honeycomb',
            calories: 408,
          },
          {
            name: 'Donut',
            calories: 452,
          },
          {
            name: 'KitKat',
            calories: 518,
          },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
.main {
    
		&__inner {
		}
}

</style>