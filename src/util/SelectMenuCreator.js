// Dependencies
const { StringSelectMenuBuilder, ActionRowBuilder } = require("discord.js");
// Select menu builder
/**
 * Creates a select menu to be used as a way to interact with the pagination
 * @param {Number} pageListLength An array of the embeds
 * @param {Array<String>} labels An array of labels
 * @returns {Promise.<import("discord.js").ActionRowBuilder[]>}
 */
exports.SelectMenuCreator = async(pageListLength, labels) => {
   try {
      // Options creator
      const optionArray = [];
      for (let i = 1; i < pageListLength + 1; i++) {
         optionArray.push(
            {
               label: `${labels[i - 1] ? `${labels[i - 1]}` : `Page ${i}`}`,
               value: `${i}`
            }
         );
      }
      // Select menu builder
      return Promise.resolve(
         new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
               .setCustomId('selectMenu')
               .setPlaceholder('Select Page')
               .addOptions(optionArray)
         )
      );
   } catch(error) {
      return Promise.reject(`Error occurred with ${__filename.split(/[\\/]/).pop().replace(".js","")} function selectMenuCreator ${error}`);
   }
}
// Select menu disabler
/**
 * Creates a disabled select menu
 * @param {import("discord.js").ActionRowBuilder[]} actionRow
 * @returns {Promise.<import("discord.js").ActionRowBuilder[]>}
 */
exports.DisabledSelectMenuCreator = async(actionRow) => {
   try {
      // Select menu builder
      return Promise.resolve(
         new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
               .setCustomId('disabledSelectMenu')
               .setPlaceholder('Select Page')
               .setDisabled()
               .addOptions(actionRow.components[0].data.options)
         )
      );
   } catch(error) {
      return Promise.reject(`Error occurred with ${__filename.split(/[\\/]/).pop().replace(".js","")} function disabledSelectMenuCreator ${error}`)
   }
}
