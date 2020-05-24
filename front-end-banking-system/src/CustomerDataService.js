import axios from 'axios'


const CUSTOMER_API_URL = 'http://localhost:8080'
const API_URL = `${CUSTOMER_API_URL}/Customers`
class CustomerDataService {

    retrieveAllCustomers() {
        //console.log('executed service')
        return axios.get(`${API_URL}`);
    }

    retrieveCustomer(id) {
        //console.log('executed service')
        return axios.get(`${API_URL}/${id}`);
    }

    deleteCustomer(id) {
        //console.log('executed service')
        return axios.delete(`${API_URL}/${id}`);
    }

    updateCustomer(id, customer) {
        //console.log('executed service')
        return axios.put(`${API_URL}/${id}`, customer);
    }

    createCustomer(customer) {
        console.log(customer)
        return axios.post(`${API_URL}`, customer);
    }

    loginCustomer(credentials){
      console.log('login running')
      return axios.post(`${API_URL}/login`, credentials)
    }
}

export default new CustomerDataService()
