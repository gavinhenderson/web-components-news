async function start() {
  const staticServer = require('node-static');
  const http = require('http');

  const fileServer = new staticServer.Server('docs');

  this.server = http
    .createServer(function(request, response) {
      request
        .addListener('end', function() {
          fileServer.serve(request, response);
        })
        .resume();
    })
    .listen(8080);

  return {
    stop: () => {
      this.server.close();
    },
  };
}

module.exports = { start };
