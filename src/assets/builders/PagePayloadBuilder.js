const { ActionRowBuilder, MessageFlags } = require('discord.js'),
   { PageType, ContextType } = require('../enums/Enums');

/**
 * @param {import('../typedef/PaginationData')} paginationData
 * @param {Number} pagePosition
 */
module.exports = function pagePayloadBuilder(paginationData, pagePosition = 0) {
   const payload = paginationData.pages[pagePosition].pageType === PageType.embed ?
      {
         embeds: paginationData.pages[pagePosition] == null ? [] : [paginationData.pages[pagePosition].setFooter({ text: `${pagePosition + 1}/${paginationData.pages.length}` })],
         files: paginationData.pages[pagePosition].attachment == null ? [] : [paginationData.pages[pagePosition].attachment]
      } :
      {
         embeds: [],
         files: paginationData.pages[pagePosition].image == null ? [] : [paginationData.pages[pagePosition].image]
      };

   if (paginationData.pages.length > 1) {
      payload.components = [
         new ActionRowBuilder().addComponents(
            paginationData.buttons.map(buttonData => buttonData)
         )
      ];
   }

   if (paginationData.context.type === ContextType.interaction && paginationData.settings.interactionEphemeral && paginationData.context.flags == MessageFlags.Ephemeral) {
      payload.flags = MessageFlags.Ephemeral;
   }

   return payload;
}