const { ContainerBuilder, MessageFlags } = require("discord.js"),
   { PageType } = require("../enums/Enums");

module.exports = class ContainerPageBuilder extends ContainerBuilder {
   constructor() {
      super();

      /**
       * Defines the type of page it is
       * @type {PageType}
       */
      this.pageType = PageType.Container;

      /**
       * These are flags that are added
       * @type {MessageFlags}
       */
      this.pageFlags = MessageFlags.IsComponentsV2;
   }
}