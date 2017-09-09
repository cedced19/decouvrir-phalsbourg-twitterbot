var Twitter = require('twitter');
var fs = require('fs');
var path = require('path');
var schedule = require('node-schedule');
var keystorage = require('./lib/keystorage');

var config = require('./config');
var client = new Twitter(config);

var publishTweet = function (point) {
  var status = point.text;
  if (point.promote) {
    status += ' https://play.google.com/store/apps/details?id=com.decouvrirphalsbourg #android #phalsbourg #histoire';
  }
  if (point.image) {
    var media = fs.readFileSync(path.resolve(__dirname, './media/'+ point.image));
    client.post('media/upload', {media: media}, function(error, media, response) {
      if (!error) {
        var params = {
          status: status,
          media_ids: media.media_id_string
        }
        client.post('statuses/update', params, function(error, tweet, response) {
          if(error) throw error;
        });
      }
    });
  } else {
    client.post('statuses/update', {status: status},  function(error, tweet, response) {
      if(error) throw error;
    });
  }

}

var points = require(path.resolve(__dirname, './points.json'));

var publish = schedule.scheduleJob('0 9 * * 0', function(){
  publishTweet(points[keystorage(points.length)]);
});
