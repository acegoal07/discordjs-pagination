///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const InteractionPagination = require('@acegoal07/discordjs-pagination/lib/interaction');
const MessagePagination = require('@acegoal07/discordjs-pagination/lib/message');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// pagination ///////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = pagination = async ({interaction, message, pages, buttonList, timeout = 12000}) => {
   // Checks
   if (message === undefined && interaction === undefined) throw new Error("Please provide either interaction or message for the pagination to use");
   if (!pages) throw new Error("Missing pages");
   if (!buttonList) throw new Error("Missing buttons");
   if (timeout < 1000) throw new Error("You have set timeout less then 1000ms which is not allowed");
   if (buttonList.length < 2) throw new Error("Need provide at least 2 buttons");
   if (buttonList.length > 5) {
      process.emitWarning("More than 5 buttons have been provided the extras will be removed, remove the extra buttons from the buttonList to stop getting this message");
      buttonList = buttonList.slice(1, 5);
   }
   for (const button of buttonList) {if (button.style === "LINK") throw new Error("Link buttons are not supported please check what type of buttons you are using")}
   // Message
   if (typeof message?.author === "object") {
      // Checks
      if (!message && !message.channel) throw new Error("Channel is inaccessible");
      if (pages.length < 2) return message.channel.send({embeds: [pages[0]]});
      // Run
      return MessagePagination(message, pages, buttonList, timeout);
   }
   // Interaction
   // Checks
   if (pages.length < 2) {
      if (interaction.deferred === true) {
         return interaction.editReply({embeds: [pages[0]]});
      } else {
         return interaction.reply({embeds: [pages[0]]});
      }
   }
   if (interaction === undefined) throw new Error("Please provide either interaction of message for pagination to use");
   // Run
   return InteractionPagination(interaction, pages, buttonList, timeout);
}