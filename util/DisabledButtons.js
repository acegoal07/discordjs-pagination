///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const { ActionRowBuilder, ButtonBuilder } = require("discord.js");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Params ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param {ButtonBuilder[]} buttonList - An array of the buttons
 * @returns {ActionRowBuilder} Disabled message action row
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Disabler //////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = DisabledButtons = async(buttonList) => {
   try {
      let disabledButtonList = []
      let count = 0;
      for (const button of buttonList) {
         count += 1;
         if (!button.data.label) {
            // Disable emoji buttons
            disabledButtonList.push(
               new ButtonBuilder()
                  .setEmoji(`<${button.data.emoji?.animated ? `a:${button.data.emoji.name}:${button.data.emoji.id}` : `${button.data.emoji.name}:${button.data.emoji.id}`}>`)
                  .setStyle(`${button.data.style}`)
                  .setDisabled(true)
                  .setCustomId(`disabledBtn${count}`)
            );
         } else {
            // Disable text buttons
            disabledButtonList.push(
               new ButtonBuilder()
                  .setLabel(`${button.data.label}`)
                  .setStyle(`${button.data.style}`)
                  .setDisabled(true)
                  .setCustomId(`disabledBtn${count}`)
            );
         }
      }
      return new ActionRowBuilder().addComponents(disabledButtonList);
   } catch(error) {
      return console.log(`Error occured with ${__filename.split(/[\\/]/).pop().replace(".js","")} ${error}`)
   }
}