///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const { MessageActionRow, MessageButton } = require("discord.js");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Params ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param {MessageButton[]} buttonList - An array of the buttons
 * @returns {MessageActionRow} Disabled message action row
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Disabler //////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = DisabledButtons = async(buttonList) => {
   try {
      let disabledButtonList = []
      let count = 0;
      for (const button of buttonList) {
         count += 1;
         if (!button.label) {
            // Disable emoji buttons
            disabledButtonList.push(
               new MessageButton()
                  .setEmoji(`<${button.emoji.animated ? `a:${button.emoji.name}:${button.emoji.id}` : `${button.emoji.name}:${button.emoji.id}`}>`)
                  .setStyle(`${button.style}`)
                  .setDisabled(true)
                  .setCustomId(`disabledBtn${count}`)
            );
         } else {
            // Disable text buttons
            disabledButtonList.push(
               new MessageButton()
                  .setLabel(`${button.label}`)
                  .setStyle(`${button.style}`)
                  .setDisabled(true)
                  .setCustomId(`disabledBtn${count}`)
            );
         }
      }
      return new MessageActionRow().addComponents(disabledButtonList);
   } catch(error) {
      return console.log(`Error occured with ${__filename.split(/[\\/]/).pop().replace(".js","")} ${error}`)
   }
}