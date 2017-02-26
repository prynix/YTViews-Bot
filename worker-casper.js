var exec = require('child_process').exec
    , scheduleCounter = 0;

function runYoutubeViewer() {
    for (var i = 0; i < 10; i += 1) {
        var process1 = exec('casperjs y-bot.js')
        /*
            , process2 = exec('casperjs --proxy=127.0.0.1:3000 y-bot.js')
            , process3 = exec('casperjs --proxy=127.0.0.1:3000 y-bot.js')
            , process4 = exec('casperjs --proxy=127.0.0.1:3000 y-bot.js')
            , process5 = exec('casperjs --proxy=127.0.0.1:3000 y-bot.js')
            , process6 = exec('casperjs --proxy=127.0.0.1:3000 y-bot.js')
            , process7 = exec('casperjs --proxy=127.0.0.1:3000 y-bot.js')
            , process8 = exec('casperjs --proxy=127.0.0.1:3000 y-bot.js')
            , process9 = exec('casperjs --proxy=127.0.0.1:3000 y-bot.js')
            , process10 = exec('casperjs --proxy=127.0.0.1:3000 y-bot.js');*/

        process1.stdout.on('data', function (data) {
            //scheduleCounter++;
            //console.log('[process-1]', data.trim());
        });
        /*
        process2.stdout.on('data', function (data) {
            // scheduleCounter++;
            //console.log('[process-2]', data.trim());
        });

        process3.stdout.on('data', function (data) {
            // scheduleCounter++;
            //console.log('[process-3]', data.trim());
        });

        process4.stdout.on('data', function (data) {
            //scheduleCounter++;
            //console.log('[process-4]', data.trim());
        });
        process5.stdout.on('data', function (data) {
            //scheduleCounter++;
            //console.log('[process-4]', data.trim());
        });
        process6.stdout.on('data', function (data) {
            //scheduleCounter++;
            //console.log('[process-4]', data.trim());
        });
        process7.stdout.on('data', function (data) {
            //scheduleCounter++;
            //console.log('[process-4]', data.trim());
        });
        process8.stdout.on('data', function (data) {
            //scheduleCounter++;
            //console.log('[process-4]', data.trim());
        });
        process9.stdout.on('data', function (data) {
            //scheduleCounter++;
            //console.log('[process-4]', data.trim());
        });
        process10.stdout.on('data', function (data) {
            //scheduleCounter++;
            //console.log('[process-4]', data.trim());
        });
        */
        scheduleCounter += 1;
    }
}

runYoutubeViewer();
runYoutubeViewer();

setInterval(function () {
    console.log("Casper-Youtube-Viewer work: " + scheduleCounter + ' times;');
    //logger.info("Casper-traffic-creator work: " + scheduleCounter + ' times;');
    runYoutubeViewer();
}, 1 * 60 * 1000);
