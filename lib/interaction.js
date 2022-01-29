///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const {
  MessageActionRow,
  Interaction,
  MessageEmbed,
  MessageButton
} = require("discord.js");
const disabledButtons = require('../util/disabledButtons');
const progressBarBuilder = require('../util/progressBarBuilder');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Params ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param {Interaction} interaction - Discord.js interface
 * @param {MessageEmbed[]} pages - An array of the embeds
 * @param {MessageButton[]} buttonList - An array of the buttons
 * @param {Number} timeout - How long the timeout lasts
 * @param {Boolean} autoDelete - If autoDelete is enabled
 * @param {Boolean} privateReply - If privateReply is enabled
 * @param {Boolean} progressBar - ProgressBar settings
 * @param {String} proSlider - The symbol used to symbolise position on the progressBar
 * @param {String} proBar - The symbol used to symbolise pages to go on the progressBar
 * @returns {MessageEmbed[]} The pagination
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Interaction pagination ////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = InteractionPagination = async (interaction, pages, buttonList, timeout, autoDelete, privateReply, progressBar, proSlider, proBar) => {
   // Set page number
   let page = 0;
   // Create embed
   const row = new MessageActionRow().addComponents(buttonList);
   const embedInfo = {
      embeds: [pages[page].setFooter({text: `${progressBar ? `${await progressBarBuilder(pages.length, page, proSlider, proBar)}` : `Page ${page + 1} / ${pages.length}`}`})],
      components: [row], fetchReply: true
   };
   let curPage
   if (privateReply) {
      interaction.deferred !== true ? await interaction.reply("The reply has been sent privately") : await interaction.editReply("The reply has been sent privately");
      curPage = await interaction.client.users.cache.get(interaction.member.user.id).send(embedInfo);
   } else if (interaction.deferred) {
      curPage = await interaction.editReply(embedInfo);
   } else {
      curPage = await interaction.reply(embedInfo);
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
         embeds: [pages[page].setFooter({text: `${progressBar ? `${await progressBarBuilder(pages.length, page, proSlider, proBar)}` : `Page ${page + 1} / ${pages.length}`}`})],
         components: [row]
      }).catch(error => {return console.log(error)});
      collector.resetTimer();
   });
   // Timeout or embed was deleted
   collector.on("end", async() => {
      try {
         await interaction.channel.messages.fetch(curPage.id);
         if (autoDelete) return curPage.delete();
         try {
            curPage.edit({
               embeds: [pages[page].setFooter({text: `${progressBar ? `${await progressBarBuilder(pages.length, page, proSlider, proBar)}` : `Page ${page + 1} / ${pages.length}`}`})],
               components: [await disabledButtons(buttonList)]
            });
         } catch(error) {return}
      } catch(error) {return}
   });
   return curPage;
};