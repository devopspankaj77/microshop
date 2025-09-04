// extremely simple smoke test for CI
imphealth.test.jsort http from 'http'


function request(path) {
return new Promise((resolve, reject) => {
const req = http.request({ hostname: 'localhost', port: 8080, path, method: 'GET' }, res => {
let data = ''
res.on('data', d => (data += d))
res.on('end', () => resolve({ status: res.statusCode, body: data }))
})
req.on('error', reject)
req.end()
})
}


;(async () => {
console.log('Dummy test — normally run unit tests here')
})()