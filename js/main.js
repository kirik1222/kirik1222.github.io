"use strict";

var isGmod = false;
var isTest = false;
var totalFiles = 50;
var totalCalled = false;
var downloadingFileCalled = false;
var percentage = 0;
var serverIP = "185.97.255.43:22894";
var playerSteamID = "Сидед пидорас настоящий Z-BOX";

// Полностью заменённые советы
var tips = [
    "Сидед пидорас настоящий Z-BOX Ip - 185.97.255.43:22894",
    "Сидед пидорас настоящий Z-BOX Ip - 185.97.255.43:22894",
    "Сидед пидорас настоящий Z-BOX Ip - 185.97.255.43:22894",
    "Сидед пидорас настоящий Z-BOX Ip - 185.97.255.43:22894",
    "Сидед пидорас настоящий Z-BOX Ip - 185.97.255.43:22894",
    "Сидед пидорас настоящий Z-BOX Ip - 185.97.255.43:22894",
    "Сидед пидорас настоящий Z-BOX Ip - 185.97.255.43:22894",
    "Сидед пидорас настоящий Z-BOX Ip - 185.97.255.43:22894"
];

var currentTipIndex = 0;
var tipInterval;

function startTips() {
    showNextTip();
    tipInterval = setInterval(showNextTip, 5000);
}

function showNextTip() {
    var tipElement = document.getElementById('current-tip');
    tipElement.classList.remove('active');
    tipElement.classList.add('fade-out');
    setTimeout(function() {
        currentTipIndex = (currentTipIndex + 1) % tips.length;
        tipElement.textContent = tips[currentTipIndex];
        tipElement.classList.remove('fade-out');
        tipElement.classList.add('active');
    }, 500);
}

function stopTips() {
    if (tipInterval) clearInterval(tipInterval);
}

function GameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode) {
    debug("GameDetails called");
    isGmod = true;

    // Принудительно задаём IP
    serverIP = "185.97.255.43:22894";
    $("#server-ip").text("Сидед пидорас настоящий Z-BOX Ip - 185.97.255.43:22894");

    if (steamid) {
        playerSteamID = steamid;
        $("#steamid").text("Сидед пидорас настоящий Z-BOX");
    }

    if (!isTest) {
        loadAll();
    }

    // Всегда показываем наше название
    $("#title").html("Сидед пидорас настоящий Z-BOX Ip - 185.97.255.43:22894").fadeIn();

    if (Config.enableMap) {
        $("#map").append(mapname).fadeIn();
    } else {
        $("#map").hide();
    }
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
        updateLoadingProgress(sPercentage);
    }
}

function DownloadingFile(filename) {
    filename = "Сидед пидорас настоящий Z-BOX Ip - 185.97.255.43:22894";
    debug("DownloadingFile forced to custom text");
    downloadingFileCalled = true;
    $("#loading-file").text(filename);
    if (totalCalled) {
        $("#loading-percent").text(Math.round(percentage) + "%");
    }
}

var allow_increment = true;

function SetStatusChanged(status) {
    debug("SetStatusChanged called: " + status);

    if (status === "Starting Lua...") {
        updateLoadingProgress(100);
        stopTips();
        setTimeout(function() {
            $(".loading-container").addClass("loaded");
            $("#loading-file").text("Сидед пидорас настоящий Z-BOX Ip - 185.97.255.43:22894");
        }, 1000);
    } else {
        $("#loading-file").text("Сидед пидорас настоящий Z-BOX Ip - 185.97.255.43:22894");
        if (allow_increment) {
            percentage = Math.min(100, percentage + 0.1);
            updateLoadingProgress(percentage);
        }
    }
}

function updateLoadingProgress(percent) {
    percent = Math.min(100, Math.max(0, percent));
    debug("Loading progress: " + percent + "%");
    $("#loading-progress").css("width", percent + "%");
    $("#loading-percent").text(Math.round(percent) + "%");
    $("#server-ip").text("Сидед пидорас настоящий Z-BOX Ip - 185.97.255.43:22894");
    $("#steamid").text("Сидед пидорас настоящий Z-BOX");
}

function loadAll() {
    setTimeout(function() {
        if (!downloadingFileCalled) {
            $("#loading-file").text("Сидед пидорас настоящий Z-BOX Ip - 185.97.255.43:22894");
        }
    }, 10000);
}

function loadBackground() {
    if (Config.backgroundImage) {
        $(".pluvbg-overlay").css("background-image", 'url("images/' + Config.backgroundImage + '")');
    }
}

function announce(message, ispermanent) {
    if (Config.enableAnnouncements) {
        console.log("ANNOUNCEMENT: " + message);
    }
}

function debug(message) {
    if (Config.enableDebug) {
        console.log(message);
    }
}

$(document).ready(function() {
    updateLoadingProgress(0);
    $("#loading-file").text("Сидед пидорас настоящий Z-BOX Ip - 185.97.255.43:22894");
    $("#server-ip").text("Сидед пидорас настоящий Z-BOX Ip - 185.97.255.43:22894");
    $("#steamid").text("Сидед пидорас настоящий Z-BOX");

    startTips();

    setTimeout(function() {
        if (!isGmod) {
            isTest = true;
            GameDetails(
                "Сидед пидорас настоящий Z-BOX Ip - 185.97.255.43:22894",
                "185.97.255.43:22894",
                "zbox_map",
                "69",
                "STEAM_0:0:666666",
                "Z-BOX"
            );

            SetFilesTotal(100);
            var needed = 100;
            var testInterval = setInterval(function() {
                if (needed > 0) {
                    needed--;
                    SetFilesNeeded(needed);
                    DownloadingFile("");
                } else {
                    clearInterval(testInterval);
                    SetStatusChanged("Starting Lua...");
                }
            }, 50);
        }
    }, 1000);
});
