const { ContainerBuilder, MessageFlags } = require("discord.js"),
   { PageType } = require("../../enums/Enums"),
   PagePayloadData = require("../../typedef/PagePayloadData");

/**
 * Used to be build a container page for the pagination
 */
module.exports = class ContainerPageBuilder extends ContainerBuilder {
   constructor() {
      super();

      /**
       * Defines the type of page it is
       * @type {PageType}
       */
      this.pageType = PageType.ComponentsV2;

      /**
       * These are flags that are added
       * @type {MessageFlags}
       */
      this.pageFlags = MessageFlags.IsComponentsV2;

      /**
       * Whether or not custom callback buttons should be usable with this page
       * @type {Boolean}
       */
      this.blockCustomButtons = false;
   }

   /**
    * Returns a payload data without buttons
    * @returns {PagePayloadData}
    */
   toPayload() {
      return new PagePayloadData({
         component: this,
         flag: this.pageFlags
      })
   }

   /**
    * Makes it so custom callback buttons are disabled while you are on this page
    */
   blockCustomButtons() {
      this.blockCustomButtons = true;
   }
}