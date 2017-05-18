const Promise = require('bluebird');
const tesseract = require('node-tesseract');
const fs = Promise.promisifyAll(require('fs'));
const gm = require('gm');
const cloudscraper = require('cloudscraper');
const cheerio = require('cheerio');
const rp = require('request-promise');

(async () => {
  const processImage = async (filename, newFilename) => {
    const image = gm(filename);
    image.write = Promise.promisify(image.write);
    await image.channel('red')
      .blur(1, 1)
      .whiteThreshold(44000, 44000, 44000)
      .blackThreshold(35000, 35000, 35000)
      .blur(1, 1)
      .blackThreshold(44000, 44000, 44000)
      .write(newFilename);
  };

  const j = rp.jar();
  const cookie = rp.cookie('__cfduid=d5ac537894580402670ef90a7c621aaa01482013664; expires=Mon, 18-Dec-17 15:19:44 GMT; path=/; domain=.hashkiller.co.uk; HttpOnly');
  const cookie2 = rp.cookie('ASP.NET_SessionId=xupv5r3kfmsawpg0qik1cgpt; path=/; HttpOnly');
  const url = 'https://hashkiller.co.uk';
  j.setCookie(cookie, url);
  j.setCookie(cookie2, url);
  const request = rp.defaults({ jar: j });

  cloudscraper.request = request;

  cloudscraper.get = Promise.promisify(cloudscraper.get);
  tesseract.process = Promise.promisify(tesseract.process);

  const $ = await cloudscraper.get('https://www.hashkiller.co.uk/sha1-decrypter.aspx')
    .then(result => result.toJSON())
    .then(json => cheerio.load(json.body));

  const viewstate = $('#__VIEWSTATE').attr('value');
  const eventvalidation = $('#__EVENTVALIDATION').attr('value');
  const captcha = $('#content1_imgCaptcha').attr('src');

  await request({ url: `https://www.hashkiller.co.uk${captcha}`, encoding: null })
    .then(requestUrl => fs.writeFileAsync('originalCaptcha.jpg', requestUrl));

  processImage('originalCaptcha.jpg', 'processedCaptcha.jpg');

  const solved = await tesseract.process('processedCaptcha.jpg')
    .then(processedCaptcha => processedCaptcha.slice(0, -2));

  const hash = 'b0997c8914f95067fa410a85cd3ab71e8a3ec2ee';
  const postData = {
    ctl00$ScriptMan1: 'ctl00$content1$updDecrypt|ctl00$content1$btnSubmit',
    __EVENTTARGET: '',
    __EVENTARGUMENT: '',
    __VIEWSTATE: viewstate,
    __EVENTVALIDATION: eventvalidation,
    ctl00$content1$txtInput: hash,
    ctl00$content1$txtCaptcha: solved,
    __ASYNCPOST: 'true',
    ctl00$content1$btnSubmit: 'Submit',
  };

  const options = {
    method: 'POST',
    url: 'https://hashkiller.co.uk/sha1-decrypter.aspx',
    encoding: null,
    headers: {
      'postman-token': 'bfe31a7c-6b4e-47d1-644c-b59c65211294',
      'accept-language': 'en-US,en;q=0.8',
      'accept-encoding': 'gzip, deflate, br',
      referer: 'https://hashkiller.co.uk/sha1-decrypter.aspx',
      accept: '*/*',
      'content-type': 'application/x-www-form-urlencoded',
      'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
      'x-microsoftajax': 'Delta=true',
      'x-requested-with': 'XMLHttpRequest',
      origin: 'https://hashkiller.co.uk',
      'cache-control': 'no-cache',
    },
    form: postData,
  };

  const answer = await request(options)
    .then(result => result.toJSON())
    .then(json => cheerio.load(json.data));

  const password = answer('#content1_lblStatus').text();
  const test = null;
})();
