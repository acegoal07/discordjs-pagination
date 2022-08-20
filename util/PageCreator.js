// Dependencies
const { EmbedBuilder } = require("discord.js");
// Page Builder
module.exports = {
   /**
    * Sends back a list of custom pages to use
    * @returns {Promise.<pageList: Array>}
    */
   async PageCreator(pageBuilderInfo) {
      try {
            let pageList = [];
            for (const page of pageBuilderInfo) {
               if (!page) throw new Error("PageCreator ERROR: undefined page was passed into createPages")
               const embed = new EmbedBuilder();
               if (page.title) embed.setTitle(page.title);
               if (page.description) embed.setDescription(page.description);
               if (page.color) embed.setColor(page.color);
               if (page.fields) embed.addFields(page.fields);
               if (page.imageUrl) embed.setImage(page.imageUrl);
               if (page.thumbnailUrl) embed.setThumbnail(page.thumbnailUrl);
               if (page.author) embed.setAuthor(page.author);
               if (page.url) embed.setURL(page.url);
               pageList.push(embed);
            }
            return Promise.resolve(pageList);
         } catch(error) {
            return console.log(`Error occured with ${__filename.split(/[\\/]/).pop().replace(".js","")} ${error}`)
         }
   }
}