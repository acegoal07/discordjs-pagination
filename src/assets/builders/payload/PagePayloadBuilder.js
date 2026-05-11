const { ActionRowBuilder, MessageFlags, ContainerBuilder } = require("discord.js"),
   { ContextType, PageType, ButtonAction } = require("../../enums/Enums"),
   PagePayloadData = require("../../typedef/PagePayloadData");

/**
 * Build's the payload sent to discord for the pages
 * @param {import("../../typedef/PaginationData")} paginationData
 * @param {Number} pagePosition
 * @param {Boolean} ignoreDisableUnusable
 * @returns {PagePayloadData}
 */
module.exports = function pagePayloadBuilder(paginationData, pagePosition = 0, ignoreDisableUnusable = false) {
   try {
      // The page data
      const pageData = paginationData.pages[pagePosition];

      // Get payload from builder
      const payload = pageData.toPayload() ?? null;

      // Check whether data has been sent from the builder
      if (!payload) {
         throw new Error("[PAGE PAYLOAD BUILDER ERROR]: No payload data sent from builder");
      }

      // Handles disable unusable button logic
      if (paginationData.settings.disableUnusableButtons && !paginationData.settings.loop && !ignoreDisableUnusable) {
         if (pagePosition === 0) {
            paginationData.buttons.forEach(button => {
               if (button.action === ButtonAction.Back || button.action === ButtonAction.Start) {
                  button.setDisabled(true);
               } else {
                  button.setDisabled(false);
               }
            });
         } else if (paginationData.pages.length === (pagePosition + 1)) {
            paginationData.buttons.forEach(button => {
               if (button.action === ButtonAction.Next || button.action === ButtonAction.End) {
                  button.setDisabled(true);
               } else {
                  button.setDisabled(false);
               }
            });
         } else {
            paginationData.buttons.forEach(button => {
               button.setDisabled(false);
            });
         }
      }

      // Adds pagination buttons if there are 2 or more pages
      if (paginationData.pages.length >= 2) {
         if (pageData.pageType == PageType.ComponentsV2) {
            payload.addComponent(new ContainerBuilder().addActionRowComponents(new ActionRowBuilder().addComponents(paginationData.buttons)));
         } else {
            payload.addComponent(new ActionRowBuilder().addComponents(paginationData.buttons));
         }
      }

      // If ephemeral setting is enabled or if it is already added to the defer adds it to the page flags
      if ((paginationData.contextType === ContextType.Interaction && paginationData.settings.interactionEphemeral) || paginationData.context.flags == MessageFlags.Ephemeral) {
         payload.addFlag(MessageFlags.Ephemeral);
      }

      return payload;
   } catch (error) {
      throw new Error("[PAGE PAYLOAD BUILDER ERROR]:", { cause: error });
   }
}