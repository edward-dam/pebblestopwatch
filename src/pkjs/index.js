// Author: Ed Dam

// pebblejs
require('pebblejs');

// clayjs
var Clay       = require('pebble-clay');
var clayConfig = require('./config');
var clay = new Clay(clayConfig);

// libraries
var UI       = require('pebblejs/ui');
var Vector2  = require('pebblejs/lib/vector2');
//var ajax   = require('pebblejs/lib/ajax');
var Settings = require('pebblejs/settings');
var Vibe     = require('pebblejs/ui/vibe');

// definitions
var window = new UI.Window();
var windowSize = window.size();
var size = new Vector2(windowSize.x, windowSize.y);
//var icon = 'images/menu_icon.png';
var backgroundColor = 'black';
var highlightBackgroundColor = 'white';
//var textColor = 'white';
var highlightTextColor = 'black';
var textAlign = 'center';
var fontXLarge = 'roboto-bold-subset-49';
var fontLarge = 'gothic-28-bold';
var fontMedium = 'gothic-24-bold';
var fontSmall = 'gothic-18-bold';
var fontXSmall = 'gothic-14-bold';
//var style = 'small';
function position(height){
  return new Vector2(0, windowSize.y / 2 + height);
}

// main screen
var mainWind = new UI.Window();
var mainText = new UI.Text({size: size, backgroundColor: backgroundColor, textAlign: textAlign});
var mainImage = new UI.Image({size: size});
mainText.position(position(-70));
mainImage.position(position(-65));
mainText.font(fontLarge);
mainText.text('STOPWATCH');
mainImage.image('images/splash.png');
mainWind.add(mainText);
mainWind.add(mainImage);
mainWind.show();

// up screen
mainWind.on('click', 'up', function(e) {
  var upWind = new UI.Window();
  var upHead = new UI.Text({size: size, backgroundColor: backgroundColor, textAlign: textAlign});
  var upText = new UI.Text({size: size, backgroundColor: backgroundColor, textAlign: textAlign});
  upHead.position(position(-35));
  upText.position(position(-5));
  upHead.font(fontLarge);
  upText.font(fontMedium);
  upHead.text('Stopwatch');
  upText.text('Clock');
  upWind.add(upHead);
  upWind.add(upText);
  upWind.show();
});

// down screen
mainWind.on('click', 'down', function(e) {
  var downWind = new UI.Window();
  var downHead = new UI.Text({size: size, backgroundColor: backgroundColor, textAlign: textAlign});
  var downText = new UI.Text({size: size, backgroundColor: backgroundColor, textAlign: textAlign});
  downHead.position(position(-30));
  downText.position(position(-5));
  downHead.font(fontMedium);
  downText.font(fontSmall);
  downHead.text('Stopwatch v1.0');
  downText.text('by Edward Dam');
  downWind.add(downHead);
  downWind.add(downText);
  downWind.show();
});

// select button
mainWind.on('click', 'select', function(e) {
  
   // display screen
  var stopwatchWind = new UI.Window();
  var stopwatchHead = new UI.Text({size: size, backgroundColor: backgroundColor, textAlign: textAlign});
  var stopwatchText = new UI.Text({size: size, textAlign: textAlign,
    color: highlightTextColor, backgroundColor: highlightBackgroundColor
  });
  var stopwatchInfo = new UI.TimeText({size: size, backgroundColor: backgroundColor, textAlign: textAlign});
  stopwatchHead.position(position(-70));
  stopwatchText.position(position(-28));
  stopwatchInfo.position(position(+33));
  stopwatchHead.font(fontMedium);
  stopwatchText.font(fontXLarge);
  stopwatchInfo.font(fontXSmall);
  stopwatchHead.text('Stopwatch');
  stopwatchText.text('00:00');
  stopwatchInfo.text('\nLocal Time: %H:%M');
  stopwatchWind.add(stopwatchHead);
  stopwatchWind.add(stopwatchText);
  stopwatchWind.add(stopwatchInfo);
  stopwatchWind.show();
  mainWind.hide();

  var countup;
  var timer = 0;
  var resume = true;

  // start, pause, resume stopwatch  
  stopwatchWind.on('click', 'select', function() {
    Vibe.vibrate('short');
    if ( resume === true ) {
      var  minutes, seconds;
      countup = setInterval(function () {
        timer++;
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        //console.log(minutes + ":" + seconds);
        stopwatchText.text(minutes + ":" + seconds);
        stopwatchWind.add(stopwatchText);
        stopwatchWind.add(stopwatchInfo);
      }, 1000);      
      resume = false;
    } else {
      clearInterval(countup);
      resume = true;
    }
  });

  // reset stopwatch
  stopwatchWind.on('longClick', 'select', function() {
    Vibe.vibrate('short');
    stopwatchText.text('00:00');
    stopwatchWind.add(stopwatchText);
    stopwatchWind.add(stopwatchInfo);
    clearInterval(countup);
    timer = 0;
    resume = true;
  });
  
});
