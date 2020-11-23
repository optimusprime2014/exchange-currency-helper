<template>
    <div>
        <h3><strong>{{name}}</strong></h3>
        <h6>{{description}}</h6>
        <h6>{{description}}</h6>

        <table class="table table-sm table-striped">
            <thead>
            <tr>
                <th scope="col">
                    <a href="#" class="badge badge-secondary" @click="addItem">New</a>
                </th>
                <th scope="col">Income date</th>
                <th scope="col">Currency</th>
                <th scope="col">Value</th>
                <th scope="col">Rate</th>
                <th scope="col">Exchanged to UAH</th>
            </tr>
            </thead>
            <tbody id="items">
            <tr class="table-success">
                <th scope="row">Total</th>
                <td>--period-from-to--</td>
                <td>--currency--</td>
                <td>--quantity--</td>
                <td>--rate--</td>
                <td>{{this.total.value}}</td>
            </tr>
            <tr v-for="(item, index) in items" :key="item.index">
                <th scope="row">
                    <a href="#" class="badge badge-danger" @click="removeItem(index)">
                        {{index}}
                    </a>
                </th>
                <td>
                    <input type="date" id="incomeDate" name="incomeDate" v-model="item.incomeDate">
                </td>
                <td>
                    <select id="currencies" name="currencies" v-model="item.currency">
                        <option v-for="currency in currencies" :key="currency">
                            {{currency}}
                        </option>
                    </select>
                </td>
                <td>
                    <input type="number" id="quantity" name="quantity"
                           min="0" max="100100500" step="any"
                           v-model="item.quantity"
                           @blur="convertCurrency(item)">
                </td>
                <td>
                    <p>{{item.rate}}</p>
                </td>
                <td>
                    <p>{{item.value}}</p>
                </td>
            </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
    import request from '../request'
    import constant from '../constant'

    export default {
        name: 'Main',
        data() {
            return {
                name: constant.data().APP_NAME.name,
                description: constant.data().APP_NAME.description,
                currencies: constant.data().CUR,
                items: [],
                total: {
                    value: 0.0
                }
            }
        },
        methods: {
            convertCurrency(item) {
                if (item.incomeDate.length === 0) {
                    alert('Income date cant be empty')
                    return
                }
                if (item.quantity === 0) {
                    alert('Value cant be 0.0')
                    return
                }
                if (item.quantity < 0) {
                    alert('Value cant be less than 0.0')
                    return
                }

                request.methods.getRate(item.currency, item.incomeDate)
                    .then(response => {
                        item.rate = response.rate
                        item.value = constant.methods.round(item.quantity * item.rate, 2)

                        this.recalculateTotal()
                    })
                    .catch(error => console.log(error))
            },
            addItem() {
                let item = this.getDefaultItem()
                if (this.items.length !== 0) item.index = this.items.length - 1
                this.items.push(item)
            },
            removeItem(index) {
                if (this.items.length === 0) return
                if (index === 0 && this.items.length === 1) {
                    this.items = []
                    this.total.value = 0.0
                    return
                }
                this.items.splice(index, 1)
                this.recalculateTotal()
            },
            getDefaultItem() {
                return {
                    index: 0,
                    incomeDate: '',
                    currency: constant.data().CUR[0],
                    quantity: 0.0,
                    rate: 0.0,
                    value: 0.0,
                }
            },
            recalculateTotal() {
                this.total.value = constant.methods.round(
                    Object.values(this.items).reduce((t, {value}) => t + value, 0.0),
                    2
                )
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    h3 {
        margin: 40px 0 0;
    }
</style>
