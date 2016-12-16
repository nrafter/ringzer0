var tesseract = require('node-tesseract');
var fs = require('fs');
var gm = require('gm');
var cloudscraper = require('cloudscraper');
Zlib = require('zlibjs');



var testString = 

//Scraping from CloudFlare hosted site
cloudscraper.get("https://www.hashkiller.co.uk/sha1-decrypter.aspx", function(error, response, body) {
  var $ = cheerio.load(body);
  //debugger;
  
  //Grabbing exact captcha params
  var captcha = $('#content1_imgCaptcha').attr("src");
  
  //Saving captcha
  request("https://www.hashkiller.co.uk" + captcha).pipe(fs.createWriteStream('doodle.jpg')).on('close', function() {

    //debugger;
    //Processing captcha
    gm('doodle.jpg').channel("red").blur(1, 1).whiteThreshold(44000, 44000, 44000).stream(function ( err, stdout, stderr ) {
        var writeStream = fs.createWriteStream('processed.jpg');
      
        stdout.pipe(writeStream).on("close", function() {
          
          // Recognize captcha
          tesseract.process('processed.jpg', function ( err, uncaptcha ) {
            if(err) {
              debugger;
              console.error(err);
            }
            else {
              
              var viewstate = "/wEPaA8FDzhkNDI1NDI3ZDdmOTQ4MmTUH7mvNwyyI7ubl2V4AUGoGgdcqt0QCQSnd5/eVJmy1Q==";
              var eventvalidation = "/wEdAAXDhgVNT2FIsKC/q5JAOwUAqH4D6ZgR89DUFBTMOlnEF/gi3F50GIGWR1Nab02LintqB32jq7fFWKhYKPHg/KhxevIaiZTm5H7q+peJqAD0HlhiWRcS/kPGVYwT2SGI6RzDWhW/8I5jXEwhatuzU79X";
              
              var postBody = "ctl00$ScriptMan1=ctl00$content1$updDecrypt|ctl00$content1$btnSubmit&__EVENTTARGET=&__EVENTARGUMENT=&ctl00$content1$txtInput=" + hash + "&ctl00$content1$txtCaptcha=" + "AAAAAA" + "&__VIEWSTATE=" + viewstate + "&__EVENTVALIDATION=" + eventvalidation + "&__ASYNCPOST=true&ctl00$content1$btnSubmit=Submit";
              
              var hash = "b0997c8914f95067fa410a85cd3ab71e8a3ec2ee";
              
              var headers = { Cookie: "__cfduid=d6105bbc3a9ac25357c1d443398fc89921481398099; ASP.NET_SessionId=fqtj4hjes3br0s2t5xscgk1a",
                Host: "www.hashkiller.co.uk",
                Connection: "keep-alive",
                Pragma: "no-cache",
                "Cache-Control": "no-cache",
                Origin: "https://www.hashkiller.co.uk",
                "User-Agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Requested-With": "XMLHttpRequest",
                "X-MicrosoftAjax": "Delta=true",
                Accept: "*/*",
                Referer: "https://www.hashkiller.co.uk/sha1-decrypter.aspx",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-US,en;q=0.8" };
              
              var options = { url:'https://www.hashkiller.co.uk/sha1-decrypter.aspx',
                headers: headers,
                form: postBody };
              
              //debugger;

              //cloudscraper.post('https://www.hashkiller.co.uk/sha1-decrypter.aspx', postBody, function(error, response, body) {
              //  var $ = cheerio.load(body);
              //  debugger;
              //});
              
              request.post(options, function(error, response, body) { var $ = cheerio.load(body); }).on("data", function(data) {
                debugger;
                var gunzip = new Zlib.Gunzip(data);
                debugger;
              });
              
              /*
               ctl00$ScriptMan1=ctl00$content1$updDecrypt|ctl00$content1$btnSubmit&ctl00$content1$txtInput=b0997c8914f95067fa410a85cd3ab71e8a3ec2ee&ctl00$content1$txtCaptcha=ZFNC6L&__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=/wEPaA8FDzhkNDI1NDI3ZDdmOTQ4MmTUH7mvNwyyI7ubl2V4AUGoGgdcqt0QCQSnd5/eVJmy1Q==&__EVENTVALIDATION=/wEdAAXDhgVNT2FIsKC/q5JAOwUAqH4D6ZgR89DUFBTMOlnEF/gi3F50GIGWR1Nab02LintqB32jq7fFWKhYKPHg/KhxevIaiZTm5H7q+peJqAD0HlhiWRcS/kPGVYwT2SGI6RzDWhW/8I5jXEwhatuzU79X&__ASYNCPOST=true&ctl00$content1$btnSubmit=Submit
               */
              
              /*
               ctl00$ScriptMan1=ctl00$content1$updDecrypt|ctl00$content1$btnSubmit&__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=/wEPaA8FDzhkNDI1NDNjNDdiYjFjOGTI1g0PbUC+Zu7FAoZ+Bp5RK0GtslV/klmpSf+pd5DJdg==&__EVENTVALIDATION=/wEdAAUF/rSSLlQngGTDFXPazoIgqH4D6ZgR89DUFBTMOlnEF/gi3F50GIGWR1Nab02LintqB32jq7fFWKhYKPHg/KhxevIaiZTm5H7q+peJqAD0HmLAHSWrJ4T4pOXv8+g/c5ys3rCAQbovzI3KSgrXmKek&ctl00$content1$txtInput=b0997c8914f95067fa410a85cd3ab71e8a3ec2ee&ctl00$content1$txtCaptcha=!NNGR8&__ASYNCPOST=true&ctl00$content1$btnSubmit=Submit
               */
              
              
              //debugger;
              //type of shit going out in the response (aka look for these on hashkillers sha1 page, these are ID hooks for elements
              // ["VIEWSTATE", "EVENTVALIDATION"]

              //request.post("https://www.hashkiller.co.uk/sha1-decrypter.aspx" {})
              
            }
          });
        });
      });
  });
});


var request = require("request");
require('request-debug')(request, (type, data, r) => { //debugger;
 });
var cheerio = require("cheerio");

request.defaults({jar: true});


//75atb6b606neh0h5qibd7ej6f4

var url = "https://ringzer0team.com";

//request({url: url + '/challenges/159', headers: {Cookie: "PHPSESSID=75atb6b606neh0h5qibd7ej6f4"}}, function ( x, y, html ) {
//  var $ = cheerio.load(html);
//  var hash = $(".message").text().match(/\w+/g)[2];
//
//
//
//  //debugger;
//  
//  
//  if(this.req.path === "/login") {
//    var csrf = $('script')["2"].children["0"].data.split("'")[1]//$("[name='csrf']").attr("class");
//    var body = "username=sol&password=k00bface&csrf=" + csrf + "&check=true";
//    body = body.split("&").map(x => x.split("=")).reduce( (x,y) => { x[y[0]] = y[1]; return x; }, {});
//    
//    request.post({url:url + this.req.path, form: body/*, proxy : "http://127.0.0.1:8888"*/}, function(a,b,c,d) {
//      //debugger;
//    });
//    
//    
//  }
//});

//request("https://ringzer0team.com/challenges/159", (error, response, html) => {
//  
//  debugger;
//
//  //probably useless now that i turned the cokie jar on
//  //var phpsessionid = req.headers["set-cookie"][0].match(/=\w+;/)[0].substring(1, 27);
//  
//  var $ = cheerio.load(html);
//  //debugger;
//  var csrf = $('script')["2"].children["0"].data.split("'")[1]//$("[name='csrf']").attr("class");
//  var body = "username=sol&password=k00bface&csrf=" + csrf + "&check=true";
//  body = body.split("&").map(x => x.split("=")).reduce( (x,y) => { x[y[0]] = y[1]; return x; }, {});
//
//  //body.reduce( (x,y) => {x[y[0]] = y[1]}, {});
//  //debugger;
//  request.post({url:'https://ringzer0team.com/login', form: body}, (err,httpResponse,body) => {
//
//    request("https://ringzer0team.com/challenges/159", (error, response, html) => {
//      debugger;
//    });
//  });
//  
//  debugger;
//});

