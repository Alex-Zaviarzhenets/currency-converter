
const http = require('http')
const server = http.createServer(handler)
const port = 3000
const fs = require('fs')


let url = 'https://api.exchangeratesapi.io/v1/latest?access_key=18e6635dbf1acfb0ec5194de452ce1c6&base=EUR'
let kurs 

fetch(url).then(response => response.json()).then(({rates}) => {kurs = rates.USD})



function handler(req, res) {
  if (req.url === '/getKurs') {
    res.end(JSON.stringify(kurs))
  } else if (req.url === '/style.css') {
    const style = fs.readFileSync('style.css')
    res.setHeader('Content-Type', 'text/css; charset=utf-8')
    res.end(style)
  } else if (req.url === '/script.js') {
    const script = fs.readFileSync('script.js')
    res.end(script)
  } else {
    if (req.url === '/') {
      const html = fs.readFileSync('index.html')
      res.end(html)
    } else {
      res.end('405')
    }
  }
}


server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
