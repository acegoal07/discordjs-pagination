const { MessageFlags } = require('discord.js'),
   { ContextType } = require('../assets/enums/Enums'),
   interactionHandler = require('./InteractionHandler'),
   messageHandler = require('./MessageHandler'),
   pagePayloadBuilder = require('../assets/builders/PagePayloadBuilder'),
   AutoBuildButtons = require('../assets/tools/AutoBuildButtons');

/**
 * @param {import('../assets/typedef/PaginationData')} paginationData
 */
module.exports = async function baseHandler(paginationData) {
   if (paginationData.pages.length == 0) {
      throw new Error("[PAGE ERROR]: No pages have bee passed into the pagination");
   }

   if (paginationData.buttons.length == 0) {
      AutoBuildButtons(paginationData);
   }

   if (paginationData.contextType == ContextType.Message && paginationData.settings.interactionEphemeral) {
      console.warn("[EPHEMERAL ERROR]: Ephemeral cannot be applied to none interaction messages");
   }

   if (paginationData.contextType === ContextType.Message) {
      if (!paginationData.context.channel) { throw new Error("[CHANNEL ERROR]: Channel is not accessible"); }

      if (paginationData.pages.length < 2) {
         return paginationData.context.channel.send(pagePayloadBuilder(paginationData));
      }

      await messageHandler(paginationData);
   } else if (paginationData.contextType === ContextType.Interaction) {
      if (!paginationData.context.deferred) {
         await paginationData.context.deferReply(paginationData.settings.interactionEphemeral ? { flags: MessageFlags.Ephemeral } : {});
      }

      if (paginationData.pages.length < 2) {
         return paginationData.context.editReply(pagePayloadBuilder(paginationData));
      }

      await interactionHandler(paginationData);
   } else {
      throw new Error("[HANDLER ERROR]: No context type is set");
   }
}