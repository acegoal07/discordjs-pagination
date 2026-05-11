const { MessageFlags, ComponentType } = require("discord.js"),
   { ContextType, MessageResponseType, TimeoutEnding, ButtonAction } = require("../assets/enums/Enums"),
   pagePayloadBuilder = require("../assets/builders/payload/PagePayloadBuilder"),
   AutoBuildButtons = require("../assets/tools/AutoBuildButtons"),
   filterBuilder = require("../assets/builders/filter/FilterBuilder"),
   disableButtons = require("../assets/tools/DisableButtons"),
   PaginationSession = require("../assets/typedef/PaginationSession");

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
         console.warn("[EPHEMERAL WARNING]: Ephemeral cannot be applied to none interaction messages");
      }

      // Send a warming if a message response type has been changed while using interaction
      if (paginationData.contextType == ContextType.Interaction && paginationData.settings.messageResponseType != MessageResponseType.Send) {
         console.warn("[MESSAGE RESPONSE TYPE WARNING]: Setting a message response type does not affect interactions");
      }

      // Send a warning if loop and disable unusable buttons are enabled together
      if (paginationData.settings.disableUnusableButtons && paginationData.settings.loop) {
         console.warn("[DISABLE UNUSABLE BUTTONS WARNING]: Having loop and disable unusable buttons enabled at the same time makes loop override disable unusable buttons making it do nothing")
      }

      // Create pagination session
      const paginationSession = new PaginationSession(paginationData);

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
            paginationSession.setMessage(await paginationData.context.reply(pagePayloadBuilder(paginationData)));
         } else {
            paginationSession.setMessage(await paginationData.context.channel.send(pagePayloadBuilder(paginationData)));
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
         paginationSession.setMessage(await paginationData.context.editReply(pagePayloadBuilder(paginationData)));
      }

      // Throw an error if there isn't a valid context
      else {
         throw new Error("[HANDLER ERROR]: No context type is set");
      }

      // Create a collector for the buttons used for the pagination
      const collector = paginationSession.message.createMessageComponentCollector({
         filter: filterBuilder,
         time: paginationData.settings.timeout,
         ComponentType: ComponentType.Button
      });

      // Collect any button press and handle then according to button action
      collector.on("collect", async (i) => {
         collector.resetTimer();
         const buttonData = paginationData.buttons.find(button => button.data.custom_id == i.customId);
         if (!i.deferred && !i.replied && buttonData.action !== ButtonAction.Callback) { await i.deferUpdate(); }
         switch (buttonData.action) {
            case ButtonAction.Next:
               await paginationSession.nextPage(i);
               break;
            case ButtonAction.Back:
               await paginationSession.backPage(i);
               break;
            case ButtonAction.Start:
               await paginationSession.startPage(i);
               break;
            case ButtonAction.End:
               await paginationSession.endPage(i);
               break;
            case ButtonAction.Delete:
               await paginationSession.deletePagination();
               collector.stop();
               break;
            case ButtonAction.Callback:
               await paginationData.buttons.find(button => button.data.custom_id == i.customId).callback(paginationData, paginationSession, i);
               break;
            default:
               console.warn("[COLLECTOR WARNING]: No recognised button was pressed");
               break;
         }
      });

      // Wait for the collector to end and handle timeout ending before resolving
      await new Promise((resolve, reject) => {
         collector.once("end", async () => {
            try {
               switch (paginationData.settings.timeoutEnding) {
                  case TimeoutEnding.DeleteButtons:
                     if (paginationSession.message.editable) {
                        await paginationSession.message.edit({ components: [] }).catch(() => { return; });
                     }
                     break;
                  case TimeoutEnding.DeletePagination:
                     if (paginationSession.message.deletable) {
                        await paginationSession.message.delete().catch(() => { return; });
                     }
                     break;
                  case TimeoutEnding.DisableButtons:
                     if (paginationSession.message.editable) {
                        disableButtons(paginationData);
                        await paginationSession.message.edit(pagePayloadBuilder(paginationData, paginationSession.pagePosition, true)).catch(() => { return; });
                     }
                     break;
                  default:
                     throw new Error('[TIMEOUT ENDING ERROR]: Invalid timeout ending type');
               }
               resolve(paginationSession.message);
            } catch (error) {
               reject(error);
            }
         });
      });
   } catch (error) {
      throw new Error("[PAGINATION ERROR]: An error occurred while handling the pagination", { cause: error });
   }
}