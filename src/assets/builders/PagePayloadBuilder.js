const { ActionRowBuilder, MessageFlags } = require('discord.js'),
   { PageType, ContextType } = require('../enums/Enums');

/**
 * @param {import('../typedef/PaginationData')} paginationData
 * @param {Number} pagePosition
 */
module.exports = function pagePayloadBuilder(paginationData, pagePosition = 0) {
   let payload;
   const pageData = paginationData.pages[pagePosition];
   switch (paginationData.pages[pagePosition].pageType) {
      case PageType.Embed:
         payload = {
            content: "",
            embeds: pageData == null ? [] : [pageData.setFooter({ text: `${pagePosition + 1}/${paginationData.pages.length}` })],
            files: pageData.attachment == null ? [] : [pageData.attachment]
         }
         break;
      case PageType.Image:
         payload = {
            content: "",
            embeds: [],
            files: pageData.image == null ? [] : [pageData.image]
         }
         break;
      case PageType.Text:
         payload = {
            content: pageData.text,
            embeds: [],
            files: []
         }
         break;
      default:
         throw new TypeError("[TYPE ERROR]: The page type is not a valid type");
   }

   if (paginationData.context.type === ContextType.Interaction && paginationData.settings.interactionEphemeral && paginationData.context.flags == MessageFlags.Ephemeral) {
      payload.flags = MessageFlags.Ephemeral;
   }

   if (paginationData.pages.length > 1) {
      payload.components = [
         new ActionRowBuilder().addComponents(paginationData.buttons)
      ];
   }

   return payload;
}