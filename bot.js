const {Client, RichEmbed} = require('discord.js')
const bot = new Client()
let activated = '0'

bot.on('ready', ()=>{
    console.log('Online.')
    bot.user.setActivity(`https://www.twitch.tv/bun_nie`, {type: ("WATCHING")})
    var Channel = bot.channels.get("620109248893943828");
    Channel.fetchMessage("620115878020644868");
})

bot.on('raw', event =>{
    const eventname = event.t
    if(eventname === 'MESSAGE_REACTION_ADD')
    {
        var reactionChannel = bot.channels.get(event.d.channel_id);
        if(event.d.message_id === '620115878020644868')
        {
            reactionChannel.fetchMessage(event.d.message_id)
            .then(msg => {
            var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id);
            var user = bot.users.get(event.d.user_id)
            })
            .catch(err => console.log(err))
        }
        else {
            reactionChannel.fetchMessage(event.d.message_id)
            .then(msg => {
            var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id);
            var user = bot.users.get(event.d.user_id)
            })
            .catch(err => console.log(err))
        }
    }
});

bot.on('messageReactionAdd', (messageReaction, user) =>{
    var roleName = messageReaction.emoji.name
    var role = messageReaction.message.guild.roles.find("name", "Unverified");
    var role2 = messageReaction.message.guild.roles.find("name", "The Buns");
    console.log(roleName)
    var member = messageReaction.message.guild.members.find(member => member.id === user.id);
    if(member)
    {
        if(roleName === 'bunLuv'){
            member.removeRole(role.id)
            member.addRole(role2.id)
            console.log("Added the Role The Buns.")
        }
    }
})

bot.on('guildMemberAdd', member=>{
    let channel = member.guild.channels.find(channel => channel.id === "512951673283674122")
    const embed = new RichEmbed()
    .setAuthor(`Welcome to The Bunhole!`, ``, ``)
    .setDescription(`Please be sure to look at the #rules-and-readme channel, ${member}!`)
    .setImage(`https://data.whicdn.com/images/76397426/original.gif`)
    .setColor(0xB780FF);
    channel.sendEmbed(embed)
})

bot.on('guildMemberRemove', member=>{
    let channel = member.guild.channels.find(channel => channel.id === "512951673283674122")
    const embed = new RichEmbed()
    .setAuthor(`*Gasps*`, ``, ``)
    .setDescription(` Awe, ${member} has left the Bunhole. :/`)
    .setImage(`https://media3.giphy.com/media/4QxQgWZHbeYwM/source.gif`)
    .setColor(0xB780FF);
    channel.sendEmbed(embed)
})

bot.on('message', async message => {
    let blacklisted = ['nigger', 'nigga', 'faggot', 'tiger',]
  
    
    let foundInText = false;
    for (var i in blacklisted) {
      if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
    }
    
  
    
      if (foundInText) {
        message.delete();
        message.channel.sendMessage('***Smacks*** ' + message.author + ', Hey! No bad words! >:(')
    }
});

bot.on('message', async message => {
    let blacklisted = ['Arguidi']
  
    
    let foundInText = false;
    for (var i in blacklisted) {
      if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
    }
    
  
    
      if (foundInText) {
        message.channel.sendMessage('' + message.author + ' https://media.tenor.com/images/a9adda18a785b1cb85eec04517d99178/tenor.gif')
    }
  });

