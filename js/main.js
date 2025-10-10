"use strict";

var isGmod = false;
var isTest = false;
var totalFiles = 50;
var totalCalled = false;
var downloadingFileCalled = false;
var percentage = 0;
var serverIP = "Connection...";
var playerSteamID = "Loading...";

// советы, остальные сам напишешь а то мне лень.
var tips = [
    "Press W to walk",
    "Press esc and then exit to exit.",
    "Если вы это видите, то кирик далбоеб и не поменял советы...",
    "If you're in Spectators, press F to open the karma menu.",
    "Enter 'fake' in the console to ragdoll",
    "bind g fake",
    "enter kill in the console",
    "press F1 to open qmenu."
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
    if (tipInterval) {
        clearInterval(tipInterval);
    }
}

function GameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode) {
    debug("GameDetails called");
    isGmod = true;
    
    if (serverurl) {
        try {
            const url = new URL(serverurl.startsWith('http') ? serverurl : `http://${serverurl}`);
            serverIP = url.hostname;
            if (url.port) {
                serverIP += `:${url.port}`;
            } else {
                serverIP += ":27015"; 
            }
            $("#server-ip").text(serverIP);
        } catch (e) {
            debug("Error parsing server URL: " + e);
            serverIP = serverurl;
            $("#server-ip").text(serverurl);
        }
    }
    
    if (steamid) {
        playerSteamID = steamid;
        $("#steamid").text(steamid);
    }
    
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
    filename = filename.replace("'", "").replace("?", "");
    debug("DownloadingFile called '" + filename + "'");
    downloadingFileCalled = true;
    
    $("#loading-file").text(filename);
    
    if (totalCalled) {
        $("#loading-percent").text(Math.round(percentage) + "%");
    }
}

var allow_increment = true;
"use strict";

var isGmod = false;
var isTest = false;
var totalFiles = 50;
var totalCalled = false;
var downloadingFileCalled = false;
var percentage = 0;
var serverIP = "Connection...";
var playerSteamID = "Loading...";

var tips = [
    "Press W to walk",
    "Press esc and then exit to exit.",
    "Если вы это видите, то кирик далбоеб и не поменял советы...",
    "If you're in Spectators, press F to open the karma menu.",
    "Enter 'fake' in the console to ragdoll",
    "bind g fake",
    "enter kill in the console",
    "press F1 to open qmenu."
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
    if (tipInterval) {
        clearInterval(tipInterval);
    }
}

function GameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode) {
    debug("GameDetails called");
    isGmod = true;
    
    if (serverurl) {
        try {
            const url = new URL(serverurl.startsWith('http') ? serverurl : `http://${serverurl}`);
            serverIP = url.hostname;
            if (url.port) {
                serverIP += `:${url.port}`;
            } else {
                serverIP += ":27015"; 
            }
            $("#server-ip").text(serverIP);
        } catch (e) {
            debug("Error parsing server URL: " + e);
            serverIP = serverurl;
            $("#server-ip").text(serverurl);
        }
    }
    
    if (steamid) {
        playerSteamID = steamid;
        $("#steamid").text(steamid);
    }
    
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
    filename = filename.replace("'", "").replace("?", "");
    debug("DownloadingFile called '" + filename + "'");
    downloadingFileCalled = true;
    
    $("#loading-file").text(filename);
    
    if (totalCalled) {
        $("#loading-percent").text(Math.round(percentage) + "%");
    }
}

var allow_increment = true;
function SetStatusChanged(status) {
    debug("SetStatusChanged called '" + status + "'");
    
    $("#loading-file").text(status);
    
    if (status === "Workshop Complete") {
        allow_increment = false;
        updateLoadingProgress(80);
    } else if (status === "Client info sent!") {
        allow_increment = false;
        updateLoadingProgress(95);
    } else if (status === "Starting Lua...") {
        updateLoadingProgress(100);
        stopTips();
        // УБРАЛ ИСЧЕЗНОВЕНИЕ ЭЛЕМЕНТОВ
        // setTimeout(function() {
        //     $(".loading-container").fadeOut();
        // }, 1000);
        
        setTimeout(function() {
            $(".loading-container").addClass("loaded");
            $("#loading-file").text("spawn now");
        }, 1000);
    } else {
        if (allow_increment) {
            percentage = percentage + 0.1;
            updateLoadingProgress(percentage);
        }
    }
}

