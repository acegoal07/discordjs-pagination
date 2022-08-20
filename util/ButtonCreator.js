// Dependencies
const { ActionRowBuilder, ButtonBuilder } = require("discord.js");
// Functions
module.exports = {
   // AutoButton params
   /**
    * Sends back a list of buttons to be used
    * @param {Number} pageListLength
    * @param {Boolean} autoDelButton
    * @returns {Promise.<buttonList: Array>}
    */
   async AutoButtonCreator(pageListLength, autoDelButton) {
      // Pre-made buttons
      const next = new ButtonBuilder()
         .setLabel(`>`)
         .setStyle("Secondary")
         .setDisabled(false)
         .setCustomId(`nextbtn`);
      const previous = new ButtonBuilder()
         .setLabel(`<`)
         .setStyle("Secondary")
         .setDisabled(false)
         .setCustomId(`previousbtn`);
      const first = new ButtonBuilder()
         .setLabel(`<<`)
         .setStyle("Secondary")
         .setDisabled(false)
         .setCustomId(`firstbtn`);
      const last = new ButtonBuilder()
         .setLabel(`>>`)
         .setStyle("Secondary")
         .setDisabled(false)
         .setCustomId(`lastbtn`);
      const del = new ButtonBuilder()
         .setLabel(`🗑`)
         .setStyle("Danger")
         .setDisabled(false)
         .setCustomId(`delbtn`);
      // Function code
      try {
         let buttonList = [];
         if (pageListLength <= 3) {
            buttonList = [previous, next];
         } else {
            buttonList = [first, previous, next, last];
         }
         if (autoDelButton) buttonList.push(del)
         return Promise.resolve(buttonList);
      } catch(error) {
         return console.log(`Error occured with ${__filename.split(/[\\/]/).pop().replace(".js","")} function AutoButtonCreator ${error}`)
      }
   },
   // ButtonCreator params
   /**
    * Sends back a list of custom buttons
    * @returns {Promise.<buttonList: Array>}
    */
   async ButtonCreator() {
      try {
         let buttonList = []
         for (const button of buttonBuilderInfo) {
            // Check for info
            if (!button.emoji && !button.label) throw new Error("ButtonCreator ERROR: Neither a emoji or label was provided");
            if (!button.customId) throw new Error("ButtonCreator ERROR: The custom id for the button must be provided");
            if (!button.setStyle) throw new Error("ButtonCreator ERROR: The style for the button must be provided");
            // Create button
            const embedButton = new ButtonBuilder()
               .setCustomId(button.customId)
               .setStyle(button.setStyle);
            // Add check for label or emoji
            if (!button.emoji) {embedButton.setLabel(button.label)}
            else if (button.label && button.emoji) {embedButton.setLabel(button.label)}
            else {embedButton.setEmoji(button.emoji)}
            // Add button to array
            buttonList.push(embedButton)
         }
         return Promise.resolve(buttonList);
      } catch(error) {
         return console.log(`Error occured with ${__filename.split(/[\\/]/).pop().replace(".js","")} function ButtonCreator ${error}`)
      }
   },
   // DisabledButtonCreator params
   /**
    * @param {ButtonBuilder[]} buttonList - An array of the buttons
    * @returns {Promise.<ActionRowBuilder>}
    */
   async DisabledButtonCreator(buttonList) {
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
         return Promise.resolve(new ActionRowBuilder().addComponents(disabledButtonList));
      } catch(error) {
         return console.log(`Error occured with ${__filename.split(/[\\/]/).pop().replace(".js","")} function DisabledButtonCreator ${error}`)
      }
   }
}