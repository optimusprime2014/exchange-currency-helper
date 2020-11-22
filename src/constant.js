const app = {
    name: 'Ex-helper',
    description: '',//'exchange-currency-helper',
}
const currencies = ['USD', 'EUR']
const url = {
    basic: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=',
    dt: '&date=',
    end: '&json'
}

export default ({
    data: () => ({
        APP_NAME: app,
        CUR: currencies,
    }),
    methods: {
        getUrl(code, dt) {//https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&date=20200302&json
            return url.basic + code + url.dt + this.prepareDate(dt) + url.end
        },
        prepareDate(dt) {
            return dt.replaceAll('-', '')
        },
        round(value, decimals) {
            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        }
    }
});
