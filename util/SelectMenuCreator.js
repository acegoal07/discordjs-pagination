// Dependencies
const { SelectMenuBuilder, ActionRowBuilder } = require("discord.js");
// Functions
module.exports = {
   /**
    * Creates a select menu to be used as a way to interact with the pagination
    * @param {Number} pageListLength An array of the embeds
    * @param {Array} labels An array of labels
    * @returns {Promise.<ActionRowBuilder>}
    */
   async SelectMenuCreator(pageListLength, labels) {
      try {
         // Options creator
         let optionArray = [];
         for (let i = 1; i < pageListLength + 1; i++) {
            optionArray.push(
               {
                  label: `${labels[i - 1] ? `${labels[i - 1]}` : `Page ${i}`}`,
                  value: `${i}`,
               }
            )
         }
         // Select menu builder
         return Promise.resolve(
            new ActionRowBuilder().addComponents(
               new SelectMenuBuilder()
                  .setCustomId('select')
                  .setPlaceholder('Select Page')
                  .addOptions(optionArray)
            )
         )
      } catch(error) {
         return console.log(`Error occured with ${__filename.split(/[\\/]/).pop().replace(".js","")} function SelectMenuCreator ${error}`)
      }
   },
   /**
    * Creates a disabled select menu
    * @param {Number} pageListLength An array of the embeds
    * @param {Array} labels An array of labels
    * @returns {Promise.<ActionRowBuilder>}
    */
   async DisabledSelectMenuCreator(pageListLength, labels) {
      try {
         // Options creator
         let optionArray = [];
         for (let i = 1; i < pageListLength + 1; i++) {
            optionArray.push(
               {
                  label: `${labels[i - 1] ? `${labels[i - 1]}` : `Page ${i}`}`,
                  value: `${i}`,
               }
            )
         }
         // Select menu builder
         return Promise.resolve(
            new ActionRowBuilder().addComponents(
               new SelectMenuBuilder()
                  .setCustomId('disabledSM')
                  .setDisabled(true)
                  .setPlaceholder('Select Page')
                  .addOptions(optionArray)
            )
         )
      } catch(error) {
         return console.log(`Error occured with ${__filename.split(/[\\/]/).pop().replace(".js","")} function DisabledSelectMenuCreator ${error}`)
      }
   }
}