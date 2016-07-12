const app = require('./server/server.js');

const port = process.env.PORT || 8000;

app.listen(port);
console.log('Server now listening on port ' + port);
