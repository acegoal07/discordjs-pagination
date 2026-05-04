const { ActionRowBuilder, MessageFlags, ContainerBuilder } = require('discord.js'),
   { PageType, ContextType } = require('../enums/Enums'),
   PagePayloadData = require('../typedef/PagePayloadData');

/**
 * @param {import('../typedef/PaginationData')} paginationData
 * @param {Number} pagePosition
 * @returns {PagePayloadData}
 */
module.exports = function pagePayloadBuilder(paginationData, pagePosition = 0) {
   try {
      let payload;
      const pageData = paginationData.pages[pagePosition];
      switch (paginationData.pages[pagePosition].pageType) {
         case PageType.Embed:
            payload = new PagePayloadData({
               embed: pageData,
               file: pageData.attachment
            });
            break;
         case PageType.Image:
            payload = new PagePayloadData({
               file: pageData.image
            });
            break;
         case PageType.Text:
            payload = new PagePayloadData({
               content: pageData.text
            });
            break;
         case PageType.Container:
            payload = new PagePayloadData({
               component: pageData,
               flag: pageData.pageFlags
            });
            break;
         default:
            throw new TypeError("[TYPE ERROR]: The page type is not a valid type");
      }

      if ((paginationData.context.type === ContextType.Interaction && paginationData.settings.interactionEphemeral) || paginationData.context.flags == MessageFlags.Ephemeral) {
         payload.addFlag(MessageFlags.Ephemeral);
      }

      if (paginationData.pages.length >= 2) {
         payload.addComponent(pageData.pageType == PageType.Container ? new ContainerBuilder().addActionRowComponents(new ActionRowBuilder().addComponents(paginationData.buttons)) : new ActionRowBuilder().addComponents(paginationData.buttons));
      }

      return payload;
   } catch (error) {
      throw new Error("[PAGE PAYLOAD BUILDER ERROR]:", error);
   }
}