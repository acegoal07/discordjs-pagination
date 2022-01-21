///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const {
  MessageActionRow,
  Interaction,
  MessageEmbed,
  MessageButton
} = require("discord.js");
const disabledButtons = require('@acegoal07/discordjs-pagination/util/disabledButtons');
const progressBarBuilder = require('@acegoal07/discordjs-pagination/util/progressBar');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Params ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param {Interaction} interaction
 * @param {MessageEmbed[]} pages
 * @param {MessageButton[]} buttonList
 * @param {Number} timeout
 * @param {Boolean} autoDelete
 * @returns The pagination
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Interaction pagination ////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = InteractionPagination = async (interaction, pages, buttonList, timeout, autoDelete, progressBar) => {
   // Set page number
   let page = 0;
   // Create embed
   const row = new MessageActionRow().addComponents(buttonList);
   let curPage
   if (!interaction.deferred) {
      curPage = await interaction.reply({
         embeds: [pages[page].setFooter({text: `${progressBar ? `${await progressBarBuilder(pages.length, page)}` : `Page ${page + 1} / ${pages.length}`}`})],
         components: [row], fetchReply: true
      });
   } else {
      curPage = await interaction.editReply({
         embeds: [pages[page].setFooter({text: `${progressBar ? `${await progressBarBuilder(pages.length, page)}` : `Page ${page + 1} / ${pages.length}`}`})],
         components: [row], fetchReply: true
      });
   }
   // Create filter
   let filter 
   if (buttonList.length === 2) {
      filter = (i) =>
         i.customId === buttonList[0].customId ||
         i.customId === buttonList[1].customId;
   } else if (buttonList.length === 3) {
      filter = (i) =>
         i.customId === buttonList[0].customId ||
         i.customId === buttonList[1].customId ||
         i.customId === buttonList[2].customId;
   } else if (buttonList.length === 4) {
      filter = (i) =>
         i.customId === buttonList[0].customId ||
         i.customId === buttonList[1].customId ||
         i.customId === buttonList[2].customId ||
         i.customId === buttonList[3].customId;
   } else {
      filter = (i) =>
         i.customId === buttonList[0].customId ||
         i.customId === buttonList[1].customId ||
         i.customId === buttonList[2].customId ||
         i.customId === buttonList[3].customId ||
         i.customId === buttonList[4].customId;
   }
   // Create collector
   const collector = await curPage.createMessageComponentCollector({
      filter,
      time: timeout
   });
   // Button inputs
   collector.on("collect", async (i) => {
      switch (i.customId) {
         // Button 1
         case buttonList[0].customId:
            if (buttonList.length > 3) {
               page = 0;
               break;
            }
            page = page > 0 ? --page : pages.length - 1;
            break;
         // Button 2
         case buttonList[1].customId:
            if (buttonList.length > 3) {
               page = page > 0 ? --page : pages.length - 1;
               break;
            }
            page = page + 1 < pages.length ? ++page : 0;
            break;
         // Button 3
         case buttonList[2].customId:
            if (buttonList.length > 3) {
               page = page + 1 < pages.length ? ++page : 0;
               break
            }
            curPage.delete();
            return;
         // Button 4
         case buttonList[3].customId:
            page = pages.length - 1 ;
            break;
         // Button 5
         case buttonList[4].customId:
            curPage.delete();
            return;
         // Default
         default:
            break;
      }
      if (!i.deferred) await i.deferUpdate();
      await i.editReply({
         embeds: [pages[page].setFooter({text: `${progressBar ? `${await progressBarBuilder(pages.length, page)}` : `Page ${page + 1} / ${pages.length}`}`})],
         components: [row],
      }).catch(error => {return});
      collector.resetTimer();
   });
   // Timeout or embed was deleted
   collector.on("end", async() => {
      try {
         await interaction.channel.messages.fetch(curPage.id);
         if (autoDelete === true) return curPage.delete();
         try {
            curPage.edit({
               embeds: [pages[page].setFooter({text: `${progressBar ? `${await progressBarBuilder(pages.length, page)}` : `Page ${page + 1} / ${pages.length}`}`})],
               components: [await disabledButtons(buttonList)],
            });
         } catch(error) {return}
      } catch(error) {return}
   });
   return curPage;
};