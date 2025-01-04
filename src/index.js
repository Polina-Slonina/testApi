//  

const { data } = require("autoprefixer");

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

//todo Dom наполняем содержимым
const formContent = document.forms.content;
const inputZakaz = formContent.elements.zakaz;
const inputTovar = formContent.elements.tovar;
const inputSumma = formContent.elements.summa;
const inputValuta = formContent.elements.valuta;


//запросы
const orderAPI = (token) => {
  try {
    return fetch(`${config.baseUrl}orders`, {
      method: 'POST',
      headers: {
        'X-IBM-Client-Id': 'ext.tstmst1105.3e5d6408-31ed-434d-9133-0275ee07fefe',
        // 'Merchant-Authorization': 'IM5mKhvUVuUrkIBqJ3JJAMt1cDCNTGcn',
        authorization: `Bearer ${token}`,
        
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        'orderName': 'Заказ №10000000101',
        
        'amount': { 
        'value': 10, 
        'code': 'RUB'
        }
       })
    })
    .then(data => data.json())
    .then(data => console.log(data))
  } catch(error) {
    console.error(`Ошибка в Token: ${error}`);
  }
}

// orderAPI()


const accessTokenAPI = () => {
  try {
    return fetch('https://auth.bankingapi.ru/auth/realms/kubernetes/protocol/openid-connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: 'grant_type=client_credentials&client_id=ext.tstmst1105.3e5d6408-31ed-434d-9133-0275ee07fefe@ext.vtb.ru&client_secret=IM5mKhvUVuUrkIBqJ3JJAMt1cDCNTGcn'
    })
    .then(data => data.json())
    // .then(data => {
    //   token = data.access_token;
    //   console.log(token)
    //   orderAPI(data.access_token)
    // })
  } catch(error) {
    console.error(`Ошибка в Token: ${error}`);
  }
}

//todo функция отправки данных формы
const handleForm = (evt) => {
  evt.preventDefault();
  const obj = {
    orderId: 'order1',
    orderName: inputZakaz.value,
    amount: {
      value: inputSumma.value,
      code: inputValuta.value
    }
  }
  accessTokenAPI().then(data => {
    console.log(data.access_token)
    orderAPI(data.access_token)
  })
  
  
  formContent.reset();
}

formContent.addEventListener('submit', handleForm);



// { "orderId": "ORDER10000000001",
//   "orderName": "Заказ №10000000101",
//   "expire": "2022-12-31T01:09:44Z",
//   "amount": { 
//   "value": 10.56,  
//   "code": "RUB" 
//   }
//  }