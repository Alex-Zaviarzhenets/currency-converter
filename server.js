
const http = require('http')
const server = http.createServer(handler)
const port = 3000
const fs = require('fs')
const kurs = 0.95



function handler(req, res) {
  if (req.url === '/getKurs') {
    res.end(JSON.stringify(kurs))
  } else if (req.url === '/style.css') {
    const style = fs.readFileSync('style.css')
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
