const { ActionRowBuilder, MessageFlags, ContainerBuilder } = require('discord.js'),
   { PageType, ContextType } = require('../enums/Enums'),
   PagePayloadData = require('../typedef/PagePayloadData');

/**
 * Build's the payload sent to discord for the pages
 * @param {import('../typedef/PaginationData')} paginationData
 * @param {Number} pagePosition
 * @returns {PagePayloadData}
 */
module.exports = function pagePayloadBuilder(paginationData, pagePosition = 0) {
   try {
      // The stored payload
      let payload;

      // The page data
      const pageData = paginationData.pages[pagePosition];

      // Switch to handle how the payload data is laid out depending on page type
      switch (paginationData.pages[pagePosition].pageType) {
         case PageType.Embed:
            payload = new PagePayloadData({
               embed: pageData.setFooter({ text: `page ${pagePosition + 1}/${paginationData.pages.length}` }),
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

      // If ephemeral setting is enabled or if it is already added to the defer adds it to the page flags
      if ((paginationData.context.type === ContextType.Interaction && paginationData.settings.interactionEphemeral) || paginationData.context.flags == MessageFlags.Ephemeral) {
         payload.addFlag(MessageFlags.Ephemeral);
      }

      // Adds pagination buttons if there are 2 or more pages
      if (paginationData.pages.length >= 2) {
         if (pageData.pageType == PageType.Container) {
            payload.addComponent(new ContainerBuilder().addTextDisplayComponents(text => text.setContent(`page ${pagePosition + 1}/${paginationData.pages.length}`)).addActionRowComponents(new ActionRowBuilder().addComponents(paginationData.buttons)));
         } else {
            payload.addComponent(new ActionRowBuilder().addComponents(paginationData.buttons));
         }
      }

      return payload;
   } catch (error) {
      throw new Error("[PAGE PAYLOAD BUILDER ERROR]:", error);
   }
}