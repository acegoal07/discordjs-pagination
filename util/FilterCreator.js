module.exports = {
   /**
    * Crates the filter needed to interpret input for the pagination
    * @returns {Function} The button filter
    */
   FilterCreator({message, interaction, buttonList, authorIndependent, selectMenu}) {
      try {
         // Get author
         let authorID;
         if (typeof message === "object") {
            authorID = message.author.id;
         } else {
            authorID = interaction.user.id || interaction.member.user.id;
         }
         if (selectMenu) {
            // Create select menu filter
            return filter = (i) =>
               (i.isSelectMenu()) &&
               (authorIndependent && i.user.id === authorID) ||
               !authorIndependent;
         } else {
            // Create filter
            return filter = (i) =>
                  (i.customId === buttonList[0].data.custom_id ||
                  i.customId === buttonList[1].data.custom_id ||
                  i.customId === buttonList[2].data.custom_id ||
                  i.customId === buttonList[3].data.custom_id ||
                  i.customId === buttonList[4].data.custom_id) &&
                  (authorIndependent && i.user.id === authorID) ||
                  !authorIndependent;
         }
      } catch(error) {
         return console.log(`Error occured with ${__filename.split(/[\\/]/).pop().replace(".js","")} ${error}`)
      }
   }
}