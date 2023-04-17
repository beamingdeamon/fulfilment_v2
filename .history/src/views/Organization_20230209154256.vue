<template>
    <div class="organization">
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
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>
    </div>
</template>