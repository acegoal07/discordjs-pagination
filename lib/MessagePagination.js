// Dependencies
const { Message, ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require("discord.js");
const { DisabledButtonCreator } = require("../util/ButtonCreator");
const { SelectMenuCreator, DisabledSelectMenuCreator } = require("../util/SelectMenuCreator");
const { ProgressBarCreator } = require("../util/ProgressBarCreator");
const { FilterCreator } = require("../util/FilterCreator");
// Params
/**
 * The Message pagination
 *
 * @param {Message} message - Discord.js interface
 * @param {EmbedBuilder[]} pageList - An array of the embeds
 * @param {ButtonBuilder[]} buttonList - An array of the buttons
 * @param {Number} timeout - How long the timeout lasts
 * @param {Boolean} replyMessage - If replyMessage is enabled
 * @param {Boolean} autoDelete - If autoDelete is enabled
 * @param {Boolean} privateReply - If privateReply is enabled
 * @param {Object} progressBar - ProgressBar settings
 * @param {Boolean} authorIndependent - Only the author can use pagination
 * @param {Object} selectMenu - If select menu is enabled
 * @returns {EmbedBuilder[]} The pagination
 */
// Message pagination
module.exports = MessagePagination = async(message, pageList, buttonList, timeout, replyMessage, autoDelete, privateReply, progressBar, authorIndependent, selectMenu) => {
   try {
      // Set page number
      let pageNumber = 0;
      // Create embed
      const paginationContent = {
         embeds: [pageList[pageNumber].setFooter({text: `${progressBar.toggle ? `${ProgressBarCreator(pageList.length, pageNumber, progressBar)}` : `Page ${pageNumber + 1} / ${pageList.length}`}`})],
         components: [selectMenu.toggle ? await SelectMenuCreator(pageList.length, selectMenu.labels) : new ActionRowBuilder().addComponents(buttonList)], fetchReply: true
      };
      let pagination;
      if (privateReply) {
         await message.channel.send("The reply has been sent privately");
         pagination = await message.author.send(paginationContent);
      } else {
         pagination = replyMessage ? await message.reply(paginationContent) : await message.channel.send(paginationContent);
      }
      // Create collector
      const collector = pagination.createMessageComponentCollector({
         filter: FilterCreator({message, buttonList, authorIndependent, selectMenu}),
         time: timeout
      });
      // Button inputs
      collector.on("collect", async (i) => {
         // Button response
         if (!selectMenu.toggle) {
            switch (i.customId) {
               // Button 1
               case buttonList[0].data.custom_id:
                  if (buttonList.length > 3) {
                     pageNumber = 0;
                     break;
                  }
                  pageNumber = pageNumber > 0 ? --pageNumber : pageList.length - 1;
                  break;
               // Button 2
               case buttonList[1].data.custom_id:
                  if (buttonList.length > 3) {
                     pageNumber = pageNumber > 0 ? --pageNumber : pageList.length - 1;
                     break;
                  }
                  pageNumber = pageNumber + 1 < pageList.length ? ++pageNumber : 0;
                  break;
               // Button 3
               case buttonList[2].data.custom_id:
                  if (buttonList.length > 3) {
                     pageNumber = pageNumber + 1 < pageList.length ? ++pageNumber : 0;
                     break
                  }
                  pagination.delete();
                  return;
               // Button 4
               case buttonList[3].data.custom_id:
                  pageNumber = pageList.length - 1 ;
                  break;
               // Button 5
               case buttonList[4].data.custom_id:
                  pagination.delete();
                  return;
               // Catch null
               case null:
                  throw new Error("MessagePagination ERROR: The button input is null");
               // Catch undefined
               case undefined:
                  throw new Error("MessagePagination ERROR: The button input is undefined");
               // Default
               default:
                  break;
            }
            // Deferrer update
            if (!i.deferred) await i.deferUpdate();
            // Edit page after input
            await i.editReply({
               embeds: [pageList[pageNumber].setFooter({text: `${progressBar.toggle ? `${ProgressBarCreator(pageList.length, pageNumber, progressBar)}` : `Page ${pageNumber + 1} / ${pageList.length}`}`})],
               fetchReply: true
            }).catch(error => {return console.log(error)});
         }
         // Select menu response
         else {
            // Deferrer update
            if (!i.deferred) await i.deferUpdate();
            // Edit page after input
            pageNumber = i.values[0] - 1;
            await i.editReply({
               embeds: [pageList[pageNumber].setFooter({text: `${progressBar.toggle ? `${ProgressBarCreator(pageList.length, pageNumber, progressBar)}` : `Page ${pageNumber + 1} / ${pageList.length}`}`})],
               fetchReply: true
            }).catch(error => {return console.log(error)});
         }
         // Refresh timeout timer
         collector.resetTimer();
      });
      // Timeout ended or embed was deleted
      collector.on("end", async() => {
         try {
            // Make sure the embed exists
            await message.channel.messages.fetch(pagination.id);
            // Delete if autoDelete in enabled
            if (autoDelete) return pagination.delete();
            // Disable select menu
            if (selectMenu.toggle) {
               try {
                  return pagination.edit({ components: [await DisabledSelectMenuCreator(pageList.length, selectMenu.labels)] });
               } catch(error) {}
            }
            // Disable buttons
            else {
               try {
                  return pagination.edit({ components: [await DisabledButtonCreator(buttonList)] });
               } catch (error) {return}
            }
         } catch(error) {return}
      });
   } catch(error) {
      return console.log(`Error occured with ${__filename.split(/[\\/]/).pop().replace(".js","")} ${error}`)
   }
};