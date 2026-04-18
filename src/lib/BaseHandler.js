const { ContextType, PageType } = require('../assets/enums/Enums'),
   interactionHandler = require('./InteractionHandler'),
   messageHandler = require('./MessageHandler'),
   pagePayloadBuilder = require('../assets/tools/PagePayloadBuilder');

/**
 * @param {import('../assets/typedef/PaginationData')} paginationData
 */
module.exports = async function baseHandler(paginationData) {
   if (paginationData.contextType === ContextType.message) {
      if (!paginationData.context.channel) { throw new Error("[CHANNEL ERROR]: Channel is not accessible"); }

      if (paginationData.pages.length < 2) {
         return paginationData.context.channel.send(pagePayloadBuilder(paginationData));
      }

      await messageHandler(paginationData);
   } else if (paginationData.contextType === ContextType.interaction) {
      if (!paginationData.context.deferred) {
         await paginationData.context.deferReply();
      }

      if (paginationData.pages.length < 2) {
         return paginationData.context.editReply(pagePayloadBuilder(paginationData));
      }

      await interactionHandler(paginationData);
   } else {
      throw new Error("[HANDLER ERROR]: No context type is set");
   }
}