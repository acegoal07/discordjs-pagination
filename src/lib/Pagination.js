const { MessageFlags, ComponentType } = require("discord.js"),
   { ContextType, MessageResponseType, TimeoutEnding, ButtonAction } = require("../assets/enums/Enums"),
   pagePayloadBuilder = require("../assets/builders/payload/PagePayloadBuilder"),
   AutoBuildButtons = require("../assets/tools/AutoBuildButtons"),
   filterBuilder = require("../assets/builders/filter/FilterBuilder"),
   disableButtons = require("../assets/tools/DisableButtons");

/**
 * @param {import("../assets/typedef/PaginationData")} paginationData
 */
module.exports = async function baseHandler(paginationData) {
   try {
      // Check to make sure pages are present
      if (paginationData.pages.length == 0) {
         throw new Error("[PAGE ERROR]: No pages have bee passed into the pagination");
      }

      // Check if there are any buttons and if there are none create buttons
      if (paginationData.buttons.length == 0) {
         AutoBuildButtons(paginationData);
      }

      // Send a warning if ephemeral setting is enabled with message
      if (paginationData.contextType == ContextType.Message && paginationData.settings.interactionEphemeral) {
         console.warn("[EPHEMERAL ERROR]: Ephemeral cannot be applied to none interaction messages");
      }

      // Send a warming if a message response type has been changed while using interaction
      if (paginationData.contextType == ContextType.Interaction && paginationData.settings.messageResponseType != MessageResponseType.Send) {
         console.warn("[MESSAGE RESPONSE TYPE ERROR]: Setting a message response type does not affect interactions");
      }

      // Store page position
      let pagePosition = 0;

      // Store sent pagination
      let pagination;

      // Handle Message context
      if (paginationData.contextType === ContextType.Message) {
         // Throw an error is the channel isn't accessible
         if (!paginationData.context.channel) {
            throw new Error("[CHANNEL ERROR]: Channel is not accessible");
         }

         // Check if there are less than 2 pages and send the page without pagination function if there is not
         if (paginationData.pages.length < 2) {
            // Handle how the page should be sent
            if (paginationData.settings.messageResponseType == MessageResponseType.Reply) {
               return paginationData.context.reply(pagePayloadBuilder(paginationData));
            } else {
               return paginationData.context.channel.send(pagePayloadBuilder(paginationData));
            }
         }

         // Send pagination with buttons
         if (paginationData.settings.messageResponseType == MessageResponseType.Reply) {
            pagination = await paginationData.context.reply(pagePayloadBuilder(paginationData));
         } else {
            pagination = await paginationData.context.channel.send(pagePayloadBuilder(paginationData));
         }
      }

      // Handle interaction context
      else if (paginationData.contextType === ContextType.Interaction) {

         // Check if the pagination is deferred and if not defer the reply with the correct ephemeral setting
         if (!paginationData.context.deferred) {
            await paginationData.context.deferReply(paginationData.settings.interactionEphemeral ? { flags: MessageFlags.Ephemeral } : {});
         }

         // Check if there are less than 2 pages and send the page without pagination function if there is not
         if (paginationData.pages.length < 2) {
            return paginationData.context.editReply(pagePayloadBuilder(paginationData));
         }

         // Send pagination with buttons
         pagination = await paginationData.context.editReply(pagePayloadBuilder(paginationData));
      }

      // Throw an error if there isn't a valid context
      else {
         throw new Error("[HANDLER ERROR]: No context type is set");
      }

      // Create a collector for the buttons used for the pagination
      const collector = await pagination.createMessageComponentCollector({
         filter: filterBuilder,
         time: paginationData.settings.timeout,
         ComponentType: ComponentType.Button
      });

      // Collect any button press and handle then according to button action
      collector.on("collect", async (i) => {
         collector.resetTimer();
         if (!i.deferred && !i.replied) { await i.deferUpdate(); }
         switch (paginationData.buttons.find(button => button.data.custom_id == i.customId).action) {
            case ButtonAction.Next:
               if ((pagePosition + 1) === paginationData.pages.length) {
                  if (paginationData.settings.loop) {
                     pagePosition = 0;
                  } else {
                     break;
                  }
               } else {
                  pagePosition++;
               }
               await i.editReply(pagePayloadBuilder(paginationData, pagePosition));
               break;
            case ButtonAction.Back:
               if (pagePosition === 0) {
                  if (paginationData.settings.loop) {
                     pagePosition = paginationData.pages.length - 1;
                  } else {
                     break;
                  }
               } else {
                  pagePosition--;
               }
               await i.editReply(pagePayloadBuilder(paginationData, pagePosition));
               break;
            case ButtonAction.Start:
               if (pagePosition !== 0) {
                  pagePosition = 0;
                  await i.editReply(pagePayloadBuilder(paginationData, pagePosition));
               }
               break;
            case ButtonAction.End:
               if (pagePosition !== paginationData.pages.length) {
                  pagePosition = (paginationData.pages.length - 1);
                  await i.editReply(pagePayloadBuilder(paginationData, pagePosition));
               }
               break;
            case ButtonAction.Delete:
               if (pagination.deletable) {
                  pagination.delete().catch(() => { });
               }
               collector.stop();
               break;
            default:
               console.warn("[COLLECTOR ERROR]: No recognised button was pressed");
               break;
         }
      });

      // Wait for the collector to end and handle timeout ending before resolving
      await new Promise((resolve, reject) => {
         collector.once("end", async () => {
            try {
               switch (paginationData.settings.timeoutEnding) {
                  case TimeoutEnding.DeleteButtons:
                     if (pagination.editable) {
                        await pagination.edit({ components: [] }).catch(() => { return; });
                     }
                     break;
                  case TimeoutEnding.DeletePagination:
                     if (pagination.deletable) {
                        await pagination.delete().catch(() => { return; });
                     }
                     break;
                  case TimeoutEnding.DisableButtons:
                     if (pagination.editable) {
                        disableButtons(paginationData);
                        await pagination.edit(pagePayloadBuilder(paginationData, pagePosition)).catch(() => { return; });
                     }
                     break;
                  default:
                     throw new Error('[TIMEOUT ENDING ERROR]: Invalid timeout ending type');
               }
               resolve(pagination);
            } catch (error) {
               reject(error);
            }
         });
      });
   } catch (error) {
      throw new Error("[PAGINATION ERROR]: An error occurred while handling the pagination", { cause: error });
   }
}