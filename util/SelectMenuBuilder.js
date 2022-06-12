///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const { MessageSelectMenu, MessageActionRow } = require("discord.js");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Params ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param {MessageEmbed[]} pageListLength An array of the embeds
 * @param {Boolean} disabled If the select menu needs to be disabled
 * @returns {MessageActionRow} Select menu
 */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Select menu maker /////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = SelectMenuBuilder = async(pageListLength, disabled) => {
   try {
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
               .setCustomId('disabledSM')
               .setDisabled(true)
               .setPlaceholder('Select Page')
               .addOptions(optionArray)
         )
      }
      // Enabled selectMenu
      return new MessageActionRow().addComponents(
         new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('Select Page')
            .addOptions(optionArray)
      )
   } catch(error) {
      return console.log(`Error occured with ${__filename.split(/[\\/]/).pop().replace(".js","")} ${error}`)
   }
}
