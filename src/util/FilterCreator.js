/**
 * Crates the filter needed to interpret input for the pagination
 * @param {{
 *    message?: import("discord.js").Message,
 *    interaction?: import("discord.js").Interaction,
 *    buttonList: import("discord.js").ButtonBuilder[],
 *    authorIndependent: Boolean,
 *    selectMenu: {
 *       toggle: Boolean,
 *       labels: Array<String>,
 *       useTitle: Boolean
 *    }
 * }}
 * @returns {Function} The button filter
 */
exports.FilterCreator = ({message, interaction, buttonList, authorIndependent, selectMenu}) => {
   try {
      // Get author
      const authorID = typeof message === "object" ? message.author.id : interaction.user.id || interaction.member.user.id;
      let filter;
      if (selectMenu.toggle) {
         // Create select menu filter
         filter = (i) =>
            (i.isStringSelectMenu()) &&
            (authorIndependent && i.user.id === authorID) ||
            !authorIndependent;
      } else {
         // Create filter
         filter = (i) =>
            (i.customId === buttonList[0].data.custom_id ||
            i.customId === buttonList[1].data.custom_id ||
            i.customId === buttonList[2].data.custom_id ||
            i.customId === buttonList[3].data.custom_id ||
            i.customId === buttonList[4].data.custom_id) &&
            (authorIndependent && i.user.id === authorID) ||
            !authorIndependent;
      }
      return filter;
   } catch(error) {throw new Error(`Error occurred with ${__filename.split(/[\\/]/).pop().replace(".js","")} ${error}`);}
}