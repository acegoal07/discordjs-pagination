const { ContextType, PageType } = require('../assets/enums/Enums'),
   interactionHandler = require('./InteractionHandler'),
   messageHandler = require('./MessageHandler');

const generatePayload = function (page) {
   return page.pageType === PageType.embed ?
      {
         embeds: page.embed == null ? [] : [page.embed],
         files: page.attachment == null ? [] : [page.attachment]
      } :
      {
         embeds: [],
         files: page.image == null ? [] : [page.image]
      };
}

/**
 * @param {import('../assets/typedef/PaginationData')} paginationData
 */
module.exports = async function baseHandler(paginationData) {
   if (paginationData.contextType === ContextType.message) {
      if (!paginationData.context.channel) { throw new Error("[CHANNEL ERROR]: Channel is not accessible"); }

      if (paginationData.pages.length < 2) {
         return paginationData.context.channel.send(generatePayload(paginationData.pages[0]));
      }

      await messageHandler(paginationData);
   } else if (paginationData.contextType === ContextType.interaction) {
      if (!paginationData.context.deferred) {
         await paginationData.context.deferReply();
      }

      if (paginationData.pages.length < 2) {
         return paginationData.context.editReply(generatePayload(paginationData.pages[0]));
      }

      await interactionHandler(paginationData);
   } else {
      throw new Error("[HANDLER ERROR]: No context type is set");
   }
}