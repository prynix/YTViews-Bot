//
// BOT SETTINGS:
//
var S = require('./settings.json')
    , REF = require('./referer.js')
    , iframesArray = require('./iframesSRC.js')
    //, custom_cookie = require('./cookie.js')
    , startRandomRefererWashingPoint = REF.static[getRandomInt(0, REF.static.length - 1)]
    // , PRETENDER_cookie = custom_cookie[getRandomInt(0, custom_cookie.length - 1)]
    , PRETENDER_headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        "Accept-Encoding": "gzip, deflate, sdch, br",
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive',
        "Cache-Control": "no-cache",
        //"Cookie": PRETENDER_cookie,
        "Host": startRandomRefererWashingPoint,
        "Origin": startRandomRefererWashingPoint,
        'Referer': startRandomRefererWashingPoint,
        'X-Forwarded-For': 'google.com',
        "User- Agent": generateNewUserAgent()
    }

    , casper = require('casper').create({
        waitTimeout: 30000,
        stepTimeout: 50000,
        viewportSize: { width: getRandomInt(1024, 2200), height: getRandomInt(768, 1900) },
        pageSettings: {
            customHeaders: PRETENDER_headers,
            loadImages: true,
            loadPlugins: true
        },
        logLevel: "debug",
        verbose: true
    })

    , mouse = require("mouse").create(casper);
//
// BOT INIT:   
//
var i = 0;
casper
    .start()
    .viewport(getRandomInt(1024, 2200), getRandomInt(768, 1900))
    .userAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.138 Safari/537.36 OPR/22.0.1485.78487')
    //.userAgent(generateNewUserAgent())
    //casper.withFrame
    .each(REF.static, function (self, link) {
        //
        var frame = iframesArray[getRandomInt(0, iframesArray.length - 1)];
        //
        this.thenOpen(link, function () {
            //
            //
            // вставляем фрейм с видео
            this.evaluate(function () {
                var fakeIframe = document.createElement('iframe');
                fakeIframe.setAttribute('src', frame);
                fakeIframe.setAttribute('width', 854)
                fakeIframe.setAttribute('height', 480)
                fakeIframe.setAttribute('frameborder', 0)
                fakeIframe.setAttribute('allowfullscreen', true)
                document.body.appendChild(fakeIframe);
                document.querySelector('iframe[src="' + frame + '"]').click();
            });
            //
            //
            //
        })
            .then(function () {
                //
                // Успешно ли вставлен
                //
                var exsist_check = self.evaluate(function () {
                    if (document.querySelector('iframe[src="' + frame + '"]') !== null) {
                        return "СУЩЕСТВУЕТ";
                    } else {
                        return "NO -- СУЩЕСТВУЕТ";
                    }
                });
                self.echo("=================exsist_check:  ", exsist_check);
                //this.click('iframe');
                i++;
                // 2 - активность просмотра видео
                var Y_frame = this.evaluate(function () {
                    var Iframe = document.querySelector('iframe[src="' + frame + '"]');
                    var iframe = Iframe.contentWindow.document;
                    // Attempt click
                    // try {
                    iframe.querySelector('.ytp-large-play-button').click();
                    // Мотаем влево - вправо жмем пробелы
                    var ConstructorKeyEvent = document.createEvent('UIEvents');
                    ConstructorKeyEvent.initUIEvent('keyup', true, true, window, 1);
                    ConstructorKeyEvent.keyCode = 39;  // 37  39   32
                    Iframe.click();
                    for (var i = 0; i < 100; i++) {
                        Iframe.dispatchEvent(ConstructorKeyEvent);
                    }
                    ConstructorKeyEvent.keyCode = 37;
                    for (var i = 0; i < 70; i++) {
                        Iframe.dispatchEvent(ConstructorKeyEvent);
                    }
                    ConstructorKeyEvent.keyCode = 32;
                    Iframe.dispatchEvent(ConstructorKeyEvent);
                    // } catch (e) { }
                    return iframe.querySelector('.ytp-large-play-button');
                });
                this.capture('screenshots/casperJS_' + i + '_.png');
                console.log("FAKE IFRAME:  ", Y_frame);
                //PRETENDER_homoSapiens__backend(this);       
                //
                //
                //
            });
    })
    //
    //Bot start
    //
    .run(function () {
        this.echo('</> Casper YOUTUBE VIEWS SPINNER run </>').exit();
    });
