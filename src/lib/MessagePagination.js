// Dependencies
const { ActionRowBuilder } = require("discord.js"),
   { DisabledButtonCreator } = require("../util/tools/ButtonCreator"),
   { SelectMenuCreator, DisabledSelectMenuCreator } = require("../util/tools/SelectMenuCreator"),
   { ProgressBarCreator } = require("../util/tools/ProgressBarCreator"),
   { FilterCreator } = require("../util/tools/FilterCreator");

/**
 * Helper to build the reply content for a given page number.
 */
async function buildPaginationContent(paginationInfo, options, pageNumber, pageLength) {
   const progressText = options.progressBar.toggle
      ? await ProgressBarCreator(pageLength, pageNumber, options.progressBar)
      : `Page ${pageNumber + 1} / ${pageLength}`;

   const selectMenuComponent = options.selectMenu.toggle
      ? await SelectMenuCreator(pageLength, options.selectMenu.labels)
      : new ActionRowBuilder().addComponents(paginationInfo.buttonList);

   if (options.imageList) {
      return {
         files: [paginationInfo.imageList[pageNumber]],
         components: [selectMenuComponent],
         fetchReply: true
      };
   } else if (paginationInfo.attachmentList != null) {
      return {
         embeds: [paginationInfo.pageList[pageNumber].setFooter({ text: progressText })],
         files: [paginationInfo.attachmentList[pageNumber] ?? null],
         components: [selectMenuComponent],
         fetchReply: true
      };
   } else {
      return {
         embeds: [paginationInfo.pageList[pageNumber].setFooter({ text: progressText })],
         components: [selectMenuComponent],
         fetchReply: true
      };
   }
}

/**
 * The Message pagination
 * @param {import("../util/typedef/paginationInfo").PaginationInfo} paginationInfo
 * @param {import("../util/typedef/paginationOptions").PaginationOptions} options
 * @returns {import("discord.js").EmbedBuilder[]} The pagination
 */
exports.MessagePagination = async (paginationInfo, options) => {
   try {
      let pageNumber = 0;
      const pageLength = options.imageList ? paginationInfo.imageList.length : paginationInfo.pageList.length;
      const paginationContent = await buildPaginationContent(paginationInfo, options, pageNumber, pageLength);

      let pagination;
      if (options.privateReply) {
         await paginationInfo.portal.channel.send("The reply has been sent privately");
         pagination = await paginationInfo.portal.author.send(paginationContent);
      } else {
         pagination = options.replyMessage
            ? await paginationInfo.portal.reply(paginationContent)
            : await paginationInfo.portal.channel.send(paginationContent);
      }

      const collector = pagination.createMessageComponentCollector({
         filter: FilterCreator({
            message: paginationInfo.portal,
            buttonList: paginationInfo.buttonList,
            authorIndependent: options.authorIndependent,
            selectMenu: options.selectMenu
         }),
         time: options.timeout
      });

      collector.on("collect", async (i) => {
         try {
            if (!options.selectMenu.toggle) {
               switch (i.customId) {
                  case paginationInfo.buttonList[0]?.data?.custom_id:
                     if (paginationInfo.buttonList.length > 3) {
                        pageNumber = 0;
                        break;
                     }
                     pageNumber = pageNumber > 0 ? --pageNumber : pageLength - 1;
                     break;
                  case paginationInfo.buttonList[1]?.data?.custom_id:
                     if (paginationInfo.buttonList.length > 3) {
                        pageNumber = pageNumber > 0 ? --pageNumber : pageLength - 1;
                        break;
                     }
                     pageNumber = pageNumber + 1 < pageLength ? ++pageNumber : 0;
                     break;
                  case paginationInfo.buttonList[2]?.data?.custom_id:
                     if (paginationInfo.buttonList.length > 3) {
                        pageNumber = pageNumber + 1 < pageLength ? ++pageNumber : 0;
                        break;
                     }
                     pagination.delete();
                     return;
                  case paginationInfo.buttonList[3]?.data?.custom_id:
                     pageNumber = pageLength - 1;
                     break;
                  case paginationInfo.buttonList[4]?.data?.custom_id:
                     pagination.delete();
                     return;
                  case null:
                     throw new Error("MessagePagination ERROR: The button input is null");
                  case undefined:
                     throw new Error("MessagePagination ERROR: The button input is undefined");
                  default:
                     break;
               }
               if (!i.deferred) { await i.deferUpdate(); }
               await i.editReply(await buildPaginationContent(paginationInfo, options, pageNumber, pageLength))
                  .catch(error => { throw new Error(`MessagePagination ERROR: ${error}`); });
            } else {
               if (!i.deferred) { await i.deferUpdate(); }
               pageNumber = i.values[0] - 1;
               await i.editReply(await buildPaginationContent(paginationInfo, options, pageNumber, pageLength))
                  .catch(error => { throw new Error(`MessagePagination ERROR: ${error}`); });
            }
            collector.resetTimer();
         } catch (error) {
            throw new Error(`MessagePagination ERROR: ${error}`);
         }
      });

      collector.once("end", async () => {
         try {
            await paginationInfo.portal.channel.messages.fetch({ message: pagination.id }).catch(() => null);
            if (options.autoDelete) {
               return pagination.delete().catch(error => {
                  if (error.code === 10008) { return; }
                  throw new Error(`MessagePagination ERROR: ${error}`);
               });
            }
            if (!options.disabledButtons) {
               return pagination.edit({ components: [] }).catch(error => {
                  if (error.code === 10008) { return; }
                  throw new Error(`MessagePagination ERROR: ${error}`);
               });
            }
            return pagination.edit(options.selectMenu.toggle
               ? { components: [await DisabledSelectMenuCreator(pagination.components[0])] }
               : { components: [await DisabledButtonCreator(paginationInfo.buttonList)] }
            ).catch(error => {
               if (error.code === 10008) { return; }
               throw new Error(`MessagePagination ERROR: ${error}`);
            });
         } catch (error) {
            if (error.code === 10008) { return; }
            throw new Error(`MessagePagination ERROR: ${error}`);
         }
      });
   } catch (error) {
      throw new Error(`Error occurred with ${__filename.split(/[\\/]/).pop().replace(".js", "")} ${error}`);
   }
}