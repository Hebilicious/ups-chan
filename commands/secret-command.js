export function secretAlzy(msg){
  if (msg.content === 'alzy') {
      console.log('Alzy !!');
      // Send the message to a designated channel on a server:
      const channel = msg.member.guild.channels.find('name', 'super-important-and-private-stuff');
      console.log(channel);
      // Do nothing if the channel wasn't found on this server
      if (!channel) return;
      // Send the message, mentioning the member
      channel.send(`https://cdn.discordapp.com/attachments/318482214071566336/402574859013455873/roar.PNG`);
  }
};
