const { ActionRowBuilder, MessageFlags, ContainerBuilder } = require('discord.js'),
   { PageType, ContextType } = require('../enums/Enums');

/**
 * @param {import('../typedef/PaginationData')} paginationData
 * @param {Number} pagePosition
 * @returns {Object}
 */
module.exports = function pagePayloadBuilder(paginationData, pagePosition = 0) {
   try {
      let payload;
      const pageData = paginationData.pages[pagePosition];
      switch (paginationData.pages[pagePosition].pageType) {
         case PageType.Embed:
            payload = {
               content: "",
               embeds: pageData == null ? [] : [pageData],
               components: [],
               files: pageData.attachment == null ? [] : [pageData.attachment],
               flags: 0
            };
            break;
         case PageType.Image:
            payload = {
               content: "",
               embeds: [],
               components: [],
               files: pageData.image == null ? [] : [pageData.image],
               flags: 0
            };
            break;
         case PageType.Text:
            payload = {
               content: pageData.text,
               embeds: [],
               components: [],
               files: [],
               flags: 0
            };
            break;
         case PageType.Container:
            payload = {
               content: "",
               embeds: [],
               components: pageData == null ? [] : [pageData],
               files: [],
               flags: pageData.pageFlags
            };
            break;
         default:
            throw new TypeError("[TYPE ERROR]: The page type is not a valid type");
      }

      if ((paginationData.context.type === ContextType.Interaction && paginationData.settings.interactionEphemeral) || paginationData.context.flags == MessageFlags.Ephemeral) {
         payload.flags = payload.flags | MessageFlags.Ephemeral;
      }

      if (paginationData.pages.length >= 2) {
         payload.components.push(pageData.pageType == PageType.Container ? new ContainerBuilder().addActionRowComponents(new ActionRowBuilder().addComponents(paginationData.buttons)) : new ActionRowBuilder().addComponents(paginationData.buttons))
      }

      return payload;
   } catch (error) {
      throw new Error("[PAGE PAYLOAD BUILDER ERROR]:", error);
   }
}