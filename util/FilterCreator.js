// Params
/**
 * Crates the filter needed to interpret input for the pagination
 * @returns {Function} The button filter
*/
// Filter Builder
module.exports = {
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
                  (i.custom_id === buttonList[0].custom_id ||
                  i.custom_id === buttonList[1].custom_id ||
                  i.custom_id === buttonList[2].custom_id ||
                  i.custom_id === buttonList[3].custom_id ||
                  i.custom_id === buttonList[4].custom_id) &&
                  (authorIndependent && i.user.id === authorID) ||
                  !authorIndependent;
         }
      } catch(error) {
         return console.log(`Error occured with ${__filename.split(/[\\/]/).pop().replace(".js","")} ${error}`)
      }
   }
}