///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const { SelectMenuBuilder, ActionRowBuilder } = require("discord.js");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Params ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param {Number} pageListLength An array of the embeds
 * @param {Boolean} disabled If the select menu needs to be disabled
 * @returns {ActionRowBuilder} Select menu
 */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Select menu maker /////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = Builder = async(pageListLength, disabled) => {
   try {
      let optionArray;
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
         return new ActionRowBuilder().addComponents(
            new SelectMenuBuilder()
               .setCustomId('disabledSM')
               .setDisabled(true)
               .setPlaceholder('Select Page')
               .addOptions(optionArray)
         )
      } else {
         // Enabled selectMenu
         return new ActionRowBuilder().addComponents(
            new SelectMenuBuilder()
               .setCustomId('select')
               .setPlaceholder('Select Page')
               .addOptions(optionArray)

         )
      }
   } catch(error) {
      return console.log(`Error occured with ${__filename.split(/[\\/]/).pop().replace(".js","")} ${error}`)
   }
}
