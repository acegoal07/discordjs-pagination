// Dependencies
const { SelectMenuBuilder, ActionRowBuilder } = require("discord.js");
// Functions
module.exports = {
   /**
    * Creates a select menu to be used as a way to interact with the pagination
    * @param {Number} pageListLength An array of the embeds
    */
   async SelectMenuCreator(pageListLength) {
      try {
         // Options creator
         let optionArray = [];
         for (let i = 1; i < pageListLength + 1; i++) {
            optionArray.push(
               {
                  label: `Page ${i}`,
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
    * @param {Number} pageListLength An array of the embeds
    */
   async DisabledSelectMenuCreator(pageListLength) {
      try {
         // Options creator
         let optionArray = [];
         for (let i = 1; i < pageListLength + 1; i++) {
            optionArray.push(
               {
                  label: `Page ${i}`,
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