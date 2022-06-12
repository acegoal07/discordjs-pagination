///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const { MessageButton } = require("discord.js");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Params ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Sends back a list of custom buttons
 * @returns {MessageButton[]}
 */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Button Builder ////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = ButtonBuilder = async(buttonBuilderInfo) => {
   try {
      let buttonList = []
      for (const button of buttonBuilderInfo) {
         // Check for info
         if (!button.customId) throw new Error("The custom id for the button must be provided");
         if (!button.setStyle) throw new Error("The style for the button must be provided");
         // Create button
         const embedButton = new MessageButton()
            .setCustomId(button.customId)
            .setStyle(button.setStyle);
            // Add check for label or emoji
            if (button.label && !button.emoji) {embedButton.setLabel(button.label)}
            else if (button.label && button.emoji) {embedButton.setLabel(button.label)}
            else {embedButton.setEmoji(button.emoji)}
         // Add button to array
         buttonList.push(embedButton)
      }
      return buttonList;
   } catch(error) {
      return console.log(`Error occured with ${__filename.split(/[\\/]/).pop().replace(".js","")} ${error}`)
   }
}