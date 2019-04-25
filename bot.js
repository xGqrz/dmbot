// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`+help`);
});

bot.on("guildMemberAdd", member => {
 
  const channel = member.guild.channels.find("name", "welkom-verlaat");
  if (!channel) console.log("Kan het kanaal niet vinden.");

  var joinEmbed = new discord.RichEmbed()
      .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
      .setDescription(`Hoi ${member.user.username}, Welkom bij: **MineBuildings**.`)
      .setColor("#00FF00")
      .setTimestamp()
      .setFooter("nieuwe klant.");

  channel.send(joinEmbed);

});

bot.on("guildMemberRemove", member => {
 
  const channel = member.guild.channels.find("name", "report");
  if (!channel) console.log("Kan het kanaal niet vinden.");

  var joinEmbed = new discord.RichEmbed()
      .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
      .setColor("#FF0000")
      .setTimestamp()
      .setFooter("Een klant gelaeved..");

  channel.send(joinEmbed);

});

// client.on("guildCreate", guild => {
//   // This event triggers when the bot joins a guild.
//   console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
//   client.user.setActivity(`Serving ${client.guilds.size} servers`);
// });

// client.on("guildDelete", guild => {
//   // this event triggers when the bot is removed from a guild.
//   console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
//   client.user.setActivity(`Serving ${client.guilds.size} servers`);
// });


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  if (command === "help") {
    let helpEmbed = new Discord.RichEmbed()

  
    .setAuthor(message.author.username)
    .setColor("#fc6400")
    .addField("+Help", "Voor dit menu.")
    .addField("+new","Om een ticket te openen.")
    .addField("+close","Om een ticket te sluiten.")
    .addField("+claims @naam", "Om te kijken hoevaak je al iets heb opgehaald.")
    .addField("+say", "Om de bot iets te laten zeggen.")
    .addField("+purge","Om berichten te verwijderen.")
    .addField("+ban","Om iemand te bannen.")
    .addField("+kick","Om iemand te kicken.")
    .addField("+warn","Om iemand te warnen.")
    .addField("+claim","om een claim op iemands naam te zeten.")
  
    message.channel.send(helpEmbed);
  }
  
  
  if (command === "warn") {

const Discord = require("discord.js");

const fs = require("fs");

let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

  //!warn @daeshan <reason>

  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Jij mag dit niet doen!");

  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])

  if(!wUser) return message.reply("Het is wel handig als je @naam doet he");

  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Oei jij mag deze gebruiker niet warnen");

  let reason = args.join(" ").slice(22);

  if(!reason) return message.reply("Geef wel een reden op Xd")

  if(!warns[wUser.id]) warns[wUser.id] = {

    warns: 0

  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {

    if (err) console.log(err)

  });

  let warnEmbed = new Discord.RichEmbed()

  .setDescription("Warns")

  .setAuthor(message.author.username)

  .setColor("#fc6400")

  .addField("Gewaarschuwde gebruiker:", `<@${wUser.id}>`)

  .addField("Gewarnd in:", message.channel)

  .addField("Aantal warnings:", warns[wUser.id].warns)

  .addField("Reden:", reason);

  message.channel.send(warnEmbed);

  if(warns[wUser.id].warns == 6){

    message.guild.member(wUser).ban(reason);

    message.reply(`<@${wUser.id}> has been banned.`)

  }

}
if (command === "claim") {

  const Discord = require("discord.js");
  
  const fs = require("fs");
  
  let claim = JSON.parse(fs.readFileSync("./claims.json", "utf8"));
  
    //!warn @daeshan <reason>
  
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Jij mag dit niet doen!");
  
    let cUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  
    if(!cUser) return message.reply("Het is wel handig als je @naam doet he");
  
    if(cUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Oei jij mag deze gebruiker niet claimen");

  
    if(!claim[cUser.id]) claim[cUser.id] = {
  
      claim: 0
  
    };

    claim[cUser.id].claim++;
  
    fs.writeFile("./claims.json", JSON.stringify(claim), (err) => {
  
      if (err) console.log(err)
  
    });
  
  
    let claimEmbed = new Discord.RichEmbed()
  
    .setDescription("Claims")
  
    .setAuthor(message.author.username)
  
    .setColor("#fc6400")
  
    .addField("Geclaimd voor:", `<@${cUser.id}>`)
  
    .addField("Aantal claims:", claim[cUser.id].claim)

    message.channel.send(claimEmbed);
  }
  if (command === "claims") {

    const Discord = require("discord.js");
    
    const fs = require("fs");
    
    let claim = JSON.parse(fs.readFileSync("./claims.json", "utf8"));
    
      //!warn @daeshan <reason>

      let cUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    
      if(!cUser) return message.reply("Het is wel handig als je @naam doet he");

      fs.writeFile("./claims.json", JSON.stringify(claim), (err) => {
    
        if (err) console.log(err)
    
      });
    


      let claimsEmbed = new Discord.RichEmbed()
    
      .setDescription("Claims")
    
      .setAuthor(message.author.username)
    
      .setColor("#fc6400")
    
      .addField("Claims van:", `<@${cUser.id}>`)
    
      .addField("Aantal claims:", claim[cUser.id].claim)

      message.channel.send(claimsEmbed);
    
    
    }
    
  if(command === "close") {
    const discord = require("discord.js");
  // Id van category van tickets.
      const categoryId = "570949923672162319";
 
      // Als bericht in ticket kanaal is dan verwijder kanaal ander zend bericht
      if (message.channel.parentID == categoryId) {
   
          message.channel.delete();
   
      } else {
   
          message.channel.send("Gelieve dit commando in een ticket kanaal te doen.");
   
      }
   
      var embedCloseTicket = new discord.RichEmbed()
          .setTitle("Hoi, " + message.channel.name)
          .setDescription("Je ticket is gemarkeerd als **compleet**. Wil je een nieuwe maken doe dan +new")
          .setFooter("ticket gesloten");
   
      // // Vind kanaal voor de logs.
      // var logChannel = message.guild.channels.find("name", "log");
      // if (!logChannel) return message.channel.send("Kanaal bestaat niet");
   
      logChannel.send(embedCloseTicket);
    }
  
  if(command === "new") {
    const discord = require("discord.js");
 

      // ID van de categorie van de tickets.
      const categoryId = "570949923672162319";
 
      // Verkrijg Gebruikersnaam
      var userName = message.author.username;
      // Verkrijg discriminator
      var userDiscriminator = message.author.discriminator;
   
      // Als ticket al gemaakt is
      var bool = false;
   
      // Kijk na als ticket al gemaakt is.
      message.guild.channels.forEach((channel) => {
   
          // Als ticket is gemaakt, zend bericht.
          if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {
   
              message.channel.send("Je hebt al een ticket aangemaakt");
   
              bool = true;
   
          }
   
      });
   
      // Als ticket return code.
      if (bool == true) return;
   
      var embedCreateTicket = new discord.RichEmbed()
          .setTitle("Hoi, " + message.author.username)
          .setFooter("Support kanaal wordt aangemaakt");
   
      message.channel.send(embedCreateTicket);
   
      // Maak kanaal en zet in juiste categorie.
      message.guild.createChannel(userName + "-" + userDiscriminator, "text").then((createdChan) => { // Maak kanaal
   
          createdChan.setParent(categoryId).then((settedParent) => { // Zet kanaal in category.
   
              // Zet perms voor iedereen
              settedParent.overwritePermissions(message.guild.roles.find('name', "@everyone"), { "READ_MESSAGES": false });
              // Zet perms voor de gebruiker die ticket heeft aangemaakt.
              settedParent.overwritePermissions(message.author, {
   
                  "READ_MESSAGES": true, "SEND_MESSAGES": true,
                  "ATTACH_FILES": true, "CONNECT": true,
                  "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true
   
              });
              settedParent.overwritePermissions(message.guild.roles.find('name', "TeamPerms"), {
   
                "READ_MESSAGES": true, "SEND_MESSAGES": true,
                "ATTACH_FILES": true, "CONNECT": true,
                "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true
 
            });
 
   
              var embedParent = new discord.RichEmbed()
                  .setTitle("Hoi, " + message.author.username.toString())
                  .setDescription("Zet hier je vraag/bericht");
   
              settedParent.send(embedParent);
          }).catch(err => {
              message.channel.send("Er is iets fout gelopen.");
          });
   
      }).catch(err => {
          message.channel.send("Er is iets fout gelopen.");
      });
    }


  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  
  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["TeamPerms"].includes(r.name)) )
      return message.reply("Sorry, jij mag dit niet doen!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Het is wel handig als je een naam opgeeft zoals @naam Xd");
    if(!member.kickable) 
      return message.reply("Ik kan deze gebruiker niet kicken mijn rol is te laag!");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Mag ik een reden?";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} Ik heb een err: ${error}`));
    message.reply(`${member.user.tag} is gekickt bij ${message.author.tag} want: ${reason}`);

  }
  
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["TeamPerms"].includes(r.name)) )
      return message.reply("Sorry, jij mag dit niet doen!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Het is wel handig als je een naam opgeeft zoals @naam Xd");
    if(!member.bannable) 
      return message.reply("Ik kan deze persoon niet bannen.");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Mag ik een reden?";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} ik heb een err: ${error}`));
    message.reply(`${member.user.tag} is geband bij ${message.author.tag} want: ${reason}`);
  }
  
  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Kies een getal tussen de 2 en de 100");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Ik kan dit bericht niet verranderen want: ${error}`));
  }
  
});

client.login(config.token);
