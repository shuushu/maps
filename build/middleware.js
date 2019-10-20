const bodyParser = require('body-parser')
const axios = require('axios')
const MYUID = 108100000001798;

let DOMAIN = 'http://120.50.129.194';
let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'appVersion': '0.7.2',
            'serviceMode': 'DEV',
            'x-skcomms-cmn': MYUID,
            'osType': 'IOS'
        }
    }

function requestToServer(clientReq, clientRes) {
    let { method, query, body } = clientReq
    let config = axiosConfig;

    // x-skcomms-cmn 사용자가 바뀔때
    if (query['x-skcomms-cmn']) {
        config = JSON.parse(JSON.stringify(axiosConfig));
        config.headers['x-skcomms-cmn'] = query['x-skcomms-cmn'];
    }

    if (method === 'PUT' || method === 'POST') {
        config['data'] = body;
    }

    config['url'] = DOMAIN + clientReq.url;
    config['method'] = method;

    //console.log(config)
    axios(config).then((response) => {
        const { headers } = response

        clientRes.set({ ...headers})
        clientRes.status(response.status)
        clientRes.json(response.data)
    }).catch(function (error) {
        clientRes.status(error.response.status)
        clientRes.json(error.response.data)
    })
}

const middleware = (app) => {
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))

	app.post('/*/v1/*', (req, res) => { requestToServer(req, res) })
	app.get('/*/v1/*', (req, res) => { requestToServer(req, res) })
	app.put('/*/v1/*', (req, res) => { requestToServer(req, res) })
	app.delete('/*/v1/*', (req, res) => { requestToServer(req, res) })
}

module.exports = middleware
