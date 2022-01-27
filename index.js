///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const InteractionPagination = require('./lib/interaction');
const MessagePagination = require('./lib/message');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// pagination ///////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = pagination = async ({
   interaction, message, pages, buttonList, 
   timeout = 12000, 
   replyMessage = false, 
   autoDelete = false, 
   privateReply = false,
   progressBar = {
      toggle = false, 
      slider = "▣", 
      bar = "▢"
   }
}) => {
   // Checks
   if (message === undefined && interaction === undefined) throw new Error("Please provide either interaction or message for the pagination to use");
   if (!pages) throw new Error("Missing pages");
   if (!buttonList) throw new Error("Missing buttons");
   if (timeout < 1000) throw new Error("You have set timeout less then 1000ms which is not allowed");
   if (buttonList.length < 2) throw new Error("Need provide at least 2 buttons");
   if (buttonList.length > 5) {
      process.emitWarning("More than 5 buttons have been provided the extras will be removed, remove the extra buttons from the buttonList to stop getting this message");
      buttonList = buttonList.slice(0, 5);
   }
   for (const button of buttonList) {if (button.style === "LINK") throw new Error("Link buttons are not supported please check what type of buttons you are using")}
   // Message
   if (typeof message?.author === "object") {
      // Checks
      if (!message && !message.channel) throw new Error("Channel is inaccessible");
      if (pages.length < 2) return replyMessage ? message.reply({embeds: [pages[0]]}) : message.channel.send({embeds: [pages[0]]});
      if (replyMessage && privateReply) process.emitWarning("The privateReply setting overwrites and disables replyMessage setting");
      // Run
      return MessagePagination(message, pages, buttonList, timeout, replyMessage, autoDelete, privateReply, progressBar);
   }
   // Interaction
   // Checks
   if (pages.length < 2) {
      if (interaction.deferred) {
         return interaction.editReply({embeds: [pages[0]]});
      } else {
         return interaction.reply({embeds: [pages[0]]});
      }
   }
   if (interaction === undefined) throw new Error("Please provide either interaction of message for pagination to use");
   if (interaction.ephemeral && buttonList.length === 3 || interaction.ephemeral && buttonList.length === 5) throw new Error("Delete buttons are not supported by embeds with ephemeral enabled");
   if (interaction.ephemeral && autoDelete) throw new Error("Auto delete is not supported by embeds with ephemeral enabled");
   // Run
   return InteractionPagination(interaction, pages, buttonList, timeout, autoDelete, privateReply, progressBar);
}