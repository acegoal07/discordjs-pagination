///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const { MessageEmbed } = require("discord.js");
const InteractionPagination = require('./lib/interaction');
const MessagePagination = require('./lib/message');
const ButtonBuilder = require('./util/buttonBuilder');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Params ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @returns {MessageEmbed[]} The pagination
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// pagination ///////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = pagination = async({
   interaction, message, pageList, buttonList, timeout = 12000,
   replyMessage = false,
   autoDelete = false,
   privateReply = false,
   progressBar = false,
   proSlider = "▣",
   proBar = "▢",
   authorIndependent = false,
   autoButton = false,
   autoDelButton = false,
   selectMenu = false
}) => {
   // Checks
   if (message && interaction) throw new Error("Do not provided both interaction and message only 1 is required");
   if (!pageList) throw new Error("Missing pages");
   if (autoButton && !buttonList) buttonList = await ButtonBuilder(pageList.length, autoDelButton);
   if (!buttonList) throw new Error("Missing buttons");
   if (selectMenu && buttonList || autoButton || autoDelButton) process.emitWarning("SelectMenu overwrites any button settings, remove all button settings to stop getting this message");
   if (timeout < 3000) throw new Error("You have set timeout less then 3000ms which is not allowed");
   if (proSlider.length > 1) throw new Error("You can only use 1 character to represent the progressBar slider");
   if (proBar.length > 1) throw new Error("You can only use 1 character to the progressBar");
   if (buttonList.length < 2) throw new Error("Need provide at least 2 buttons");
   if (buttonList.length > 5) {
      process.emitWarning("More than 5 buttons have been provided the extras will be removed, remove the extra buttons from the buttonList to stop getting this message");
      buttonList = buttonList.slice(0, 5);
   }
   for (const button of buttonList) {if (button.style === "LINK") throw new Error("Link buttons are not supported please check what type of buttons you are using")}
   // Message
   if (typeof message?.author === "object") {
      // Checks
      if (replyMessage && privateReply) process.emitWarning("The privateReply setting overwrites and disables replyMessage setting");
      if (!message && !message.channel) throw new Error("Channel is inaccessible");
      if (pageList.length < 2) {
         if (privateReply) {
            await message.channel.send("The reply has been sent privately");
            return message.author.send({embeds: [pageList[0]]});
         } else {
            return replyMessage ? message.reply({embeds: [pageList[0]]}) : message.channel.send({embeds: [pageList[0]]});
         }
      }
      // Run
      return MessagePagination(message, pageList, buttonList, timeout, replyMessage, autoDelete, privateReply, progressBar, proSlider, proBar, authorIndependent, selectMenu);
   }
   // Interaction
   else if (typeof interaction?.user === "object" || typeof interaction?.member.user === "object" && interaction?.applicationId) {
      // Checks
      if (pageList.length < 2) {
         if (privateReply) {
            await interaction.deferred ? await interaction.editReply("The reply has been sent privately") : await interaction.reply("The reply has been sent privately");
            return interaction.client.users.cache.get(interaction.member.user.id).send({embeds: [pageList[0]]});
         } else {
            return interaction.deferred ? await interaction.editReply({embeds: [pageList[0]]}) : await interaction.reply({embeds: [pageList[0]]});
         }
      }
      if (interaction.ephemeral && buttonList.length === 3 || interaction.ephemeral && buttonList.length === 5) throw new Error("Delete buttons are not supported by embeds with ephemeral enabled");
      if (interaction.ephemeral && autoDelete) throw new Error("Auto delete is not supported by embeds with ephemeral enabled");
      // Run
      return InteractionPagination(interaction, pageList, buttonList, timeout, autoDelete, privateReply, progressBar, proSlider, proBar, authorIndependent, selectMenu);
   }
   // Missing interaction and message
   else {
      throw new Error("Please provide either interaction or message for the pagination to use");
   }
}