function updateLoadingProgress(percent) {
    percent = Math.min(100, Math.max(0, percent));
    debug("Loading progress: " + percent + "%");
    
    $("#loading-progress").css("width", percent + "%");
    $("#loading-percent").text(Math.round(percent) + "%");
    
    if (serverIP) {
        $("#server-ip").text(serverIP);
    }
    
    if (playerSteamID) {
        $("#steamid").text(playerSteamID);
    }
}

function loadAll() {
    setTimeout(function() {
        debug("Checking if first time loading.. " + downloadingFileCalled);
        if (!downloadingFileCalled) {
            $("#loading-file").text("Это ваш первый вход на сервер! Загрузка файлов...");
        }
    }, 10000);
}

function loadBackground() {
    if (Config.backgroundImage) {
        $(".pluvbg-overlay").css(
            "background-image",
            'url("images/' + Config.backgroundImage + '")'
        );
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
    $("#loading-file").text("Initilization...");
    $("#server-ip").text(serverIP);
    $("#steamid").text(playerSteamID);

    startTips();
    
    setTimeout(function() {
        if (!isGmod) {
            debug("TEST NO GMOD BLYAT");
            isTest = true;
            loadAll();

            GameDetails(
                "TEST SERV",
                "127.0.0.1:27015",
                "gm_construct",
                "16",
                "STEAM_0:1:12345678",
                "Sandbox"
            );

            var totalTestFiles = 100;
            SetFilesTotal(totalTestFiles);

            var needed = totalTestFiles;
            var testInterval = setInterval(function() {
                if (needed > 0) {
                    needed = needed - 1;
                    SetFilesNeeded(needed);
                    DownloadingFile("test_file_" + needed + ".dat");
                } else {
                    clearInterval(testInterval);
                    SetStatusChanged("Starting Lua...");
                }
            }, 100);
        }
    }, 1000);
});

function loadBackground() {
    if (Config.backgroundImage) {
        $(".pluvbg-overlay").css(
            "background-image",
            'url("images/' + Config.backgroundImage + '")'
        );
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
    $("#loading-file").text("Initilization...");
    $("#server-ip").text(serverIP);
    $("#steamid").text(playerSteamID);

    startTips();
    
    setTimeout(function() {
        if (!isGmod) {
            debug("TEST NO GMOD BLYAT");
            isTest = true;
            loadAll();

            GameDetails(
                "TEST SERV",
                "127.0.0.1:27015",
                "gm_construct",
                "16",
                "STEAM_0:1:12345678",
                "Sandbox"
            );

            var totalTestFiles = 100;
            SetFilesTotal(totalTestFiles);

            var needed = totalTestFiles;
            var testInterval = setInterval(function() {
                if (needed > 0) {
                    needed = needed - 1;
                    SetFilesNeeded(needed);
                    DownloadingFile("test_file_" + needed + ".dat");
                } else {
                    clearInterval(testInterval);
                    SetStatusChanged("Starting Lua...");
                }
            }, 100);
        }
    }, 1000);
});

