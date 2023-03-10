const http = require("http")
const fs = require("fs")
const port = 4000;
function getFile(path, contextType, res) {
   fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
         res.writeHead(404, { 'Content-Type': 'text/html' })
         res.end('<h1>some error occured while getting the requested file</h1>')
      }
      else {
         res.writeHead(200, { 'Content-Type': contextType })
         res.end(data)
      }
   })
}

const server = http.createServer((req, res) => {
   console.log("requested route is : ", req.url);

   if (req.url == '/') {
      getFile('./index.html', 'text/html', res);
   }
   else if (req.url == '/index.css') {
      getFile('./index.css', 'text/css', res);
   }
   else if (req.url == '/index.js') {
      getFile('./index.js', 'applicaiton/js', res);
   }
   else if (req.url == '/todo.js') {
      getFile('./todo.js', 'applicaiton/js', res);
   }
   else if (req.url == '/favourite.js') {
      getFile('./favourite.js', 'applicaiton/js', res);
   }

   else {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end(`The requested route ${req.url} is not handled yet`)
   }
})

server.listen(port, () => {
   console.log(`server live at port : ${port}`);
})
