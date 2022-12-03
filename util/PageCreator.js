// Dependencies
const { EmbedBuilder } = require("discord.js");
// Page Builder
module.exports = {
   /**
    * Sends back a list of custom pages to use
    * @param {Array} pageBuilderInfo
    * @returns {Promise.<pageList[]>}
    */
   async PageCreator(pageBuilderInfo) {
      try {
         let pageList = [];
         for (const page of pageBuilderInfo) {
            if (!page) throw new Error("PageCreator ERROR: undefined page was passed into createPages");
            pageList.push(
               new EmbedBuilder({
                  title: page.title,
                  description: page.description,
                  color: page.color,
                  fields: page.fields,
                  image: page.imageUrl,
                  thumbnail: page.thumbnailUrl,
                  author: page.author,
                  url: page.url
               })
            )
         }
         return Promise.resolve(pageList);
      } catch(error) {
         return Promise.reject(`Error occured with ${__filename.split(/[\\/]/).pop().replace(".js","")} ${error}`);
      }
   }
}