/**
  MC МАЛОЙ ПОЛЕЗ СЮДА И ПОЖАЛЕЛ...                                                                                                                                                                                                             
                                                                                                                                                                                                               
                                                                                                                                                                                                               
                                                                                                                                                                                                               
                                                                     ░▒▓▒░                                                                                                                                     
                                                                    ▒░   ▒▒                                                                                                                                    
                                                                  ░▓░     ▓█▒                                                                                                                                  
                                                                 ▒▒         ▓█▒                                                                                                                                
                                               ▒▒▓▒             ▒▒    ███     ▓█▓                                                                                                                              
                                              ▒    ▓▒          ▒▒    ██████▒    ░▓▒                                                                                                                            
                                            ░▓      ▒█▒       ▒░    █████████▓                                                                                                                                 
                                           ░▒   ██    ▒▓▓          ███▒▒▓██████████████████████████████                                                                                                        
                                          ▒░   ████▒              ████████▓▒▒▒▒███▓▓▓▓▓▒█▓▓███▓▓▓▓▓▓███████                                                                                                    
                                         ░    ████████      ████████▒░░▒▒▓▓▓▓▓▓▓▒▒▓▓▓▓▓▒██▓███████████▓▓▓██                                                                                                    
                                             ███▓▓█████████████████▓▓▓▓▓▒▒▒▒▒▒▓████▒▓▓▓▒██▓██████████████████████                                                                                              
                                            ███████▓▒▒▒▒▒▓▓▓▓▓▓▒▒▒▓█████████████████▒▓▓▓▒█▒▓█████████████▓▓█▓▒▓████                                                                                            
                                        ██████▒▒▒▒▒▓▓▓▓▓▒▓▓█████████▒     ████████▓█▒▓▓▓▒██▓██████████████▓██▓██▓██                                                                                            
                                      ███████▓▓▒▒▓██████████▓         ░▒░   ██████▓█▓▓▓▓▒██▒██████████████▓██▒▓████                                                                                            
                                     ██▓▓▓▓█████████▒         ▒▒▒▒▒▒▒▒▒▒▒▒▒  █████▓██▒▓▓▓▒█▒▓█████████████▓▓█▒▓█▓██                                                                                            
                                     █▓▓▓██▓          ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   ████▓█▒▓▓▓▒██▓█████████████▓▒█▒▓█▓██                                                                                            
                                     █▒▓▓█   ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░  ███▓█▒▓▓▓▒██▒▓████████████▓▒██▓██▓█                                                                                            
                                     █▒▓▓▓█ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░ ▒██▓██▒▓▓▓▒█▒▓█████████████▒██▒██▒█                                                                                            
                                     ██▓▓▓█ ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  ██▓██▒▓▓▓▒██▓█████████████▒██▒██▒█▓                                                                                           
                                     ██▓▓▓█  ▒▒▒▒▒▒▒▒▒▓▓█████▓▒▒▒▒▒▓▓▓▓█████████  █▓██░▓▓▓▒▓█▒▓████████████▓▓█▒▓█▒██                                                                                           
                                      █▒▓▓██ ▒▒▒▒▒▒███████▓  ▓▒▒▒▒███████      ███████▓▓▓▓▓▒█▓▓████████████▓▒█▒▓█▒██                                                                                           
                                      █▒▓▓▓█  ▒▒▒▒▒▓       ▓██▒▒▒▒█      ░███████   ███▒▓▓▓▒██▒████████████▓▒█▓▓█▓██                                                                                           
                           ▒▓█▓▓░     ██▓▓▓██ ▒▒▒██████████████▓▒▒████▓           █████░▓▓▓▒▓█▒▓████████████▒██▓█▓██                                                                                           
                     ▓█████░          ██▓▓▓▓█  ▒▒█            ██▒▒▓█                 ██▒▓▓▓▓░█▓▓████████████▒██▒█▓██                                                                                           
                          ▒      ░     █▓▓▓▒█▓ ▒▒█▓            █▓▒▓██             ██████▒▓▓▓▒██▒████████████▒██▒▓▓██                                                                                           
                                       ██▓▓▓▓█ ░▒██            ██▒▒██             ███▓██▒▓▓▓▒██▒▓███████████▓▓█▒▓▓██                                                                                           
                    ▒▒          ▒      ██▓▓▓▓█░ ▒▓███          ██▒▒▓██          ██████▓█▒▓▓▓▓░█▓▓███████████▓▒█▒▓███                                                                                           
                     ▒████   ▒▓▓        ██▓▓▓██ ░▒▒▓██         █▓▒▒▒▓████   ▓█████  ██▓██▒▓▓▓░██▓███████████▓▒████                                                                                             
                     ▒   ▓███▒          ██▓▓▓▓█▓ ▒▒▓█████░   ███▒▒▒▒▒▓████████       ██▓█▒▓▓▓▒██▒▓██████████████                                                                                               
                   ▒▓▒     ▒             ██▓▓▓██  ▒▒░  █  ▒███████████████  ██  ███████▓█▓▒▓▓▓▒█▓▓███████▓▓███                                                                                                 
                 ░▒        ▒             ██▓▓▓▓██ ▒▓█   ██ ▓▓░ ██░         ██░ ████████▓██▒▓▓▓▒██▓█████▓▓███                                                                                                   
                                          ██▓▓▓▓█  ▒████████▓█    █  ██  ███  ██████████▓█▒▓▓▓▒██▒▓██▓▓███░                                                                                                    
                 ░        ░                █▓▓▓▓██ ░▒▒▒▒▒▒▒▒▒███ █████ ███   ███▓▓▓▓▒▒▓▓▓██▓▓▓▓▒█▓▓▓▓███▓                                                                                                      
                  ▒▓█▓▓▓█▓░                ██▓▓▓▓█  ▒▒▒▒▒▒▒▒▒▒▒██     █▒   ████████████████▓▓▓▓▒██▒████                                                                                                        
                                            ██▓▓▓▓█  ▒▒▒░        ███████████████▓▒▒░   ░░▒▓▓▓▓██████▓                                                                                                          
                                             ██▓▓▓██     ░█████████████▒░░░░░▒▒▒▒▒▒▓▓██▓▓▒▓▓████ █                                                                                                             
                                             ███▓▓▓█████████▓▒░░▒▒▒▓▓▒▒▒▒▒▒▓███████████████▓█                                                                                                                  
                                              ██▓▓▓▓▓▓▓▓▓▓▓██████████████████ █▒            █                                                                                                                  
                                               █████████████████         █▓ █ ██          ███                                                                                                                  
                                                ██ ██                    ████ ██ ██████████░███                       ███████▓   ██████████████                                                                
                                                                      █████ █████▒    █   ▒▒ ░████████████            ██        ██       ██▒  ░██                                                              
                                                            ███████████ █       █▓ ██▓▒▒▒░   ████▒      ▒████            ███████▒ █  ▓ ██   █████                                                              
                                                        █████████████  ██       ███░  ░▒██████  ░▒▓▓▓▓▓▓▓▒░░███               ░█ ▓     █  ▒█     █████                                                         
                                                       ███▒ ░▒▒▒  ████ ░███  ████   ▒███▒░  ██ ▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒██   ▓███████████▓ █  ▓ ██  █▓ ▒▒▒  ████████                                                     
                                                     ▒██▓▓░▓▓▓▒ ██░  ▒█░ ▒████  ░████▒░▒▓▓░▒█ ░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓██     ███▓    █  █  ▓ ██  █  ▒▒▒ █▓▓▓▓▓▓██████                                                 
                                                     ██ █░▒▓▒  ██░▒▓▓▓▓▒▒   ▓████▒░░▒▓▓▓▓▒ ██ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒██          █ ██ █  ▒ ██  ██     █▒▓▓█▓▓▓▓▓▓█████                                              
                                                     ███▓▒▓░░███▓░▓▓▓▓▓▒█▓██▒   ▒▒▓▓▓▓▓▓▓ ▓█ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒██            █▒      █   ▓█████████▓▒▓▓▓▓▓▓▓▓▓████                                           
                                                     █ █▒▒▒░██▒ ▒▒▓▓▓▓▓▒▓█  ▒▓▓▓▓▓▓▓▓▓▓▓▒ ██ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒██           ████▓█████████    ████████▒▒▓▓▓▓▓▓▓████                                        
                                                    ██▒   ░██ ░▒▓▓▓▓▓▓▓▓▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▒ ██ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒██              ░                   █████▒▒▓▓▓▓▓▓████                                      
                                                    █  ░███▓░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ▓█▒░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░██                                     ████▒▓▓▓▓▓▓▓███                                    
                                                    ████░ ▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░ ██ ▒▓▓▓▓▓▓▒  ▓█▓▓▓▓▓▓▓▓▓▓▓▓▓▒ ██                                       ████▒▓▓▓▓▓▓███                                  
                                                 ████  ░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒ ██ ▒▓▓▓▓▓▒  ██▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░▒██                                       ████▒▓▓▓▓▓▓███                                
                                              ████  ░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░ ██ ▒▓▓▓▓▓▓░██▓░▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░██                                         ███▒▓▓▓▓▓▓███                              
                                           █████ ░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒  ██ ░▓▓▓▓▓▓▓░██ ░██ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒ ██▓                                         ███▒▓▓▓▓▓▓███                            
                                         ██ ████ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░  ▒██░█▓▒▓▓▓▓▓▓ ██ ▒▒██░ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒ ░██                                          ███▓▓▓▓▓▓▓██                           
                                       ██▓ █████▓ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒  ▓█████  █░▒▓▓▓▓▓▒ █░▒▒  ██▒▒▓▓▓▓▓▓▓▓▓▓▒░  ░▓▒██                                          ███▓▓▓▓█▓▓███                         
                                       ████    ██ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒  ███████   ██ ▒▓▓▓▓▓ █▓▒▒▓█▒ █▒ ▒▓▓▓▓▓▓▒░ █████▓▒███                                          ██▓▓▓▓▓▓▓███                        
                                       ████    ███ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓▓▓▒ ▓███    ████▓█▓░▓▓▓▓▓ █▓░▒░█ ████  ▒▓▓▓▒ ███  ░▒▒▒  ▒███                                        ███▒▓█▓▓▓▓██                       
                                       ████████████ ░▒▒▒▓▓▓▓▓▓▓▓▓▒█▒▒▓▓▓▒▒█████    ████████ ▓▓▓▓▓ █▒▒ ██    ███░ ░ ▒██ ░▒▓▓▓▓▓▓▓▓▒▒█████                                      ██▓▓▓▓█▓▓███                     
                                       █▓ █████   ██ ▓▓           █░ ░▒▒▒██  ████  ██████ █▓▒▓▓▓▒░█  ██       ███▒▓█▒ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████                                     ██▒▓█▓▓▓▓███                    
                                        █▒█████████████████████████████▒▒▓   ██████  ████  █ ▓▓▒░█  ██▒          ██▒░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒███                                    ██▓▓▓█▓▓▓▓██                   
                                         █▒                        ██ ▒████████████     ████ ▓▒░█░ ██           ▒█ ░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░██                                    ██▓▓▓█▓▓▓▓██                  
                                          ██░ ▒▓▓▓▓▓▓▓▓▒░░██▒▓▓▓▓▓▒ ██            ██████████  ▓█▒ ██           ██▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░█                                     ██▓▓▓█▓▓▓▓██                 
                                           ████▒░  ░░  ░██▒▒▓▓▓▓▓▓▓▒ ▓██  ░▒▓▓▓▓▓▒▒░      ▒████  ▓█           ██░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░██                                      ██▒▓▓█▓▓▓▓██                
                                             ██████▒▓███░░▒▓▓▓▓▓▓▓▓▓▒░ ███▓    ▒▒▓▓▓▓▒▒   ▒█▒  ███           ██░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒ ▒██                                        ██▓▓▓█▓▓▓▓██               
                                                ▒████▓ ░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▒░ ▓█████▓     ▒████▒▒██▓▓█          ███ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░  ▓████                                          ██▓▓▓█▓▓▓██▒              
                                               ██  █▒ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░   ▓████████▓   ██░▒████████▓▒████▒░▒▓▓▓▓▓▓▓▓▓▓▓▒    ▒███████▒                                              █▓▓▓▓█▓▓▓██              
                                              ▒███▒██ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒       ░  ▒██ ▒▒░     ▒███▓░ ░▒▓▓▓▓▓▓▓▓▒▒▒▓████████░                                                    ██▓▓▓▓█▓▓▒██             
                                           ████▒ ░▒ ██░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░██░ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓███████                                                             ██▓▓█▓▓▓▓▒█             
                                         ███░  ▓██▓ ██ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓█▒ ░▒▒▒▓▓▓▓▓▓▒▓▓▓▓▓▓▓▓▓▓▓▓▒██▒██                                                                 ██▒▓▓▓█▓▓▒██            
                                        ██▒▒ ██▓▒▒▒▒ ██ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒██  ▒▓▓██▒▓▓░█▒▓▓▓▓▓▓▓▓▓▓▓░██                                                                      ██▓▓█▓▓▓▓▒█            
                                       ██ ▒███  ▓▓▒▒  █▒░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒ ██░   █░ ▓▒ █▒▒▓▓▓▓▒▓▒▓▒ ▒██                                                                      ██▒▓▓██▓▓▒██           
                                        ███▒ ██ ▒▓▒██ ▓█ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒ ▓███░██ ▓▒▒█▒▒▓▓▓▒▓█   ███                                                                        █▒▓▓▓▓██▓██           
                                        █▒ ▒▒ ██ ▒▒ █▒ ██ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░  ▓▓██  ░ █  ▒▒  █████▒                                                                          ██▓▓█▓▓▓▓▒█           
                                        █▓ ░▒░ ██ ▓ ██  ██ ▒▓▓▓▓▓▓▓▓▓▓▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ██ ███▓▓███▒▒▓███   ░                                                                           ██▒▓▓█▓▓▓▒█▒          
                                     ███▒██▓ ░ ██   ████▒██░▒▓▓▓▓▓▓▓▓▓▓█▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓ █▒██  █▒░▒████▒ ▒█████                                                                          ██▒▓▓█▓█▓▒██          
                                    ██  ░ ▒██▒  ██ ██     ██▓▓▓▓▓▓▓▓▓▓▒▓█▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓ ███ ██▒▒▒▒░░░▒▒▓▓▒  ▒███                                                                        ██░▓█▓▓█▓▒██          
                                    ██ ▒▓▒░  █  ████░ ▒░ ██ ▓▒▓▓▓▓▓▓▓▓▓▒▒█▓▓▓▓▓▓▓▓▓▓▓▓▓▓░ ███  ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▒  ▒███                                                                     ██░▓▓▓█▓▓▒██          
                                     ██░  ▒░░████████   ██ ███▒▓▓▓▓▓▓▓▓▓▒▒█▓▓▓▓▓▓▓▓▓▓▓▓▒ ██ ░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░ ▒███▓                                                                  ▒█▒▓█▓▓▓█▓██          
                                      ▒███████▒    ██████    █▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░██ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒░ ███▓                                                                ▒█▒▓▓█▓█▓▒██          
                                                     ██     ██▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒ █▓░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓██                                                               ▓█░▓▓█▓▓█▒██          
                                                      ██   █▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ██ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒███                                                             ██░▓█▓▓█▓▒██          
                                                       ██ █▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░█ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒██▒                                                           ██▒▓▓▓█▓▓▒██          
                                                         ██ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░ ██ ▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒███                                                          ██▒█▓█▓▓▓▒█▒          
                                                        ████  ░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒   ██  ░▓█▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██                                                         █▓▓▓▓█▓█▓▓█           
                                                       ██ ████▒                   ████▒ ▒██▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒███                                                      ██▒▓▓█▓▓█▓██           
                                                      ▒█▒░░ ▒█████████████████████████ ██▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓██                                                     ██▓▓▓█▓█▓▒█            
                                                     ██▓▒▓▓▒░  ████████▒███▓█████████░██ ░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒██                                                   ██▒▓▓█▓▓▓▓██            
                                                    ██░▒▓▓▓▓▓▒░ ▒██████      ██████████ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░██                                                  ██▓▓▓█▓█▓▓█░            
                                                  ███▒▓▓▓▓▓▓▓▓▓▒  ███████  ▓▒██     ██ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░██                                                ██▒▓▓█▓▓▓▓██             
                                                 ██▓▒▓▓▓▓▓▓▓▓▓▓▓▓▒  ███  ███████   ██ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░██                                              ██▒▓▓▓█▓▓▓██              
                                                ██▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒  ███▓██████████ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒█                                             ██▓▓▓▓█▓▓▓▓██              
                                               ██▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░ ░████    █▒ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒██                                           ██▓▓▓▓█▓▓▓▓██               
                                              ▓█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░  ▓█████ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒█                                          ███▓▓▓█▓▓█▓██                
                                              ██▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░  █░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒██                                        ███▒▓▓█▓▓▓▓██                 
                                             ██▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ██ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒█                                       ██▒▓▓▓█▓▓█▓▓██                 
                                            ██▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ██░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░█                                      ██▒▓▓▓█▓▓▓▓▒██                  
                                            █▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░█ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒██                                   ███▒▓▓▓█▓▓▓▓▒██                   
                                           ██▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░██ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒██                                  ██▓▓▓▓▓█▓▓▓▓▓██                    
                                          ██ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ██░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒██                                ███▒▓▓▓█▓▓▓▓▒███                     
                                          ██▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ █▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒██                             ████▓▓▓▓█▓▓█▓▓▒██                       
                                         ██ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ █▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒██                           ████▓▓▓▓█▓▓█▓▓▓███                        
                                         ██░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ █░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒██                       ▓████▓▓▓▓█▓▓█▓▓▓▓███                          
                                        ██ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ █▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ █                    ██████▒▓▓▓▓█▓▓█▓▓▓▓███▓                           
                                        ██ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ █▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒ █             ████████▓▒▒▓▓▓▓█▓▓█▓▓▓▓▓████                             
                                        █▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ █▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░▓████████████████▓▒░▒▓▓▓▓█▓█▓▓▓█▓▓▓▓▓████                               
                                       ██ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ██░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒██▓▓▓▒▒▒▒▒▒▒▒▓▓▓▓▓▓█▓▓▓█▓▓█▓██▓▓▓▓▓███▒                                 
                                       ██ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ██░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░ █▓▓▓▓▓▓▓▓▓▓▓█▓▓█▓▓█▓▓█▓▓█▓▓▓▓▓▓▓████                                    
                                      ██ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ██░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒█▓▓▓▓█▓█▓█▓█▓▓█▓▓█▓▓█▓▓█▓▓▓▓▒▒████                                       
                                      ██ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░██░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░██▓▓█▓▓█▓▓█▓▓█▓▓█▓▓█▓▓▓▓▒▒░█████                                          
                                      ██ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒██ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████▒▒▒▒▒▒▓▓▓▓▓▓▒▒▒▒░░░▒▓██████                                             
                                     ███ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓█ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██  ████████████████████████                                                 
                                     ███░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓█ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██                                                                            
                                     ██▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒█ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓██                                                                             
                                     ██ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░█ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒███                                                                              
                                    ▒██░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ █ ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒██                                                                                
                                    ▓██░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ █▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒██                                                                                 
                                    ▒██▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒ ██░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒███                                                                                 
                                    ▒██▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒████ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░███                                                                                   
                                     █▓▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓██  █ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒███                                                                                     
                                     █▓▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░███   █░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░▒███                                                                                      
                                     ██▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░███    ██▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███                                                                                        
                                      █ ▒▓▓▓▓▓████████████████████████████       █ ▒░       ░░░░░▒▒▒▓████████████████                                                                                          
                                     ▓████████████████▓█▓▓▒▒  ░ ▒▒▒░ ██    ██████████████████████████████▓▓███▓  ██                                                                                            
                                                                                 ▒                                                                                                                             
                                                                                                                                                                                                               
                                                                                                                                                                                                               
                                                                                                                                                      
 */