bot.on('message', msg =>{
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    if(msg.author.id === '288026349246087169')
    {
        if(msg.content === '!activate')
        {
            activated = '1'
        }
        if(msg.content === '!deactivate')
        {
            activated = '0'
        }
    }
    if(msg.author.id === '288026349246087169')
    {
        if(activated === '1')
        {
            console.log('Bunnie is now the Bot')
            let content = msg.content
            msg.channel.bulkDelete('1')
            msg.channel.send(content)
        }
    }
    let args = msg.content.split(' ')
    switch(args[0]){
        case '!dm':
            if(msg.author.id === "288026349246087169"){
                let mentioned = msg.mentions.users.first()
                let message = args.join(' ').slice(25)
                mentioned.send(message)   
            }
        break;
        case '!kick':
            if(!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.sendMessage("You don't have permissions to kick anybody, so quit it! :)");
            if(!msg.guild.me.hasPermission("KICK_MEMBERS")) return msg.channel.sendMessage("I don't have permissions to kick anyone!");
            if(!args[1]) return msg.channel.sendMessage('Please specify a user to kick!')
            const tuser = msg.mentions.users.first();
            const kreason = args.join(" ").slice(28);
            if(tuser){
                const member = msg.guild.member(tuser)
                if(member){
                    if(!kreason){
                        member.kick('You were kicked.');
                        const kembed = new RichEmbed()
                        .setTitle('User has been kicked.')
                        .addField("User", tuser)
                        msg.channel.sendEmbed(kembed);
                    }
                    else{
                        member.kick(kreason);
                        const kembed = new RichEmbed()
                        .setTitle('User has been kicked.')
                        .addField("User", tuser)
                        msg.channel.sendEmbed(kembed);
                    }
                }
            }
        break;
        case '!ban':
            if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.sendMessage("You don't have permissions to ban anybody, so quit it! :)");
            if(!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.sendMessage("I don't have permissions to ban anybody!");
            if(!args[1]) return msg.channel.sendMessage('Please specify a user to ban!')
            const user = msg.mentions.users.first();
            const breason = args.join(" ").slice(27);
            if(user){
                const member = msg.guild.member(user)
                if(member){
                    if(!breason){
                        member.ban('You were banned.');
                        const bembed = new RichEmbed()
                        .setTitle('User has been banned!')
                        .addField("User's name", user)
                        .addField("User's ID", user.id)
                        .addField("Reason", 'No reason specified.');
                        msg.channel.sendEmbed(bembed);
                    }
                    else{
                        member.ban(breason);
                        const bembed = new RichEmbed()
                        .setTitle('User has been banned!')
                        .addField("User's name", user)
                        .addField("User's ID", user.id)
                        .addField("Reason", breason);
                        msg.channel.sendEmbed(bembed);
                    }
                }
            }
        break;
        case '!unban':
            if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.sendMessage("You don't have the permission to unban someone, so stop!");
            if(!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.sendMessage("I don't have the allowed permission to unban someone!");
            if(!args[1]) return msg.channel.sendMessage('Please specify a user to unban!')
            msg.guild.unban(args[1])
            const uembed = new RichEmbed()
            .setTitle('User has been unbanned!')
            msg.channel.sendEmbed(uembed);
        break;
        case '!clear':
            if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.sendMessage("You don't have permissions to clear any messages, so stop! ");
            if(!msg.guild.me.hasPermission("MANAGE_MESSAGES")) return msg.channel.sendMessage("I don't have permissions to clear any messages!");
            if(!args[1]) return msg.channel.sendMessage('How many messages are we deleting?');
            if(isNaN(parseFloat(args[1]))){
                return msg.channel.sendMessage('Are you really trying to purge "' + args[1] + '" messages?');
            }
            msg.channel.bulkDelete(args[1]);
        break;
        case '!dmall':
            if(msg.author.id === '288026349246087169'){
            if(!args[1]) return msg.channel.sendMessage('?');
            let dmGuild = msg.guild;
            var message = msg.content.slice(6);
            let memberarray = dmGuild.members.array();
            let membercount = memberarray.length;
            console.log(`Responding to ${msg.author.username} :  Sending message to all ${membercount} members of ${dmGuild.name}.`)
            for (var i = 0; i < membercount; i++) {
                if(!args[1]) return msg.channel.sendMessage('?');
                let timeout = Math.floor((Math.random() * (10 - 0.01)) * 1000) + 10;
                let member = memberarray[i];
                sleep(timeout)
                if(i == (membercount-1)) {
                    console.log(`Waited ${timeout}ms.\t\\/\tDMing ${member.user.username}`);
                } else {
                    console.log(`Waited ${timeout}ms.\t|${i + 1}|\tDMing ${member.user.username}`);
                }
                member.send(`${message}`);
            }
            }
        break;
    }
})

bot.login(process.env.BOT_TOKEN)
