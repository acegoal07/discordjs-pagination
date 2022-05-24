///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const { MessageEmbed } = require("discord.js");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Params ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Sends back a list of custom pages to use
 * @returns {MessageEmbed[]}
 */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Page Builder //////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = PageBuilder = async(pageBuilderInfo) => {
   let pageList = [];
   for(const page of pageBuilderInfo) {
   const embed = new MessageEmbed();
      if(page.title) embed.setTitle(page.title);
      if(page.description) embed.setDescription(page.description);
      if(page.color) embed.setColor(page.color);
      if(page.fields) embed.addFields(page.fields);
      pageList.push(embed);
   }
   return pageList
}