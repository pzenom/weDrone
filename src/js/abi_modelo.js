console.log("Cargo el ABI del Modelo de negocio");
const ABI_MODELO = [{
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "direccionDron",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "altura_maxima",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "altura_minima",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "LOG_DRON_INFO",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "direccionDron",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "altura_maxima",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "altura_minima",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "coste",
                "type": "uint256"
            }
        ],
        "name": "LOG_DRON_INFO",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "_direccionEmpresa",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "_nombre",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "LOG_NuevaEmpresa",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "_direccionParcela",
            "type": "address"
        }],
        "name": "LOG_PARCELA_FUMIGADA",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "direccionParcela",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "empresaPropietaria",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "altura_maxima",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "altura_minima",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "enum Modelo.PESTICIDAS",
                "name": "pesticida",
                "type": "uint8"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "LOG_PARCELA_INFO",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [{
            "internalType": "address",
            "name": "_direccionEmpresa",
            "type": "address"
        }],
        "name": "existeEmpresa",
        "outputs": [{
            "internalType": "bool",
            "name": "_id",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "internalType": "address",
            "name": "_direccionEmpresa",
            "type": "address"
        }],
        "name": "getEmpresa",
        "outputs": [{
                "internalType": "string",
                "name": "_nombre",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "internalType": "uint256",
            "name": "_id",
            "type": "uint256"
        }],
        "name": "getEmpresaAtIndex",
        "outputs": [{
            "internalType": "address",
            "name": "_direccionEmpresa",
            "type": "address"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getEmpresasCount",
        "outputs": [{
            "internalType": "uint256",
            "name": "total",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "internalType": "address",
                "name": "_direccionEmpresa",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_nombre",
                "type": "string"
            }
        ],
        "name": "insertaEmpresa",
        "outputs": [{
            "internalType": "uint256",
            "name": "_id",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "internalType": "address",
            "name": "addr",
            "type": "address"
        }],
        "name": "isOwner",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
        }],
        "name": "transfer",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "internalType": "address",
            "name": "_direccionDron",
            "type": "address"
        }],
        "name": "existeDron",
        "outputs": [{
            "internalType": "bool",
            "name": "id",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "internalType": "address",
                "name": "_direccionDron",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_altura_maxima",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_altura_minima",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_coste",
                "type": "uint256"
            }
        ],
        "name": "insertaDron",
        "outputs": [{
            "internalType": "uint256",
            "name": "_id",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getDronesCount",
        "outputs": [{
            "internalType": "uint256",
            "name": "total",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "internalType": "address",
            "name": "_direccionDron",
            "type": "address"
        }],
        "name": "getDron",
        "outputs": [{
                "internalType": "enum Modelo.ESTADO",
                "name": "_estado",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "internalType": "address",
                "name": "_direccionDron",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_altura_maxima",
                "type": "uint256"
            }
        ],
        "name": "setMaxHeight",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "internalType": "address",
                "name": "_direccionDron",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_altura_minima",
                "type": "uint256"
            }
        ],
        "name": "setMinHeight",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "internalType": "address",
                "name": "_direccionDron",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_direccionParcela",
                "type": "address"
            },
            {
                "internalType": "enum Modelo.PESTICIDAS",
                "name": "_pesticida",
                "type": "uint8"
            }
        ],
        "name": "buySpray",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
            "internalType": "address",
            "name": "_direccionDron",
            "type": "address"
        }],
        "name": "startSpray",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
            "internalType": "address",
            "name": "_direccionDron",
            "type": "address"
        }],
        "name": "stopSpray",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
            "internalType": "address",
            "name": "_direccionDron",
            "type": "address"
        }],
        "name": "freeSpray",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "internalType": "address",
            "name": "_direccionParcela",
            "type": "address"
        }],
        "name": "existeParcela",
        "outputs": [{
            "internalType": "bool",
            "name": "id",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "internalType": "address",
                "name": "_direccionParcela",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_altura_maxima",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_altura_minima",
                "type": "uint256"
            },
            {
                "internalType": "enum Modelo.PESTICIDAS",
                "name": "_pesticida",
                "type": "uint8"
            }
        ],
        "name": "insertaParcela",
        "outputs": [{
            "internalType": "uint256",
            "name": "_id",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getParcelasCount",
        "outputs": [{
            "internalType": "uint256",
            "name": "total",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "internalType": "address",
            "name": "_direccionParcela",
            "type": "address"
        }],
        "name": "getParcela",
        "outputs": [{
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "enum Modelo.PESTICIDAS",
                "name": "_pesticidaValido",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];


console.log(ABI_MODELO);