const codes = [
  // INDEX 1
  {
    id: 1,
    name: 'H5',
    value: [
      {
        id: 1,
        name: 'ApplyFabricToken',
        value: [
          {
            id: 1,
            name: 'Python',
            value: `function applyFabricTokenPython_Apply() {
                        return new Promise((resolve, reject) => {
                            var options = {    
                            body: JSON.stringify({
                                appSecret: config.appSecret,
                            }),
                            resolve(result);
                            });
                        });
                     }`,
          },
          {
            id: 2,
            name: 'JS',
            value: `function applyFabricTokenPJS_apply() {
                        return new Promise((resolve, reject) => {
                            var options = {    
                            body: JSON.stringify({
                                appSecret: config.appSecret,
                            }),
                            resolve(result);
                            });
                        });
                     }`,
          },
        ],
      },
      {
        id: 2,
        name: 'CreateOrder',
        value: [
          {
            id: 1,
            name: 'Python',
            value: `function applyFabricTokenPython_crete() {
                        return new Promise((resolve, reject) => {
                            var options = {    
                            body: JSON.stringify({
                                appSecret: config.appSecret,
                            }),
                            resolve(result);
                            });
                        });
                     }`,
          },
          {
            id: 2,
            name: 'JS',
            value: `function applyFabricTokenPython_create() {
                        return new Promise((resolve, reject) => {
                            var options = {    
                            body: JSON.stringify({
                                appSecret: config.appSecret,
                            }),
                            resolve(result);
                            });
                        });
                     }`,
          },
        ],
      },
    ],
  },

  // INDEX 2

  {
    id: 2,
    name: 'MACLE',
    value: [
      {
        id: 1,
        name: 'ApplyFabricToken',
        value: [
          {
            id: 1,
            name: 'Python',
            value: `function applyFabricTokenPython_macle_python() {
                        return new Promise((resolve, reject) => {
                            var options = {    
                            body: JSON.stringify({
                                appSecret: config.appSecret,
                            }),
                            resolve(result);
                            });
                        });
                     }`,
          },
          {
            id: 2,
            name: 'JS',
            value: `function applyFabricTokenPython_js_macle() {
                        return new Promise((resolve, reject) => {
                            var options = {    
                            body: JSON.stringify({
                                appSecret: config.appSecret,
                            }),
                            resolve(result);
                            });
                        });
                     }`,
          },
        ],
      },
      {
        id: 2,
        name: 'CreateOrder',
        value: [
          {
            id: 1,
            name: 'Python',
            value: `function applyFabricTokenPython_macle_create() {
                        return new Promise((resolve, reject) => {
                            var options = {    
                            body: JSON.stringify({
                                appSecret: config.appSecret,
                            }),
                            resolve(result);
                            });
                        });
                     }`,
          },
          {
            id: 2,
            name: 'JS',
            value: `function applyFabricTokenPython_macle_js() {
                        return new Promise((resolve, reject) => {
                            var options = {    
                            body: JSON.stringify({
                                appSecret: config.appSecret,
                            }),
                            resolve(result);
                            });
                        });
                     }`,
          },
        ],
      },
    ],
  },
];

//   values: `function applyFabricToken() {
//             return new Promise((resolve, reject) => {
//                 var options = {
//                 method: "POST",
//                 url: config.baseUrl + "/payment/v1/token",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "X-APP-Key": config.fabricAppId,
//                 },
//                 rejectUnauthorized: false, //add when working with https sites
//                 requestCert: false, //add when working with https sites
//                 agent: false, //add when working with https sites
//                 body: JSON.stringify({
//                     appSecret: config.appSecret,
//                 }),
//                 };
//                 request(options, function (error, response) {
//                 let result = JSON.parse(response.body);
//                 resolve(result);
//                 });
//             });
//             }`,
//     response: `{
//             "effectiveDate": "1685364354112",
//             "expirationDate": "1685367954112",
//             "token": "Bearer 43b5c0344be4hc7c9f71f03a9dbg4dbe"
//         }`,

export function getCodeSnippets() {
  return codes;
}

export function getCodeSnippet(selectCodeID) {
  return codes.find((m) => m.id === selectCodeID);
}

export function saveCodeSnippets(code) {
  //   let customerInDb = cutomers.find((m) => m._id === customer._id) || {};
  //   customerInDb.fullName = customer.fullName;
  //   customerInDb.category = categoryApi.categories.find(
  //     (g) => g._id === customer.categoryId
  //   );
  //   customerInDb.tel = customer.tel;
  //   customerInDb.city = customer.city;
  //   if (!customerInDb._id) {
  //     customerInDb._id = Date.now();
  //     cutomers.push(customerInDb);
  //   }
  //   return customerInDb;
}

export function deleteCodeSnippets(id) {
  //   let movieInDb = cutomers.find((m) => m._id === id);
  //   cutomers.splice(cutomers.indexOf(movieInDb), 1);
  //   return movieInDb;
}

async function postJSON(url, headers, data) {
  const response = await fetch(url, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      headers,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
}

let cofigData = {
  name: 'ApplyFabricToke',
  url: 'http://localhost:5000/api/moke-api/applyFabricToken',
  headers: {
    'Content-Type': 'application/json',
    "appSecret": '{{appSecret}}',
  },
  data: '',
};

// const data = { username: 'example' };
// postJSON(data);




 {
    id: 1,
    name: 'H5 integration',
    value: [
      {
        id: 1,
        name: 'ApplyFabricToken',
        value: [
          {
            id: 1,
            name: 'Python',
            value: `function applyFabricTokenPython_Apply() {
                        return new Promise((resolve, reject) => {
                            var options = {    
                            body: JSON.stringify({
                                appSecret: config.appSecret,
                            }),
                            resolve(result);
                            });
                        });
                     }`,
            
          
          {
            id: 2,
            name: 'JS',
            value: `function applyFabricTokenPJS_apply() {
                        return new Promise((resolve, reject) => {
                            var options = {    
                            body: JSON.stringify({
                                appSecret: config.appSecret,
                            }),
                            resolve(result);
                            });
                        });
                     }`,
          },
        ],
      },
      {
        id: 2,
        name: 'CreateOrder',
        value: [
          {
            id: 1,
            name: 'Python',
            value: `function applyFabricTokenPython_crete() {
                        return new Promise((resolve, reject) => {
                            var options = {    
                            body: JSON.stringify({
                                appSecret: config.appSecret,
                            }),
                            resolve(result);
                            });
                        });
                     }`,
          },
          {
            id: 2,
            name: 'JS',
            value: `function applyFabricTokenPython_create() {
                        return new Promise((resolve, reject) => {
                            var options = {    
                            body: JSON.stringify({
                                appSecret: config.appSecret,
                            }),
                            resolve(result);
                            });
                        });
                     }`,
          },
        ],
      },
    ],
  },

