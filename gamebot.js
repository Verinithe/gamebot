var Discord = require("discord.js");
var bot = new Discord.Client();
var auth = require("./auth.json");
var username = "Kamov"; // Discord username


    bot.on("message", (msg) => {
        if (msg.author.name == "DiscordRPG") {
            if (msg.content.indexOf(username) > 0) {
                if (msg.content.indexOf("stats") > 0) {
                    interpretStats(msg.channel, msg.content);
                } else if (msg.content.indexOf("adventure") > 0) {
                    interpretAdventure(msg.channel, msg.content);
                }
            }
        }
    });
	
    bot.on("ready", (msg) => {
        console.log("Ready");
    });

    bot.login(auth.Mail, auth.Pass);

    var interpretStats = function (chan, message) {
        console.log("Interpreting stats");

        var poia1 = message.indexOf("Health:");
        var poia2 = message.indexOf("/");
        var health = message.substring(poia1 + 7, poia2).trim();
        console.log(username + " has " + health + " health points");

        var poib1 = message.indexOf("|");
        var poib2 = message.indexOf("Gold");
        var gold = message.substring(poib1 + 1, poib2).trim();
        console.log(username + " has " + gold + " gold");

        if (message.indexOf("Health Potion") > 0) {
            var poib1 = message.indexOf("Items:");
            var poib2 = message.indexOf("x Health Potion");
            var HP = message.substring(poib1 + 6, poib2).trim();
        } else {
            var HP = 0;
        }
        console.log(username + " has " + HP + " health potions");

        bot.sendMessage(chan, "Stats detected:\nHealth: " + health + "\nGold: " + gold + "\nHP: " + HP);

        if (health > 8 && HP > 2) {
            console.log("Starting adventure");
            startAdventure(chan);
        } else if (health > 8 && HP <= 2) {
            console.log("Buying health potions");
            buyHP(chan);
            checkStats(chan);
        } else if (health < 8 && HP > 2) {
            console.log("Healing");
            heal(chan);
            checkStats(chan);
        } else if (health < 8 && HP <= 2) {
            console.log("Buying HP and healing");
            buyHP(chan);
            heal(chan);
            checkStats(chan);
        }
    };

    var interpretAdventure = function (chan, message) {

        console.log("Interpreting adventure.")

        if (message.indexOf("Rewards") > 0) {
            wonround = true;
            console.log("Won round.")
        } else {
            wonround = false;
        }

        var poia1 = message.indexOf(username + " has ");
        var poia2 = message.indexOf("/");
        var health = message.substring(poia1 + 10, poia2).trim();
        console.log(username + " has " + health + " health points");

        bot.sendMessage(chan, "Stats detected:\nHealth: " + health + "\nWon round: " + wonround);

        if (health < 8 && wonround == false) {
            console.log("Heal and continue");
            heal(chan);
            continueAdventure(chan);
        } else if (health > 8 && wonround == false) {
            console.log("Continue");
            continueAdventure(chan);
        } else if (wonround == true) {
            console.log("Checking stats");
            checkStats(chan);
        }
    };



    // COMMANDS BELOW

var checkStats = function (chan) {
        setTimeout(function () {
            bot.sendMessage(chan, "#!stats");
        }, 10000)
    };

    var buyHP = function (chan) {
        bot.sendMessage(chan, "#!buy Health Potion");
    };

    var heal = function (chan) {
        bot.sendMessage(chan, "#!heal");
    };

    var startAdventure = function (chan) {
        setTimeout(function () {
            bot.sendMessage(chan, "#!adventure");
        }, 5000)
    };

    var abandonAdventure = function (chan) {
        setTimeout(function () {
            bot.sendMessage(chan, "#!adventure 1");
        }, 5000)
    };

    var continueAdventure = function (chan) {
        setTimeout(function () {
            bot.sendMessage(chan, "#!adventure 2");
        }, 5000)
    };
