///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const {
   Interaction,
   MessageActionRow,
   MessageEmbed,
   MessageButton
} = require("discord.js");
const disabledButtons = require('../util/disabledButtons');
const selectMenuBuilder = require('../util/selectMenuBuilder');
const progressBarBuilder = require('../util/progressBarBuilder');
const { filterBuilder } = require('../util/filterBuilder');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Params ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param {Interaction} interaction - Discord.js interface
 * @param {MessageEmbed[]} pageList - An array of the embeds
 * @param {MessageButton[]} buttonList - An array of the buttons
 * @param {Number} timeout - How long the timeout lasts
 * @param {Boolean} autoDelete - If autoDelete is enabled
 * @param {Boolean} privateReply - If privateReply is enabled
 * @param {Boolean} progressBar - ProgressBar settings
 * @param {String} proSlider - The symbol used to symbolise position on the progressBar
 * @param {String} proBar - The symbol used to symbolise pages to go on the progressBar
 * @param {Boolean} authorIndependent - Only the author can use pagination
 * @param {Boolean} selectMenu - If select menu is enabled
 * @returns {MessageEmbed[]} The pagination
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Interaction pagination ////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = InteractionPagination = async(interaction, pageList, buttonList, timeout, autoDelete, privateReply, progressBar, proSlider, proBar, authorIndependent, selectMenu) => {
   // Set page number
   let pageNumber = 0;
   // Create row
   let row
   if (selectMenu) {row = new MessageActionRow().addComponents(await selectMenuBuilder(pageList.length))} 
   else {row = new MessageActionRow().addComponents(buttonList);}
   // Create embed
   const paginationContent = {
      embeds: [pageList[pageNumber].setFooter({text: `${progressBar ? `${progressBarBuilder(pageList.length, pageNumber, proSlider, proBar)}` : `Page ${pageNumber + 1} / ${pageList.length}`}`})],
      components: [row], fetchReply: true
   };
   let pagination;
   if (privateReply) {
      interaction.deferred ? await interaction.editReply("The reply has been sent privately") : await interaction.reply("The reply has been sent privately");
      pagination = await interaction.client.users.cache.get(interaction.member.user.id).send(paginationContent);
   } else if (interaction.deferred) {
      pagination = await interaction.editReply(paginationContent);
   } else {
      pagination = await interaction.reply(paginationContent);
   }
   // Create filter
   let filter = filterBuilder({interaction, buttonList, authorIndependent, selectMenu});
   // Create collector
   const collector = await pagination.createMessageComponentCollector({
      filter,
      time: timeout
   });
   // Button inputs
   collector.on("collect", async (i) => {
      // Button response
      if (!selectMenu) {
         switch (i.customId) {
            // Button 1
            case buttonList[0].customId:
               if (buttonList.length > 3) {
                  pageNumber = 0;
                  break;
               }
               pageNumber = pageNumber > 0 ? --pageNumber : pageList.length - 1;
               break;
            // Button 2
            case buttonList[1].customId:
               if (buttonList.length > 3) {
                  pageNumber = pageNumber > 0 ? --pageNumber : pageList.length - 1;
                  break;
               }
               pageNumber = pageNumber + 1 < pageList.length ? ++pageNumber : 0;
               break;
            // Button 3
            case buttonList[2].customId:
               if (buttonList.length > 3) {
                  pageNumber = pageNumber + 1 < pageList.length ? ++pageNumber : 0;
                  break
               }
               pagination.delete();
               return;
            // Button 4
            case buttonList[3].customId:
               pageNumber = pageList.length - 1 ;
               break;
            // Button 5
            case buttonList[4].customId:
               pagination.delete();
               return;
            // Default
            default:
               break;
         }
         if (!i.deferred) await i.deferUpdate();
         // Edit page after input
         await i.editReply({
            embeds: [pageList[pageNumber].setFooter({text: `${progressBar ? `${progressBarBuilder(pageList.length, pageNumber, proSlider, proBar)}` : `Page ${pageNumber + 1} / ${pageList.length}`}`})],
            fetchReply: true
         }).catch(error => {return console.log(error)});
      }
      // Select menu response
      else {
         // Get value
         const value = i.values[0];
         // Deferrer update 
         if (!i.deferred) await i.deferUpdate();
         // Edit page after input
         pageNumber = value - 1 ;
         await i.editReply({
            embeds: [pageList[pageNumber].setFooter({text: `${progressBar ? `${progressBarBuilder(pageList.length, pageNumber, proSlider, proBar)}` : `Page ${pageNumber + 1} / ${pageList.length}`}`})],
            fetchReply: true
         }).catch(error => {return console.log(error)}); 
      }
      // Refresh timeout timer
      collector.resetTimer();
   });
   // Timeout ended or embed was deleted
   collector.on("end", async() => {
      try {
         // Remove select menu
         if (selectMenu) {
            try {
               // Disable buttons
               return pagination.edit({ components: [] });
            } catch(error) {return}
         }
         // Make sure the embed exists
         await interaction.channel.messages.fetch(pagination.id);
         // Delete if autoDelete in enabled
         if (autoDelete) return pagination.delete();
         try {
            // Disable buttons
            return pagination.edit({ components: [await disabledButtons(buttonList)] });
         } catch(error) {return}
      } catch(error) {return}
   });
};