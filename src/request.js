import axios from 'axios'
import constant from './constant'

export default ({
    methods: {
        //https://bank.gov.ua/ua/open-data/api-dev
        getRate: function (cd, dt) {
            let url = constant.methods.getUrl(cd, dt)
            return new Promise((resolve) => {
                axios.get(url)
                    .then(response => resolve(response.data[0]))
                    .catch(error => resolve(error.response.data));
            });
        },
    }
});