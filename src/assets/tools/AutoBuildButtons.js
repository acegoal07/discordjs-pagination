const { ButtonStyle } = require("discord.js"),
   PageButtonBuilder = require("../../assets/builders/button/PageButtonBuilder"),
   { ButtonAction } = require("../enums/Enums");

/**
 * Generates predefined buttons
 * @param {import("../typedef/PaginationData")} paginationData
 */
module.exports = function autoBuildButtons(paginationData) {
   try {
      paginationData.buttons = [
         new PageButtonBuilder()
            .setAction(ButtonAction.Back)
            .setLabel("<")
            .setStyle(ButtonStyle.Secondary)
            .setCustomId("back"),
         new PageButtonBuilder()
            .setAction(ButtonAction.Next)
            .setLabel(">")
            .setStyle(ButtonStyle.Secondary)
            .setCustomId("next")
      ];

      if (paginationData.pages.length > 3) {
         paginationData.buttons.unshift(
            new PageButtonBuilder()
               .setAction(ButtonAction.Start)
               .setLabel("<<")
               .setStyle(ButtonStyle.Secondary)
               .setCustomId("start")
         );

         paginationData.buttons.push(
            new PageButtonBuilder()
               .setAction(ButtonAction.End)
               .setLabel(">>")
               .setStyle(ButtonStyle.Secondary)
               .setCustomId("end")
         )
      }

      if (paginationData.settings.autoDeleteButton) {
         paginationData.buttons.push(
            new PageButtonBuilder()
               .setAction(ButtonAction.Delete)
               .setLabel("🗑")
               .setStyle(ButtonStyle.Danger)
               .setCustomId("delete")
         )
      }
   } catch (error) {
      throw new Error("[AUTO BUILD BUTTONS ERROR]:", { cause: error });
   }
}