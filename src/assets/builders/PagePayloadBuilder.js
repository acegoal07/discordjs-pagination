const { ActionRowBuilder, MessageFlags, ContainerBuilder } = require('discord.js'),
   { PageType, ContextType } = require('../enums/Enums');

/**
 * @param {import('../typedef/PaginationData')} paginationData
 * @param {Number} pagePosition
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
               components: [new ActionRowBuilder().addComponents(paginationData.buttons)],
               files: pageData.attachment == null ? [] : [pageData.attachment],
               flags: []
            };
            break;
         case PageType.Image:
            payload = {
               content: "",
               embeds: [],
               components: [new ActionRowBuilder().addComponents(paginationData.buttons)],
               files: pageData.image == null ? [] : [pageData.image],
               flags: []
            };
            break;
         case PageType.Text:
            payload = {
               content: pageData.text,
               embeds: [],
               components: [new ActionRowBuilder().addComponents(paginationData.buttons)],
               files: [],
               flags: []
            };
            break;
         case PageType.Container:
            payload = {
               content: "",
               embeds: [],
               components: pageData == null ? [] : [pageData, new ContainerBuilder().addActionRowComponents(new ActionRowBuilder().addComponents(paginationData.buttons))],
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

      return payload;
   } catch (error) {
      throw new Error("[PAGE PAYLOAD BUILDER ERROR]:", error);
   }
}