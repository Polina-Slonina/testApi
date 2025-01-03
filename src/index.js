import './index.css'
//api 
let token = null;

const config = {
  baseUrl: 'https://hackaton.bankingapi.ru/api/smb/efcp/e-commerce/api/v1/',
  headers: {
    'X-IBM-Client-Id': 'ext.tstmst1105.3e5d6408-31ed-434d-9133-0275ee07fefe@ext.vtb.ru',
    'Merchant-Authorization': 'IM5mKhvUVuUrkIBqJ3JJAMt1cDCNTGcn',
    // authorization: '',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  /* отклоняем промис, если сервер вернул ошибку */
      return Promise.reject(`Ошибка: ${res.status}`);
}

const accessToken = { 
  grant_type: 'client_credentials',
  client_id: 'ext.tstmst1105.3e5d6408-31ed-434d-9133-0275ee07fefe@ext.vtb.ru',
  client_secret: 'IM5mKhvUVuUrkIBqJ3JJAMt1cDCNTGcn'
  // client_id: 'ext.cmm.3e9d5564-dae7-4b66-b740-63ed7782e155',
  // client_secret: 'Pq(29!KoOjeAb6hs',
}

//запросы
const orderAPI = () => {
  return fetch(`${config.baseUrl}orders`, {
    method: 'POST',
    headers: {
      'X-IBM-Client-Id': 'ext.tstmst1105.3e5d6408-31ed-434d-9133-0275ee07fefe@ext.vtb.ru',
    'Merchant-Authorization': 'IM5mKhvUVuUrkIBqJ3JJAMt1cDCNTGcn',
    authorization: '',
    'Content-Type': 'application/json'
    },
    body: { "orderId": "ORDER10000000001",
      "orderName": "Заказ №10000000101",
      "expire": "2022-12-31T01:09:44Z",
      "amount": { 
      "value": 10.56, 
      "code": "RUB" 
      }
     }
  })
  .then(handleResponse)
}

orderAPI()


const accessTokenAPI = () => {
  return fetch(`https://auth.bankingapi.ru/auth/realms/kubernetes/protocol/openid-connect/token`, {
  method: 'POST',
  headers: {
    credentials: 'include',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: `grant_type=client_credentials
     client_id=ext.cmm.3e9d5564-dae7-4b66-b740-63ed7782e155
     client_secret=Pq(29!KoOjeAb6hs`
  })
.then(handleResponse)
}

accessTokenAPI()

// { "orderId": "ORDER10000000001",
//   "orderName": "Заказ №10000000101",
//   "expire": "2022-12-31T01:09:44Z",
//   "amount": { 
//   "value": 10.56,  
//   "code": "RUB" 
//   }
//  }