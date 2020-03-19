var abi = [{
        "constant": true,
        "inputs": [],
        "name": "getMessage",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
            "internalType": "string",
            "name": "newMessage",
            "type": "string"
        }],
        "name": "setMessage",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

var abo;
// console.log(JSON.stringify(abi));
// console.log(abi);

// var fs = require('fs');
// var jsonFile = "../build/contracts/Contrato.json";
// var parsed = JSON.parse(fs.readFileSync(jsonFile));
// var abo = parsed.abi;
// console.log(abo);

async function load() {
    let url = 'https://my-json-server.typicode.com/typicode/demo/db';
    let obj = await (await fetch(url)).json();
    console.log(obj);
}

load();

// $(document).ready(function() {

//     $("button").click(function() {
//         // abo = abi;
//         $.getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20WHERE%20symbol%3D%27WRC%27&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback', function(data) {
//             abo = data; //data is the JSON string
//         });
//         alert(JSON.stringify(abo));
//     });
// });