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

  test('Color contrast must always be perfect', () => {
    expect(lhr.lhr.audits['color-contrast'].score).toBe(1);
  });

  test('Fast first paint', () => {
    expect(lhr.lhr.audits['first-contentful-paint'].score).toBeGreaterThan(0.9);
  });

  test('Text must always be legible', () => {
    expect(lhr.lhr.audits['font-size'].score).toBe(1);
  });

  test('Page weight must less than 3mb', () => {
    expect(lhr.lhr.audits['total-byte-weight'].score).toBeLessThan(3000000);
  });
});
