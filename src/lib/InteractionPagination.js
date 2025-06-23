// Dependencies
const { ActionRowBuilder, MessageFlags } = require("discord.js"),
   { DisabledButtonCreator } = require("../util/tools/ButtonCreator"),
   { SelectMenuCreator, DisabledSelectMenuCreator } = require("../util/tools/SelectMenuCreator"),
   { ProgressBarCreator } = require("../util/tools/ProgressBarCreator"),
   { FilterCreator } = require("../util/tools/FilterCreator");

/**
 * Helper to build the reply content for a given page number.
 * @param {Object} paginationInfo - The pagination information.
 * @param {Object} options - The options for pagination.
 * @param {Number} pageNumber - The current page number.
 * @param {Number} pageLength - The total number of pages.
 * @returns {Promise<Object>} The content to be sent as a reply.
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
         fetchReply: true,
         flags: options.ephemeral ? MessageFlags.Ephemeral : null
      };
   } else if (paginationInfo.attachmentList != null) {
      return {
         embeds: [paginationInfo.pageList[pageNumber].setFooter({ text: progressText })],
         files: [paginationInfo.attachmentList[pageNumber] ?? null],
         components: [selectMenuComponent],
         fetchReply: true,
         flags: options.ephemeral ? MessageFlags.Ephemeral : null
      };
   } else {
      return {
         embeds: [paginationInfo.pageList[pageNumber].setFooter({ text: progressText })],
         components: [selectMenuComponent],
         fetchReply: true,
         flags: options.ephemeral ? MessageFlags.Ephemeral : null
      };
   }
}

/**
 * The interaction pagination
 * @param {import("../util/typedef/paginationInfo").PaginationInfo} paginationInfo
 * @param {import("../util/typedef/paginationOptions").PaginationOptions} options
 * @returns {import("discord.js").EmbedBuilder[]} The pagination
 */
exports.InteractionPagination = async (paginationInfo, options) => {
   try {
      let pageNumber = 0;
      const pageLength = options.imageList ? paginationInfo.imageList.length : paginationInfo.pageList.length;
      const paginationContent = await buildPaginationContent(paginationInfo, options, pageNumber, pageLength);

      let pagination;
      const PRIVATE_REPLY_MSG = "The reply has been sent privately";
      if (options.privateReply) {
         if (paginationInfo.portal.deferred) {
            await paginationInfo.portal.editReply(PRIVATE_REPLY_MSG);
         } else {
            await paginationInfo.portal.reply(PRIVATE_REPLY_MSG);
         }
         pagination = await paginationInfo.portal.client.users.cache
            .get(paginationInfo.portal.member.user.id)
            .send(paginationContent);
      } else if (paginationInfo.portal.deferred) {
         pagination = await paginationInfo.portal.editReply(paginationContent);
      } else {
         pagination = await paginationInfo.portal.reply(paginationContent);
      }

      const collector = await pagination.createMessageComponentCollector({
         filter: FilterCreator({
            interaction: paginationInfo.portal,
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
                     throw new Error("InteractionPagination ERROR: The button input is null");
                  case undefined:
                     throw new Error("InteractionPagination ERROR: The button input is undefined");
                  default:
                     break;
               }
               if (!i.deferred) { await i.deferUpdate(); }
               await i.editReply(await buildPaginationContent(paginationInfo, options, pageNumber, pageLength))
                  .catch(error => { throw new Error(`InteractionPagination ERROR: ${error}`); });
            } else {
               if (!i.deferred) { await i.deferUpdate(); }
               pageNumber = i.values[0] - 1;
               await i.editReply(await buildPaginationContent(paginationInfo, options, pageNumber, pageLength))
                  .catch(error => { throw new Error(`InteractionPagination ERROR: ${error}`); });
            }
            collector.resetTimer();
         } catch (error) {
            throw new Error(`InteractionPagination ERROR: ${error}`);
         }
      });

      collector.once("end", async () => {
         try {
            await paginationInfo.portal.channel.messages.fetch({ message: pagination.id }).catch(() => null);
            if (options.autoDelete) {
               return paginationInfo.portal.deleteReply().catch(error => {
                  if (error.code === 10008) { return; }
                  throw new Error(`InteractionPagination ERROR: ${error}`);
               });
            }
            if (!options.disabledButtons) {
               return paginationInfo.portal.editReply({ components: [] }).catch(error => {
                  if (error.code === 10008) { return; }
                  throw new Error(`InteractionPagination ERROR: ${error}`);
               });
            }
            return paginationInfo.portal.editReply(options.selectMenu.toggle
               ? { components: [await DisabledSelectMenuCreator(pagination.components[0])] }
               : { components: [await DisabledButtonCreator(paginationInfo.buttonList)] }
            ).catch(error => {
               if (error.code === 10008) { return; }
               throw new Error(`InteractionPagination ERROR: ${error}`);
            });
         } catch (error) {
            if (error.code === 10008) { return; }
            throw new Error(`InteractionPagination end error: ${error}`);
         }
      });
   } catch (error) {
      throw new Error(`Error occurred with ${__filename.split(/[\\/]/).pop().replace(".js", "")}: ${error}`);
   }
}