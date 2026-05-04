const { MessageFlags } = require("discord.js");

/**
 * The payload data that is sent to discord for the pages
 */
module.exports = class PagePayloadData {
   constructor({ content, embed, component, file, flag }) {
      /**
       * @type {String}
       */
      this.content = content || '';

      /**
       * @type {Array<import('discord.js').EmbedBuilder>}
       */
      this.embeds = embed ? [embed] : [];

      /**
       * @type {Array<import('discord.js').ActionRowBuilder | import('discord.js').ContainerBuilder>}
       */
      this.components = component ? [component] : [];

      /**
       * @type {Array<import('discord.js').AttachmentBuilder>}
       */
      this.files = file ? [file] : [];

      /**
       * @type {Number}
       */
      this.flags = flag || 0;
   }

   /**
    * Adds a component to the page payload
    * @param {import('discord.js').ActionRowBuilder | import('discord.js').ContainerBuilder} component
    * @returns {PagePayloadData}
    */
   addComponent(component) {
      this.components.push(component);
      return this;
   }

   /**
    * Adds a flag to the payload
    * @param {MessageFlags} flag
    * @returns {PagePayloadData}
    */
   addFlag(flag) {
      this.flags = this.flags | flag;
      return this;
   }
}