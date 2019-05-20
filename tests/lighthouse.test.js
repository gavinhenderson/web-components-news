const { getLighthouseAudit } = require('./helpers');
const puppeteer = require('puppeteer');

let page;
let browser;
let lhr;

beforeAll(async () => {
  jest.setTimeout(100000);
  browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();
  const url = 'http://localhost:8080';
  lhr = await getLighthouseAudit(browser, url);
});

afterAll(() => {
  browser.close();
});

describe('Testing lighthouse scores are acceptable', () => {
  test('Check that a report was successfully received', () => {
    expect(lhr.lhr.audits['speed-index']).not.toBeNull();
  });
});
