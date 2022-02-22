///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const { MessageEmbed } = require("discord.js");
const InteractionPagination = require('./lib/interaction');
const MessagePagination = require('./lib/message');
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
   authorIndependent = false
}) => {
   // Checks
   if (!pageList) throw new Error("Missing pages");
   if (!buttonList) throw new Error("Missing buttons");
   if (timeout < 1000) throw new Error("You have set timeout less then 1000ms which is not allowed");
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
      return MessagePagination(message, pageList, buttonList, timeout, replyMessage, autoDelete, privateReply, progressBar, proSlider, proBar, authorIndependent);
   }
   // Interaction
   else if (typeof interaction?.user === "object" || typeof interaction?.member.user === "object") {
      // Checks
      if (pageList.length < 2) {
         if (privateReply) {
            await interaction.deferred ? await interaction.editReply("The reply has been sent privately") : await interaction.reply("The reply has been sent privately");
            return interaction.client.users.cache.get(interaction.member.user.id).send({embeds: [pageList[0]]});
         } else {
            return interaction.deferred ? await interaction.editReply({embeds: [pageList[0]]}) : await interaction.reply({embeds: [pageList[0]]});
         }
      }
      if (interaction === undefined) throw new Error("Please provide either interaction or message for pagination to use");
      if (interaction.ephemeral && buttonList.length === 3 || interaction.ephemeral && buttonList.length === 5) throw new Error("Delete buttons are not supported by embeds with ephemeral enabled");
      if (interaction.ephemeral && autoDelete) throw new Error("Auto delete is not supported by embeds with ephemeral enabled");
      // Run
      return InteractionPagination(interaction, pageList, buttonList, timeout, autoDelete, privateReply, progressBar, proSlider, proBar, authorIndependent);
   }
   // Missing interaction and message
   else {
      throw new Error("Please provide either interaction or message for the pagination to use");
   }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const { Message, Interaction } = require('discord.js');
const paginationBase = require('../index');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Wrapper ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = class paginationWrapper {
   // Constructor
   constructor() {
      this.message = null,
      this.interaction = null,
      this.pageList = null,
      this.buttonList = null,
      this.timeout = 12000,
      this.replyMessage = false,
      this.autoDelete = false,
      this.privateReply = false,
      this.progressBar = false,
      this.proSlider = "▣",
      this.proBar = "▢",
      this.authorIndependent = false,
      this.pagination = null
   }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Required //////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // Set message interface
   /**
    * Set the message interface for the pagination
    * @param {Message} message
    * @returns {paginationWrapper}
    */
   setMessage(message) {
      // Checks
      if (!message?.author) throw new Error("The message you have provided is incorrect");
      // Set and return
      this.message = message;
      return this;
   }
   // Set interaction interface
   /**
    * Set the interaction interface for the pagination
    * @param {Interaction} interaction 
    * @returns {paginationWrapper}
    */
   setInteraction(interaction) {
      // Checks
      if (!interaction?.applicationID) throw new Error("The interaction you have provided is incorrect");
      // Set and return
      this.interaction = interaction;
      return this;
   }
   // Set ButtonList
   /**
    * Set the buttonList for the pagination
    * @param {Object[]} buttonList 
    * @returns {paginationWrapper}
    */
   setButtonList(buttonList) {
      // Checks
      if (!buttonList) throw new Error("The buttonList you have provided is empty");
      if (!typeof buttonList === "object") throw new Error("The buttonList you have provided is not an object");
      if (buttonList.length < 2) throw new Error("You need to provided a minimum of 2 buttons");
      // Set and return
      this.buttonList = buttonList;
      return this;
   }
   // Set pageList
   /**
    * Set the pageList for the pagination
    * @param {Object[]} pageList 
    * @returns {paginationWrapper}
    */
   setPageList(pageList) {
      // Checks
      if (!pageList) throw new Error("The pageList you have provided is empty");
      if (!typeof pageList === "object") throw new Error("The pageList you have provided is not an object");
      // Set and return
      this.pageList = pageList;
      return this;
   }
   // Run pagination
   /**
    * Run the pagination
    * @returns {paginationWrapper}
    */
   async paginate() {
      // Checks
      if (!this.message && !this.interaction) throw new Error("You have not provided an interface to use");
      if (!this.buttonList) throw new Error("You have not provided a buttonList to use");
      if (!this.pageList) throw new Error("You have not provided a pageList to use");
      if (this.interaction && this.replyMessage) process.emitWarning("replyMessage can't be used by an interaction pagination");
      // Set and return
      this.pagination = await paginationBase(this);
      return this;
   }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Optional ////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
   // Set timeout time
   /**
    * How many milliseconds the pagination should run for
    * @param {Number} timeout
    * @returns {paginationWrapper}
    */
   setTimeout(timeout) {
      // Checks
      if (timeout <= 3000) throw new Error("The time set can't be less than 3000ms");
      if (!typeof timeout === "number") throw new Error("The time provided is not a number");
      // Set and return
      if (!timeout) {
         process.emitWarning("You did not provide a timeout to set so it has defaulted to 12000ms");
      } else {
         this.timeout = timeout;
      }
      return this;
   }
   // Set progressBar
   /**
    * Allows you to enable and edit a progressBar for the pagination
    * @param {Boolean} progressBar 
    * @param {String} proSlider 
    * @param {String} proBar 
    * @returns {paginationWrapper}
    */
    setProgressBar(proSlider = "▣", proBar = "▢") {
      // Checks
      if (!typeof proSlider === "string") throw new Error("The proSlider you have provided is not a string");
      if (proSlider.length > 1 || proSlider.length < 1) throw new Error("The proSlider must be 1 character");
      if (!typeof proBar === "string") throw new Error("The proBar you have provided is not a string");
      if (proBar.length > 1 || proBar.length < 1) throw new Error("The proBar must be 1 character");
      // Set and return
      this.progressBar = true;
      this.proSlider = proSlider;
      this.proBar = proBar;
      return this;
   }
   // Set replyMessage
   /**
    * Enables replyMessage on the pagination
    * @returns {paginationWrapper}
    */
   setReplyMessage() {
      // Set and return
      this.replyMessage = true;
      return this;
   }
   // Set autoDelete
   /**
    * Enables autoDelete on the pagination
    * @returns {paginationWrapper}
    */
   setAutoDelete() {
      // Set and return
      this.autoDelete = true;
      return this;
   }
   // Set privateReply
   /**
    * Enables privateReply on the pagination
    * @returns {paginationWrapper}
    */
   setPrivateReply() {
      // Set and return
      this.privateReply = true;
      return this;
   }
   // Set authorIndependent
   /**
    * Enables authorIndependent for your pagination
    * @returns {paginationWrapper}
    */
   setAuthorIndependent() {
      // Set and return
      this.authorIndependent = true;
      return this;
   }
}