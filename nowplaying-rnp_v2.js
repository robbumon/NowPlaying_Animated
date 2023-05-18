var update, prevtext, text, title, game, system, composer, artpath, timeremaining, timelength, displaytime
//getRequest();

function unEscape(htmlStr) {
  htmlStr = htmlStr.replace(/&lt;/g , "<");	 
  htmlStr = htmlStr.replace(/&gt;/g , ">");     
  htmlStr = htmlStr.replace(/&quot;/g , "\"");  
  htmlStr = htmlStr.replace(/&#39;/g , "\'");   
  htmlStr = htmlStr.replace(/&amp;/g , "&");
  return htmlStr;
}

function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

var timer = setInterval(function() { getRequest(); }, 1000);

function getRequest() {
    var getJSON = function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            var status = xhr.status;
            if (status == 200) {
                callback(null, xhr.response);
            } else {
                callback(status);
            }
        };
        xhr.send();
    }
    getJSON('http://localhost:8000/default/?cmd=FormatTitles&param1=%25album%25|%25artist%25|%25title%25%|%24directory%28%25path%25%2C2%29|%24directory%28%25path%25%2C2%29%24char%2847%29%24directory%28%25path%25%2C1%29|%25playback_time%25|%25length%25|%25length_seconds%25|%25playback_time_remaining_seconds%25&param3=file.json',  function(err, data) {
    //getJSON('http://localhost:8000/default/?cmd=FormatTitles&param1=%25album%25|%25artist%25|%25title%25%|%25Comment%25|%25playback_time%25|%25length%25|%25length_seconds%25|%25playback_time_remaining_seconds%25&param3=file.json',  function(err, data) {
        if (err != null) {
            console.error(err);
        } else {
            
            //get song data
            title = data[2];
            game = data[0];
            system = data[3];
            composer = data[1];
            artpath = '../Music/' + data[4] + '/albumart.png' //all my album art files are named "albumart.png" in the corresponding game folder

            //Playback HH:MM:SS
            timeremaining = data[5];
            timelength = data[6];

            //Playback Seconds
            length_seconds = data[7];
            playback_time_seconds = data[8];

            playback_percentage_text = (playback_time_seconds/length_seconds).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1});
            playback_percentage = (300 * (playback_time_seconds/length_seconds)).toFixed(2)+'px';

            displaytime = timeremaining + " / " + timelength;
            document.getElementById("time").textContent = displaytime;
            document.getElementById("progress").style.width = playback_percentage;
    
            //compare from last song
            text = title + game + system + composer;

            if (prevtext != text) {
                console.log("updated!")
                console.log("JSON: " + decodeHtml(data));
                console.log("artpath: " + artpath);
                startAnimation();
                updateArtwork();
            }
            game = unEscape(game);
            title = unEscape(title);
            composer = unEscape(composer);
            prevtext = text;
        }
    })
};

function updateTime() {
  document.getElementById("time").textContent = "test";
}

function updateArtwork() {
  var t2 = anime.timeline({
    targets: '.images',
    easing: 'linear'
  })
  .add({
    opacity: 0,
    duration: 500
  })
  .add({
    update: function() {
      img = document.getElementById("image1");
      img.src = artpath;
      img.addEventListener("error", function(event) {
        event.target.src = "../Music/Station ID/albumart.png"
        event.onerror = null
      })
      //document.getElementById("image1").src = artpath;
    }
  })
  .add({
    opacity: 1,
    duration: 500
  })
};

function startAnimation() {
    var t1 = anime.timeline({
      targets: '.song',
      easing: 'linear'
    })
    .add({
      opacity: 0,
      duration: 750
    })
    .add({
      left: '-1200px',
      duration: 10,
      delay: 100
    })
    .add({
      update: function() {
        document.getElementById("title").textContent = title;
        document.getElementById("game").textContent = game;
        document.getElementById("system").textContent = system;
        document.getElementById("composer").textContent = composer;
      }
    })
    .add({
      opacity: 1,
      duration: 10
    })
    .add({
      left: '20px',
      delay: anime.stagger(600),
      easing: 'spring(1, 90, 25, 0)'
    })

}
