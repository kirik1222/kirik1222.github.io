"use sctrict";

var isGmod = false;
var isTest = false;
var totalFiles = 50;
var totalCalled = false;
var downloadingFileCalled = false;
var percentage = 0;

/**
 * Gmod Called functions
 */
function GameDetails(
  servername,
  serverurl,
  mapname,
  maxplayers,
  steamid,
  gamemode
) {
  debug("GameDetails called");
  isGmod = true;
  if (!isTest) {
    loadAll();
  }

  if (Config.title) {
    $("#title").html(Config.title);
  } else {
    $("#title").html(servername);
  }
  $("#title").fadeIn();

  if (Config.enableMap) {
    $("#map").append(mapname);
    $("#map").fadeIn();
  } else {
    $("#map").hide();
  }

  if (Config.enableSteamID) {
    $("#steamid").html(steamid);
  }
  $("#steamid").fadeIn();
}

function SetFilesTotal(total) {
  debug("SetFilesTotal called total: " + total);
  totalCalled = true;
  totalFiles = total;
}

function SetFilesNeeded(needed) {
  debug("SetFilesNeeded called needed: " + needed);
  if (totalCalled) {
    var sPercentage = 100 - Math.round((needed / totalFiles) * 100);
    percentage = sPercentage;
    setLoad(sPercentage);
  }
}

var fileCount = 0;
function DownloadingFile(filename) {
  filename = filename.replace("'", "").replace("?", "");
  debug("DownloadingFile called '" + filename + "'");
  downloadingFileCalled = true;
  $("#history").prepend('<div class="history-item">' + filename + "</div>");
  $(".history-item").each(function(i, el) {
    if (i > 10) {
      $(el).remove();
    }
    $(el).css("opacity", "" + 1 - i * 0.1);
  });
}

var allow_increment = true;
function SetStatusChanged(status) {
  debug("SetStatusChanged called '" + status + "'");
  $("#history").prepend('<div class="history-item">' + status + "</div>");
  $(".history-item").each(function(i, el) {
    if (i > 10) {
      $(el).remove();
    }
    $(el).css("opacity", "" + 1 - i * 0.1);
  });
  if (status === "Workshop Complete") {
    allow_increment = false;
    setLoad(80);
  } else if (status === "Client info sent!") {
    allow_increment = false;
    setLoad(95);
  } else if (status === "Starting Lua...") {
    setLoad(100);
  } else {
    if (allow_increment) {
      percentage = percentage + 0.1;
      setLoad(percentage);
    }
  }
}

/**
 * External Functions
 */
function loadAll() {
  $("nav").fadeIn();
  $("main").fadeIn();

  // first time loading if DownloadingFile isn't called after some time
  setTimeout(function() {
    debug("Checking if first time loading.. " + downloadingFileCalled);
    if (downloadingFileCalled) {
      announce(
        "This is your first time loading please wait for the files to download",
        true
      );
    }
  }, 10000);
}

var images = [
            "https://cdn.discordapp.com/attachments/769967970943500318/1180791232767741972/image.png?ex=657eb487&is=656c3f87&hm=253e0a5b7b35cddb97564c057a892da50d6c9957a2c944ae37831811956d1e29&",
            // "https://media.tenor.com/xoTcPL3Jzm8AAAAd/gachi.gif",
            "https://media.discordapp.net/attachments/769967970943500318/1180803068896489563/20231203115315_1.jpg?ex=657ebf8d&is=656c4a8d&hm=4ae5ada4377a80bfa6c04de3f86eb4238b1ddb11bfb5d354442062f723f5b2cf&=&format=webp&width=1336&height=768",
            "https://media.discordapp.net/attachments/769967970943500318/1180803069622095882/20231203115820_1.jpg?ex=657ebf8e&is=656c4a8e&hm=70819ae99f06a3697756f73e962a9483a5743df846c254819a364545a4176eec&=&format=webp&width=1336&height=768",
            "https://media.discordapp.net/attachments/769967970943500318/1180803069961842738/20231203120206_1.jpg?ex=657ebf8e&is=656c4a8e&hm=cfa5510eba4f0396aa454f673920a141b85f51ca32ef4779c9cee44757bd5172&=&format=webp&width=1336&height=768",
            "https://media.discordapp.net/attachments/769967970943500318/1180803070754558042/20231203120158_1.jpg?ex=657ebf8e&is=656c4a8e&hm=974caac340045d5ae6b6e6fb477b8de6b788b83574647c4de2199fbadc97096f&=&format=webp&width=1336&height=768",
            // Добавьте дополнительные ссылки сюда
        ];

function loadBackground() {
  
  var imageElement =  document.querySelector(".background");
      var link
      $(".background").css("background-image", 'url("' + link + '")');
      $(".background").css("opacity", imageElement.style.opacity);
    
        var index = 0;

        function changeImage() {
            imageElement.style.opacity = 0;
            

            setTimeout(function() {
                imageElement.style.backgroundImage = 'url("' + images[index] + '")';
                imageElement.style.opacity = 1;
                console.log(imageElement.style.backgroundImage);
                index = (index + 1) % images.length;
            }, 500);
        }

  setInterval(changeImage, 3000);
}


function setLoad(percentage) {
  debug(percentage + "%");
  $(".overhaul").css("left", percentage + "%");
}
var permanent = false;
function announce(message, ispermanent) {
  if (Config.enableAnnouncements && !permanent) {
    $("#announcement").hide();
    $("#announcement").html(message);
    $("#announcement").fadeIn();
  }
  if (ispermanent) {
    permanent = true;
  }
}
function debug(message) {
  if (Config.enableDebug) {
    console.log(message);
    $("#debug").prepend(message + "<br>");
  }
}

/**
 * Initial function
 */
$(document).ready(function() {
  // load everything in when ready
  loadBackground();

  // print announcement messages every few seconds
  if (
    Config.announceMessages &&
    Config.enableAnnouncements &&
    Config.announcementLength
  ) {
    if (Config.announceMessages.length > 0) {
      var i = 0;
      setInterval(function() {
        announce(Config.announceMessages[i]);
        i++;
        if (i > Config.announceMessages.length - 1) {
          i = 0;
        }
      }, Config.announcementLength);
    }
  }

  // if it isn't loaded by gmod load manually
  setTimeout(function() {
    if (!isGmod) {
      debug("No Garry's mod testing..");
      isTest = true;
      loadAll();

      GameDetails(
        "Servername",
        "Serverurl",
        "Mapname",
        "Maxplayers",
        "SteamID",
        "Gamemode"
      );

      var totalTestFiles = 100;
      SetFilesTotal(totalTestFiles);

      var needed = totalTestFiles;
      setInterval(function() {
        if (needed > 0) {
          needed = needed - 1;
          SetFilesNeeded(needed);
          DownloadingFile("Filename " + needed);
        }
      }, 500);

      SetStatusChanged("Testing..");
    }
  }, 1000);
});
