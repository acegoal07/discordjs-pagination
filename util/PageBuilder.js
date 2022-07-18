///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const { EmbedBuilder } = require("discord.js");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Params ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Sends back a list of custom pages to use
 * @returns {EmbedBuilder[]}
 */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Page Builder //////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = Builder = async(pageBuilderInfo) => {
   try {
      let pageList = [];
      for (const page of pageBuilderInfo) {
         const embed = new EmbedBuilder();
            if (page.title) {
               EmbedBuilder().from(embed).setTitle(page.title);
            }
            if (page.description){
               EmbedBuilder().from(embed).setDescription(page.description);
            }
            if (page.color){ 
               EmbedBuilder().from(embed).setColor(page.color)
            }
            if (page.fields){
               EmbedBuilder().from(embed).addFields(page.fields);
            } 
            if (page.imageUrl){
               EmbedBuilder().from(embed).setImage(page.imageUrl);
            } 
            if (page.thumbnailUrl) {
               EmbedBuilder().from(embed).setThumbnail(page.thumbnailUrl);
            } 
            if (page.author) {
               EmbedBuilder().from(embed).setAuthor(page.author);
            } 
            if (page.url) {
               EmbedBuilder().from(embed).setURL(page.url);
            }
         pageList.push(embed);
      }
      return pageList;
   } catch(error) {
      return console.log(`Error occured with ${__filename.split(/[\\/]/).pop().replace(".js","")} ${error}`)
   }
}