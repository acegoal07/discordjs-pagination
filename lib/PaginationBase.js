// Dependencies
const InteractionPagination = require("./InteractionPagination");
const MessagePagination = require("./MessagePagination");
const { AutoButtonCreator, ButtonCreator } = require("../util/ButtonCreator");
const { PageCreator } = require("../util/PageCreator");
const { MessagePayload } = require("discord.js");
// Params
/**
 * The function that prepares the required data and detects whether its a interaction or message pagination
 */
// pagination
module.exports = PaginationBase = async({
   interface, pageList, buttonList, timeout = 12000,
   replyMessage = false,
   autoDelete = false,
   privateReply = false,
   authorIndependent = false,
   pageBuilderInfo = null,
   buttonBuilderInfo = null,
   ephemeral = false,
   progressBar = {
      toggle: false,
      slider: "▣",
      bar: "▢"
   },
   autoButton = {
      toggle: false,
      deleteButton: false
   },
   selectMenu = {
      toggle: false,
      labels: null
   }
}) => {
   try {
      // Checks
      if (!pageList) {
         if (pageBuilderInfo) {
            pageList = await PageCreator(pageBuilderInfo);
         } else {
            throw new Error("PaginationBase ERROR: Missing pages");
         }
      }
      if (!buttonList && !selectMenu.toggle) {
         if (buttonBuilderInfo) {
            buttonList = await ButtonCreator(buttonBuilderInfo);
         } else if (autoButton.toggle && !buttonBuilderInfo) {
            buttonList = await AutoButtonCreator(pageList.length, autoButton.deleteButton);
         } else {
            throw new Error("PaginationBase ERROR: Missing buttons");
         }
      }
      if (selectMenu.toggle && (buttonList || autoButton.toggle || autoButton.deleteButton)) process.emitWarning("PaginationBase WARNING: SelectMenu overwrites any button settings, remove all button settings to stop getting this message");
      if (timeout < 3000) throw new Error("PaginationBase ERROR: You have set timeout less then 3000ms which is not allowed");
      if (progressBar.toggle) {
         if (progressBar.slider.length > 1) throw new Error("PaginationBase ERROR: You can only use 1 character to represent the progressBar slider");
         if (progressBar.bar.length > 1) throw new Error("PaginationBase ERROR: You can only use 1 character to the progressBar");
      }
      if (!selectMenu.toggle) {
         if (buttonList.length < 2) throw new Error("PaginationBase ERROR: Need provide at least 2 buttons");
         if (buttonList.length > 5) {
            process.emitWarning("PaginationBase WARNING: More than 5 buttons have been provided the extras will be removed, remove the extra buttons from the buttonList to stop getting this message");
            buttonList = buttonList.slice(0, 5);
         }
         for (const button of buttonList) {
            if (button.style === "LINK") throw new Error("PaginationBase ERROR: Link buttons are not supported please check what type of buttons you are using");
            if (button.disabled) throw new Error("PaginationBase ERROR: You have provided buttons that are disabled these cant be used to turn pages, make sure the buttons you are trying to use are enabled");
         }         
      }
      // Interaction
      if (new MessagePayload(interface).isInteraction) {
         // Checks
         if (pageList.length < 2) {
            if (privateReply) {
               await interface.deferred ? await interface.editReply("The reply has been sent privately") : await interface.reply({ content: "The reply has been sent privately", ephemeral: ephemeral});
               return interface.client.users.cache.get(interface.member.user.id).send({embeds: [pageList[0]]});
            } else {
               return interface.deferred ? await interface.editReply({embeds: [pageList[0]]}) : await interface.reply({embeds: [pageList[0]]});
            }
         }
         if (interface.ephemeral) {
            if (buttonList.length === 3 || buttonList.length === 5) {
               throw new Error("PaginationBase ERROR: Delete buttons are not supported by embeds with ephemeral enabled");
            }
            if (autoDelete) {
               throw new Error("PaginationBase ERROR: Auto delete is not supported by embeds with ephemeral enabled");
            }
            if (ephemeral) {
               process.emitWarning("PaginationBase WARNING: The interaction already has ephemeral enable meaning the pagination does not require the setting enabled");
            }
         }
         // Run
         return Promise.resolve(InteractionPagination(interface, pageList, buttonList, timeout, autoDelete, privateReply, progressBar, authorIndependent, selectMenu, ephemeral));
      }
      // Message
      // Checks
      if (replyMessage && privateReply) process.emitWarning("PaginationBase WARNING: The privateReply setting overwrites and disables replyMessage setting");
      if (!interface.channel) throw new Error("PaginationBase ERROR: Channel is inaccessible");
      if (pageList.length < 2) {
         if (privateReply) {
            await interface.channel.send("The reply has been sent privately");
            return interface.author.send({embeds: [pageList[0]]});
         } else {
            return replyMessage ? interface.reply({embeds: [pageList[0]]}) : interface.channel.send({embeds: [pageList[0]]});
         }
      }
      // Run
      return Promise.resolve(MessagePagination(interface, pageList, buttonList, timeout, replyMessage, autoDelete, privateReply, progressBar, authorIndependent, selectMenu));
   } catch(error) {
      return console.log(`Error occured with ${__filename.split(/[\\/]/).pop().replace(".js","")} ${error}`)
   }
}