const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => { console.log(`Logged in as ${client.user.tag}!`); });
client.login(''); //Include Discord Bot ID here

const channelIDs = ['']; //Include the ID of each channel that you want to auto-clear
const deletionHour = 5; //Hour of the day you want the channel to be cleared (out of 24)
const deletionMinute = 0; //Minute of the hour that you want the channel to be cleared

client.on("ready", () => {
    console.log("setting interval");
    setInterval(() => {
        let date = new Date();
        console.log(date);
        if(date.getHours() === deletionHour && date.getMinutes() === deletionMinute) {
            channelIDs.forEach(channelID => {
                const channel = client.channels.cache.get(channelID);
                (function() {
                    if (!channel) return console.error("The channel does not exist!");
                    if (channel.type == 'text') {
                        channel.messages.fetch()
                        .then(msg => {
                            channel.bulkDelete(msg);
                            messagesDeleted = msg.array().length;
                            console.log('Deletion of messages successful. Total messages deleted: ' + messagesDeleted)
                        })
                        .catch(err => {
                            console.log('Error while doing Bulk Delete');
                            console.log(err);
                        });
                    }
                });
            });
        }
    }, 60000); // Repeat every 60000 milliseconds (1 minute)
});