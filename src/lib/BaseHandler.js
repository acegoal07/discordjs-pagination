const { ContextType, PageType } = require('../assets/enums/Enums'),
   interactionHandler = require('./InteractionHandler'),
   messageHandler = require('./MessageHandler');

/**
 * @param {import('../assets/typedef/PaginationData')} paginationData
 */
module.exports = async function baseHandler(paginationData) {
   if (paginationData.contextType === ContextType.message) {
      if (!paginationData.context.channel) { throw new Error("[CHANNEL ERROR]: Channel is not accessible"); }

      const payload =
         paginationData.pages[0].pageType == PageType.embed ?
            paginationData.pages[0].attachment == null ?
               {
                  embeds: paginationData.pages[0].embed
               } :
               {
                  embeds: paginationData.pages[0].embed,
                  files: paginationData.pages[0].attachment
               } :
            {
               files: paginationData.pages[0].image
            }

      if (paginationData.pages.length < 2) {
         return paginationData.context.channel.send(payload);
      }

      await messageHandler(paginationData);
   } else if (paginationData.contextType === ContextType.interaction) {
      if (!paginationData.context.deferred) {
         await paginationData.context.deferReply();
      }

      const payload =
         paginationData.pages[0].pageType == PageType.embed ?
            paginationData.pages[0].attachment == null ?
               {
                  embeds: paginationData.pages[0].embed
               } :
               {
                  embeds: paginationData.pages[0].embed,
                  files: paginationData.pages[0].attachment
               } :
            {
               files: paginationData.pages[0].image
            }

      if (paginationData.pages.length < 2) {
         return paginationData.context.editReply(payload);
      }

      await interactionHandler(paginationData);
   } else {
      throw new Error("[HANDLER ERROR]: No context type is set");
   }
}