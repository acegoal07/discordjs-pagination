///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const { MessageSelectMenu, MessageActionRow } = require("discord.js");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Params ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param {MessageEmbed[]} pageListLength An array of the embeds
 * @param {Boolean} disabled If the select menu needs to be disabeld
 * @returns {MessageActionRow} Select menu
 */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Select menu maker /////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = selectMenuBuilder = async(pageListLength, disabled) => {
   count = 0;
   optionArray = [];
   for (let i = 1; i < pageListLength + 1; i++) {
      optionArray.push(
         {
            label: `Page ${i}`,
            value: `${i}`,
         }
      )
   }
   // Disabled selectMenu
   if (disabled) {
      return new MessageActionRow().addComponents(
         new MessageSelectMenu()
            .setCustomId('dselect')
            .setDisabled(true)
            .setPlaceholder('Select Page')
            .addOptions(optionArray)
      )
   }
   // Enbaled selectMenu
   return new MessageActionRow().addComponents(
      new MessageSelectMenu()
         .setCustomId('select')
         .setPlaceholder('Select Page')
         .addOptions(optionArray)
   )
}
