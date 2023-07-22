// Dependencies
const { ActionRowBuilder, ButtonBuilder } = require("discord.js");
// AutoButton params
/**
 * Sends back a list of buttons to be used
 * @param {Number} pageListLength
 * @param {Boolean} autoDelButton
 * @returns {Promise.<import("discord.js").buttonList[]>}
 */
exports.AutoButtonCreator = async (pageListLength, autoDelButton) => {
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
      if (autoDelButton) {buttonList.push(del);}
      return Promise.resolve(buttonList);
   } catch(error) {throw new Error(`Error occurred with ${__filename.split(/[\\/]/).pop().replace(".js","")} function AutoButtonCreator ${error}`);}
}
// ButtonCreator params
/**
 * Sends back a list of custom buttons
 * @param {[{
 *    customId: String,
 *    label?: String,
 *    style: "Primary"
 *       | "Secondary"
 *       | "Success"
 *       | "Danger",
 *    emoji?: String
 * }]} buttonBuilderData
 * @returns {Promise.<import("discord.js").buttonList[]>}
 */
exports.ButtonCreator = async(buttonBuilderData) => {
   try {
      const buttonList = []
      for (const button of buttonBuilderData) {
         // Check for info
         if (!button.customId) {throw new Error("ButtonCreator ERROR: The custom id for the button must be provided");}
         if (!button.setStyle) {throw new Error("ButtonCreator ERROR: The style for the button must be provided");}
         // Create button
         buttonList.push(
            new ButtonBuilder({
               custom_id: button.customId,
               style: button.setStyle,
               label: button.label,
               emoji: button.emoji
            })
         );
      }
      return Promise.resolve(buttonList);
   } catch(error) {throw new Error(`Error occurred with ${__filename.split(/[\\/]/).pop().replace(".js","")} function ButtonCreator ${error}`);}
}
// DisabledButtonCreator params
/**
 * @param {ButtonBuilder[]} buttonList - An array of the buttons
 * @returns {Promise.<import("discord.js").ActionRowBuilder[]>}
 */
exports.DisabledButtonCreator = async(buttonList) => {
   try {
      let count = 0;
      const disabledButtonList = [];
      for (const button of buttonList) {
         count += 1;
         disabledButtonList.push(
            new ButtonBuilder({
               emoji: button.data.emoji,
               custom_id: `disabledBtn${count}`,
               label: button.data.label,
               style: button.data.style,
               disabled: true
            })
         );
      }
      return Promise.resolve(new ActionRowBuilder().addComponents(disabledButtonList));
   } catch(error) {throw new Error(`Error occurred with ${__filename.split(/[\\/]/).pop().replace(".js","")} function DisabledButtonCreator ${error}`);}
}