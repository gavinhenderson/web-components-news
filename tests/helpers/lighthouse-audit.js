const lighthouse = require('lighthouse');
const staticServer = require('./static-server');

async function getLighthouseAudit(browser, url) {
  const server = await staticServer.start();

  let lhr = await lighthouse(url, {
    port: new URL(browser.wsEndpoint()).port,
    output: 'json',
  });

  server.stop();

  return lhr;
}

module.exports = { getLighthouseAudit };
