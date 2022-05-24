const { MessageEmbed } = require("discord.js");
/**
 * @returns {MessageEmbed[]}
 */
module.exports = PageBuilder = async(pageBuilderInfo) => {
   console.log("here")
   try {
   let pageList = [];
   for(const page of pageBuilderInfo) {
   const embed = new MessageEmbed();
      if(page.title) embed.setTitle(page.title);
      if(page.description) embed.setDescription(page.description)
      if(page.fields[0]) embed.addFields(page.fields)
   }
   pageList.push(embed);
   return pageList
   }catch(error){console.log(error)}
}