// Dependencies
const { EmbedBuilder } = require("discord.js");
/**
 * Sends back a list of custom pages to use
 * @param {[{
 *    title?: String,
 *    url?: String,
 *    author?: {
 *       name: String,
 *       icon_url?: String,
 *       url?: String
 *    },
 *    description?: String,
 *    thumbnailUrl?: String,
 *    fields?: [{
 *       name: String,
 *       value: String,
 *       inline?: Boolean
 *    }],
 *    imageUrl?: String,
 *    color?: 'Default'
 *       |  'Random'
 *       |  'White'
 *       |  'Aqua'
 *       |  'Green'
 *       |  'Blue'
 *       |  'Yellow'
 *       |  'Purple'
 *       |  'LuminousVividPink'
 *       |  'Fuchsia'
 *       |  'Gold'
 *       |  'Orange'
 *       |  'Red'
 *       |  'Grey'
 *       |  'Navy'
 *       |  'DarkAqua'
 *       |  'DarkGreen'
 *       |  'DarkBlue'
 *       |  'DarkPurple'
 *       |  'DarkVividPink'
 *       |  'DarkGold'
 *       |  'DarkOrange'
 *       |  'DarkRed'
 *       |  'DarkGrey'
 *       |  'DarkerGrey'
 *       |  'LightGrey'
 *       |  'DarkNavy'
 *       |  'Blurple'
 *       |  'Greyple'
 *       |  'DarkButNotBlack'
 *       |  'NotQuiteBlack'
 * }]} pageBuilderData
 * @returns {Promise.<pageList[]>}
 */
exports.PageCreator = async(pageBuilderData) => {
   try {
      const pageList = [];
      for (const page of pageBuilderData) {
         if (!page) {throw new Error("PageCreator ERROR: undefined page was passed into createPages");}
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
         );
      }
      return Promise.resolve(pageList);
   } catch(error) {return Promise.reject(`Error occurred with ${__filename.split(/[\\/]/).pop().replace(".js","")} ${error}`);}
}