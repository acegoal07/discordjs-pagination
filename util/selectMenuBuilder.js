const { MessageSelectMenu } = require("discord.js");

module.exports = selectMenuBuilder = async(pageList) => {
   count = 0;
   optionArray = [];
   for (page of pageList) {
      count += 1;
      optionArray.push(
         {
            label: `Page ${count}`,
            value: `${count}`,
         }
      )
   }
   return new MessageSelectMenu()
      .setCustomId('select')
      .setPlaceholder('Select Page')
      .addOptions(optionArray)
}