//
//
// utils:
//
//
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
function generateNewUserAgent() {
    // http://www.webapps-online.com/online-tools/user-agent-strings
    var version1 = (Math.random() * 1000).toFixed(2).toString()
        , version2 = (Math.random() * 10000).toFixed(3).toString()
        , UA_storage = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/538.36 (KHTML, like Gecko) Edge/12.10240',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10525',
            'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240',
            'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10136',
            'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10162',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10147',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10134',
            'Mozilla/5.0 (Windows NT 6.3; Win64, x64; Touch) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0 (Touch; Trident/7.0; .NET4.0E; .NET4.0C; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729; HPNTDFJS; H9P; InfoPath',
            'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0',
            'Mozilla/5.0 (X11; CrOS x86_64 6783.1.0) AppleWebKit/537.36 (KHTML, like Gecko) Edge/12.0',
            'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0',
            'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; GTB7.5; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 1.1.4322; YTB730)',
            'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 625H)',
            'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; chromeframe/27.0.1453.94; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; MS-RTC LM 8)',
            'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET CLR 1.1.4322; OfficeLiveConnector.1.5; OfficeLivePatch.1.3; .NET4.0E)',
            'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.3; .NET4.0C; .NET4.0E; Zune 4.7)',
            'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; Tablet PC 2.0; .NET4.0C; .NET4.0E)',
            'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.3; .NET4.0C; .NET4.0E; EIE10;ENUSMSE; rv:11.0) like Gecko',
            'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; .NET4.0C; .NET4.0E; MS-RTC LM 8)',
            'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; GTB7.5; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; yie8)',
            'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; HPDTDF; InfoPath.3)',
            'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; GTB7.5; BTRS100200; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 1.1.4322; .NET4.0C)',
            'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; InfoPath.3; .NET4.0E; .NET CLR 1.1.4322)',
            'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 810)',
            'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; GTB7.5; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.3; .NET4.0C; Alexa Toolbar)',
            'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET4.0C; .NET4.0E)',
            'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0; .NET4.0E; .NET4.0C; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729; HPNTDFJS; InfoPath.3)',
            'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; HTC; Windows Phone 8X by HTC)',
            'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)',
            'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36 mozilla/5.0 (iphone; cpu iphone os 7_0_2 like mac os x) applewebkit/537.51.1 (khtml, like gecko) version/7.0 mobile/11a501 safari/9537.53',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_4 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) CriOS/27.0.1453.10 Mobile/10B350 Safari/8536.25',
            'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36 Mozilla/5.0 (iPad; CPU OS 5_1 like Mac OS X; en-us) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B176 Safari/7534.48.3',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_4 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B350 Safari/8536.25',
            'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25 (Windows NT 6.3; Trident/7.0; Touch; .NET4.0E; .NET4.0C; Tablet PC 2.0; rv:11.0) like Gecko',
            'Mozilla/5.0 (iPad; CPU OS 6_1 like Mac OS X) AppleWebKit/537.51.5 (KHTML, like Gecko) Version/6.0 Mobile/11A439 Safari/9537.123',
            'Mozilla/5.0 (iPad; CPU OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) CriOS/29.0.1547.11 Mobile/9B206 Safari/7534.48.3 (E25C11B6-A982-4A93-830B-A48240F005A4)',
            'Mozilla/5.0 (iPad; U; CPU OS 6_0 like Mac OS X; zh-cn) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25',
            'Mozilla/5.0 (iPad; CPU OS 4_3_5 like Mac OS X; nl-nl) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8L1 Safari/6533.18.5',
            'Mozilla/5.0 (iPad; U; CPU OS 4_2_1 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Mobile/8C148',
            'Mozilla/5.0 (iPad; CPU OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) CriOS/29.0.1547.11 Mobile/9B206 Safari/7534.48.3 (6FC64382-58A3-4F77-97AC-13E4E6A7811C)',
            'Mozilla / 5.0(iPad; CPU OS 6_0 like Mac OS X) AppleWebKit / 536.26(KHTML, like Gecko) Version / 6.0 Mobile / 10A5355d Safari / 8536.25',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/602.3.12 (KHTML, like Gecko) Version/10.0.2 Safari/602.3.12Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_4 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B350 Safari/8536.25',
            'Mozilla/5.0 (iPad; CPU OS 9_3_5 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) GSA/22.0.141836113 Mobile/13G36 Safari/600.1.4',
            'Mozilla/5.0 (iPad; CPU OS 7_0_2 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/30.0.1599.16 Mobile/11A501 Safari/8536.25 (5CDD840C-94F1-4A0D-99C6-EC93ADC28226)',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A366 Safari/600.1.4',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_4 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/31.0.1650.18 Mobile/11B554a Safari/8536.25 (07AD3467-23D9-4EC2-9394-E9FAA7989F62)',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mercury/7.2 Mobile/9B206 Safari/7534.48.3',
            'Mozilla/5.0 (iPad; CPU OS 7_0_3 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/30.0.1599.16 Mobile/11B511 Safari/8536.25 (08741367-0937-4EF6-9270-9EF255317AE0)',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_3 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11B511 Safari/9537.53',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_2 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/30.0.1599.16 Mobile/11A501 Safari/8536.25 (43B72B35-E032-42F6-8AB8-ACFF244D89A8)',
            'Mozilla/5.0 (iPad; CPU OS 7_0_2 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/30.0.1599.16 Mobile/11A501 Safari/8536.25 (5CDD840C-94F1-4A0D-99C6-EC93ADC28226)',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/30.0.1599.16 Mobile/11A465 Safari/8536.25 (2637345E-FAD0-4B3B-A7E9-3FB6E057CFDD)',
            'Mozilla/5.0 (iPad; CPU OS 6_0_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A523 Safari/8536.25',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A405 Safari/8536.25',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0_1 like Mac OS X; nl-nl) AppleWebKit/536.26 (KHTML, like Gecko) CriOS/23.0.1271.96 Mobile/10A523 Safari/8536.25 (1C019986-AF73-46A7-8F31-0E86ADFFCDB4)',
            'Mozilla/5.0 (iPad; CPU OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B329 Safari/8536.25',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B329 Safari/8536.25',
            'Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/11A465 Twitter for iPhone',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/11A465 Twitter for iPhone',
            'Mozilla/5.0 (iPad; CPU OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B206 Safari/7534.48.3',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_4 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B350 Safari/8536.25',
            'Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53',
            'Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/30.0.1599.12 Mobile/11A465 Safari/8536.25 (3B92C18B-D9DE-4CB7-A02A-22FD2AF17C8F)',
            'Opera/9.80 (Android 2.3.3; Linux; Opera Tablet/ADR-1309251116) Presto/2.11.355 Version/12.10',
            'Opera/9.80 (Android; Opera Mini/7.5.33361/31.1448; U; en) Presto/2.8.119 Version/11.1010',
            'Opera/9.80 (Windows NT 6.1; WOW64) Presto/2.12.388 Version/12.16',
            'Opera/9.80 (Android; Opera Mini/7.5.33361/31.1543; U; en) Presto/2.8.119 Version/11.1010',
            'Opera/9.80 (Android 2.3.3; Linux; Opera Mobi/ADR-1301080958) Presto/2.11.355 Version/12.10',
            'Opera/9.80 (X11; Linux i686; U; ru) Presto/2.10.229 Version/11.62',
            'Opera/9.80 (X11; Linux x86_64) Presto/2.12.388 Version/12.16',
            'Opera/9.80 (J2ME/MIDP; Opera Mini/8.0.35180/35.2883; U; en) Presto/2.8.119 Version/11.10',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.138 Safari/537.36 OPR/22.0.1485.78487',
            'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.18 Safari/537.36 OPR/23.0.1522.14',
            'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36 OPR/18.0.1284.68',
            'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36 OPR/18.0.1284.63',
            'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.52 Safari/537.36 OPR/15.0.1147.100',
            'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10136',
            'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/' + version1 + ' (KHTML, like Gecko) Chrome/51.0.' + version2 + ' Safari/' + version1,
            'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)',
            'Mozilla/5.0 (Mobile; Windows Phone 8.1; Android 4.0; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; Microsoft; RM-1141) like iPhone OS 7_0_3 Mac OS X AppleWebKit/537 (KHTML, like Gecko) Mobile Safari/537',
            'Mozilla/5.0 (Android 4.4; Tablet; rv:41.0) Gecko/41.0 Firefox/41.0',
            'OPWV-SDK/62 UP.Browser/6.2.2.1.208 (GUI) MMP/2.0',
            'Nokia6600/1.0 (4.03.24) SymbianOS/6.1 Series60/2.0 Profile/MIDP-2.0 Configuration/CLDC-1.0',
            'Nokia6230i/2.0 (03.25) Profile/MIDP-2.0 Configuration/CLDC-1.1',
            'Mozilla/4.0 (compatible; MSIE 5.0; Series60/2.8 Nokia6630/4.06.0 Profile/MIDP-2.0 Configuration/CLDC-1.1)',
            'Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; DEVICE INFO) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/12.',
            'Mozilla/5.0 (X11; CrOS armv7l 4537.56.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.38 Safari/537.36',
            'Mozilla/5.0 (X11; CrOS x86_64 5116.88.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.124 Safari/537.36',
            'Mozilla/5.0 (X11; CrOS x86_64 5116.115.4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36',
            'Mozilla/5.0 (X11; CrOS armv7l 8872.76.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.105 Safari/537.36',
            'Mozilla/5Mozilla/5.0 (X11; U; CrOS i686 9.10.0; en-US) AppleWebKit/532.5 (KHTML, like Gecko) Chrome/4.0.253.0 Safari/532.5.0 (X11; Ubuntu; Linux x86_64; rv:29.0) Gecko/20100101 Firefox/29.0',
            'Mozilla/5.0 (X11; CrOS armv7l 8872.73.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.103 Safari/537.36',
            'Mozilla/5.0 (X11; CrOS x86_64 8872.54.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.54 Safari/537.36',
            'iTunes/10.1.1 (Windows; Microsoft Windows 7 x64 Enterprise Edition (Build 7600)) AppleWebKit/533.19.4',
            'iTunes/9.0.3 (Macintosh; U; Intel Mac OS X 10_6_2; en-ca)',
            'iTunes/9.0.2 (Windows; N)',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36) Surf/0.6',
            'Mozilla/5.0 (X11; U; Unix; en-US) AppleWebKit/537.15 (KHTML, like Gecko) Chrome/24.0.1295.0 Safari/537.15 Surf/0.6',
            'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; FlexNetDesktopClient_1_0)',
            'Xiaomi_2014216_TD-LTE/V1 Linux/3.4.0 Android/4.4.4 Release/20.10.2014 Browser/AppleWebKit537.36 Mobile Safari/537.36 System/Android 4.4.4 XiaoMi/MiuiBrowser/2.0.1',
            'Mozilla/5.0 (Linux; U; Android 4.4.4; en-gb; MI 3W Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/39.0.0.0 Mobile Safari/537.36 XiaoMi/MiuiBrowser/2.1.1',
            'Mozilla/5.0 (Linux; U; Android 5.0.2; en-gb; Mi 4i Build/LRX22G) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/39.0.0.0 Mobile Safari/537.36 XiaoMi/MiuiBrowser/2.1.1',
            'Mozilla/5.0 (Linux; U; Android 4.4.4; en-us; HM 1S Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/39.0.0.0 Mobile Safari/537.36 XiaoMi/MiuiBrowser/2.1.1',
            'Mozilla/5.0 (Linux; U; Android 4.4.4; en-us; 2014818 Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/42.0.0.0 Mobile Safari/537.36 XiaoMi/MiuiBrowser/2.1.1',
            'Mozilla/5.0 (Linux; U; Android 4.4.4; id-id; 2014817 Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/42.0.0.0 Mobile Safari/537.36 XiaoMi/MiuiBrowser/2.1.1',
            'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SonyD5503 Build/14.3.A.0.681) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
            'Mozilla/5.0 (Linux; U; Android 4.2.2; vi-vn; NV7 Build/JDQ39) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30',
            'Mozilla/5.0 (Linux; U; Android 2.3.6; ar-ae; GT-S5360 Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
        ];
    return UA_storage[getRandomInt(0, UA_storage.length - 1)];
}
//
// притворяемся человеком:    зарандомить порядок действий, кроме перехода к след.  вкладке
//
/*
    X / Y - coordinates
    mouseup, mousedown, click, dblclick, mousemove, mouseover, mouseout , mouseenter, mouseleave , contextmenu
*/
function PRETENDER_homoSapiens__backend(self) {
    for (var i = 0; i < 5; i += 1) {
        self.mouse.doubleclick(getRandomInt(100, 960), getRandomInt(10, 7400));
    }
    self.wait(getRandomInt(2, 5) * 1000, function () { });
    self.scrollToBottom();
    for (var i = 0; i < 500; i += 1) {
        self.scrollTo(getRandomInt(1, 1100), getRandomInt(1, 7450));
    }
    self.sendKeys('section.chlidren_' + getRandomInt(1, 4) + '  ', 'space');
    self.click('section.chlidren_' + getRandomInt(1, 4) + '  ');
    self.wait(getRandomInt(2, 5) * 1000, function () { });
    for (var i = 0; i < 100; i += 1) {
        self.mouseEvent('mousemove', '#main-content', getRandomInt(10, 90) + '%', getRandomInt(10, 90) + '%');
    }
    self.wait(getRandomInt(2, 5) * 1000, function () { });
    for (var i = 0; i < 5; i += 1) {
        self.mouse.doubleclick(getRandomInt(100, 960), getRandomInt(10, 7400));
    }
    self.wait(3 * 1000, function () { });
    //self.reload(function () { });
    for (var i = 0; i < 50; i += 1) {
        self.scrollTo(getRandomInt(10, 500), getRandomInt(6000, 7100));
        self.scrollTo(getRandomInt(100, 700), getRandomInt(2200, 2300));
        self.scrollTo(getRandomInt(200, 800), getRandomInt(4400, 3500));
        self.scrollTo(getRandomInt(300, 900), getRandomInt(4600, 3900));
    }
    for (var i = 0; i < 5; i += 1) {
        self.mouse.doubleclick(getRandomInt(100, 960), getRandomInt(10, 7400));
    }
    self.wait(getRandomInt(5, 10) * 1000, function () { });
    for (var i = 0; i < 50; i += 1) {
        self.mouse.move(getRandomInt(100, 200), getRandomInt(10, 200));
        self.mouse.move(getRandomInt(200, 300), getRandomInt(100, 300));
        self.mouse.move(getRandomInt(300, 400), getRandomInt(200, 400));
        self.mouse.move(getRandomInt(400, 500), getRandomInt(300, 500));
        self.mouse.move(getRandomInt(500, 600), getRandomInt(400, 600));
    }
    self.wait(getRandomInt(5, 10) * 1000, function () { });
    self.sendKeys('section.chlidren_' + getRandomInt(1, 4) + '  ', 'space');
    for (var i = 0; i < 5; i += 1) {
        self.mouse.doubleclick(getRandomInt(100, 960), getRandomInt(10, 7400));
    }
    self.scrollToBottom();
    for (var i = 0; i < 50; i += 1) {
        self.scrollTo(getRandomInt(10, 500), getRandomInt(3000, 3100));
        self.scrollTo(getRandomInt(100, 700), getRandomInt(3200, 3300));
        self.mouseEvent('mousemove', 'aside', getRandomInt(10, 90) + '%', getRandomInt(10, 90) + '%');
        self.scrollTo(getRandomInt(200, 800), getRandomInt(3400, 3500));
        self.scrollTo(getRandomInt(300, 900), getRandomInt(3600, 3900));
        self.mouse.move(getRandomInt(100, 1100), getRandomInt(100, 7400));
    }
    self.wait(getRandomInt(5, 10) * 1000, function () { });
    for (var i = 0; i < 10; i += 1) {
        self.mouseEvent('mousemove', 'section.chlidren_' + getRandomInt(1, 4) + ' img', getRandomInt(10, 90) + '%', getRandomInt(10, 90) + '%');
        self.click('section.chlidren_' + getRandomInt(1, 4) + '  ');
    }
    self.wait(3 * 1000, function () { });
    for (var i = 0; i < 5; i += 1) {
        self.mouse.move(getRandomInt(100, 1100), getRandomInt(100, 7400));
        self.click('section.chlidren_' + getRandomInt(1, 4) + ' img');
        self.wait(1, function () { });
    }
    self.wait(getRandomInt(5, 10) * 1000, function () { });
    for (var i = 0; i < 5; i += 1) {
        self.mouse.move(getRandomInt(100, 1100), getRandomInt(100, 7400));
        self.click('section.chlidren_' + getRandomInt(1, 4) + ' img');
        self.wait(1, function () { });
    }
    self.scrollToBottom();
    //self.reload(function () { });
    self.mouseEvent('dblclick', 'section.chlidren_' + getRandomInt(1, 4) + ' img', getRandomInt(10, 90) + '%', getRandomInt(10, 90) + '%');
    //
    // Идём на следующий раздел сайта:
    //
    self.click('header nav > a:nth-child(' + getRandomInt(1, 12) + ')');
    self.waitForUrl(/\.html$/, function () {
        self.echo('redirected to INSIDE.html');
    });
    self.mouseEvent('dblclick', 'section.chlidren_' + getRandomInt(1, 4) + ' img', getRandomInt(10, 90) + '%', getRandomInt(10, 90) + '%');
    for (var i = 0; i < 20; i += 1) {
        self.mouse.move(getRandomInt(700, 600), getRandomInt(4800, 4500));
        self.mouse.move(getRandomInt(700, 800), getRandomInt(5200, 5000));
        self.mouse.move(getRandomInt(500, 900), getRandomInt(5400, 5300));
        self.mouse.move(getRandomInt(400, 300), getRandomInt(5800, 5700));
        self.mouse.move(getRandomInt(100, 200), getRandomInt(6000, 5900));
    }
    self.mouseEvent('dblclick', 'section.chlidren_' + getRandomInt(1, 4) + ' p', getRandomInt(5, 95) + '%', getRandomInt(5, 95) + '%');
    self.sendKeys('body', 'a', { modifiers: 'ctrl' });
    self.wait(getRandomInt(5, 10) * 1000, function () { });
    for (var i = 0; i < 20; i += 1) {
        self.mouse.move(getRandomInt(100, 200), getRandomInt(10, 200));
        self.mouse.move(getRandomInt(200, 300), getRandomInt(100, 300));
        self.mouse.move(getRandomInt(300, 400), getRandomInt(200, 400));
        self.mouse.move(getRandomInt(400, 500), getRandomInt(300, 500));
        self.mouse.move(getRandomInt(500, 600), getRandomInt(400, 600));
    }
    self.click('section.chlidren_' + getRandomInt(1, 4) + '  ');
    self.wait(getRandomInt(2, 5) * 1000, function () { });
    for (var i = 0; i < 10; i += 1) {
        self.mouse.doubleclick(getRandomInt(100, 960), getRandomInt(10, 7400));
    }
    self.sendKeys('body', 'с', { modifiers: 'ctrl' });
    for (var i = 0; i < 50; i += 1) {
        self.scrollTo(getRandomInt(10, 500), getRandomInt(10, 1000));
        self.scrollTo(getRandomInt(100, 700), getRandomInt(100, 2500));
        self.scrollTo(getRandomInt(200, 800), getRandomInt(200, 3700));
        self.scrollTo(getRandomInt(300, 900), getRandomInt(300, 4900));
    }
    for (var i = 0; i < 5; i += 1) {
        self.mouse.move(getRandomInt(100, 1100), getRandomInt(100, 7400));
        self.click('section.chlidren_' + getRandomInt(1, 4) + ' img');
        self.wait(1, function () { });
    }
    self.click('header nav > a:nth-child(' + getRandomInt(1, 12) + ')');
    for (var i = 0; i < 5; i += 1) {
        self.mouse.move(getRandomInt(100, 1100), getRandomInt(100, 7400));
        self.click('section.chlidren_' + getRandomInt(1, 4) + ' img');
        self.wait(1, function () { });
    }
}
/*
В общем порядке, алгоритм един: 
    — получить объект узла DOM, на который будет вешаться событие;
    — создать объект необходимого модуля событий;
    — инициализировать объект события;
    — назначить событие на необходимый узел DOM;
*/
function PRETENDER_homoSapiens__frontend() {
    document.body.scrollTop = 0;
    var ConstructorMouseEvent = document.createEvent('MouseEvents')
        , ConstructorKeyEvent = document.createEvent('UIEvents')
        , $header = document.querySelector('header nav')
        , $div = document.querySelector('div#main-content')
        , $section = document.querySelector('section.chlidren_' + getRandomInt(1, 4))
        , $IMG = document.querySelector('section.chlidren_' + getRandomInt(1, 4) + ' img')
        , $ = document.querySelector('section.chlidren_' + getRandomInt(1, 4) + '  ')
        , $p = document.querySelector('section.chlidren_' + getRandomInt(1, 4) + ' p');
    ConstructorKeyEvent.initUIEvent('keyup', true, true, window, 1);
    ConstructorKeyEvent.keyCode = getRandomInt(1, 30);
    // Emit:
    for (var i = 0; i < 100; i += 1) {
        document.body.scrollTop += 20;
        ConstructorMouseEvent.initMouseEvent('mousemove', true, true, window, 1, getRandomInt(10, 900), getRandomInt(10, 7500), getRandomInt(10, 900), getRandomInt(10, 7500), false, false, true, false, 0, null);
        $header.dispatchEvent(ConstructorMouseEvent);
        $section.dispatchEvent(ConstructorMouseEvent);
        $IMG.dispatchEvent(ConstructorMouseEvent);
        $.dispatchEvent(ConstructorMouseEvent);
        $p.dispatchEvent(ConstructorMouseEvent);
    }
    document.body.scrollTop = 7400;
    for (var i = 0; i < 30; i += 1) {
        document.body.scrollTop -= 20;
        ConstructorMouseEvent.initMouseEvent('click', true, true, window, 1, 500, getRandomInt(100, 5000), 300, getRandomInt(10, 500), false, false, true, false, 0, null);
        $section.dispatchEvent(ConstructorMouseEvent);
        $IMG.dispatchEvent(ConstructorMouseEvent);
        $.dispatchEvent(ConstructorMouseEvent);
        $p.dispatchEvent(ConstructorMouseEvent);

        $div.dispatchEvent(ConstructorKeyEvent);
        $header.dispatchEvent(ConstructorKeyEvent);
    }
}
function PRETENDER_homoSapiens__frontend_scroll() {
    document.body.scrollTop = 0;
    for (var i = 0; i < 3700; i += 1) {
        document.body.scrollTop += 2;
    }
    for (var i = 0; i < 3700; i += 1) {
        document.body.scrollTop -= 2;
    }
}
//
// initMouseEvent ( 'type', bubbles, cancelable, windowObject, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget )
//