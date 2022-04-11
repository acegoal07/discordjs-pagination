///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Params ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @returns {Function} The button filter
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Filter Builder ////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
   filterBuilder({message, interaction, buttonList, authorIndependent, selectMenu}) {
      // Get author
      let authorID;
      if (typeof message === "object") {
         authorID = message.author.id;
      } else {
         authorID = interaction.user.id || interaction.member.user.id;
      }
      if (selectMenu) {
         return filter = (i) => 
            (i.isSelectMenu()) &&
            (authorIndependent && i.user.id === authorID) ||
            !authorIndependent;
      }
      // Create filter
      return filter = (i) =>
            (i.customId === buttonList[0].customId ||
            i.customId === buttonList[1].customId ||
            i.customId === buttonList[2].customId ||
            i.customId === buttonList[3].customId ||
            i.customId === buttonList[4].customId) &&
            (authorIndependent && i.user.id === authorID) ||
            !authorIndependent;
   }   
}