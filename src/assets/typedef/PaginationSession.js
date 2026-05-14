const pagePayloadBuilder = require("../builders/payload/PagePayloadBuilder");

module.exports = class PaginationSession {
   /**
    * Handles all the page progress for the pagination
    * @param {import("./PaginationData")} paginationData
    */
   constructor(paginationData) {
      /**
       * @type {import("./PaginationData")}
       */
      this.paginationData = paginationData;
   }

   /**
    * The message being used for the pagination
    * @type {import("discord.js").Message}
    */
   message = null;

   /**
    * Set's the message being used for the pagination
    * @param {import("discord.js").Message} message
    * @returns {PaginationSession}
    */
   setMessage(message) {
      if (!this.message) {
         this.message = message;
      }
      return this;
   }

   /**
    * The page position
    * @type {Number}
    */
   pagePosition = 0;

   /**
    * Goes to the next page
    * @param {import("discord.js").Interaction} interaction
    */
   async nextPage(interaction) {
      if ((this.pagePosition + 1) === this.paginationData.pages.length) {
         if (this.paginationData.settings.loop) {
            this.pagePosition = 0;
         } else {
            return;
         }
      } else {
         this.pagePosition++;
      }
      await this.updatePagination(interaction);
   }

   /**
    * Goes to the previous page
    * @param {import("discord.js").Interaction} interaction
    */
   async backPage(interaction) {
      if (this.pagePosition === 0) {
         if (this.paginationData.settings.loop) {
            this.pagePosition = this.paginationData.pages.length - 1;
         } else {
            return;
         }
      } else {
         this.pagePosition--;
      }
      await this.updatePagination(interaction);
   }

   /**
    * Goes to the first page
    * @param {import("discord.js").Interaction} interaction
    */
   async startPage(interaction) {
      if (this.pagePosition !== 0) {
         this.pagePosition = 0;
         await this.updatePagination(interaction);
      }
   }

   /**
    * Goes to the last page
    * @param {import("discord.js").Interaction} interaction
    */
   async endPage(interaction) {
      if (this.pagePosition !== this.paginationData.pages.length - 1) {
         this.pagePosition = (this.paginationData.pages.length - 1);
         await this.updatePagination(interaction);
      }
   }

   /**
    * Goes to the page number given
    * @param {Number} pageNumber
    * @param {import("discord.js").Interaction} interaction
    */
   async goToPage(interaction, pageNumber) {
      if (pageNumber > 0 && pageNumber <= this.paginationData.pages.length) {
         this.pagePosition = pageNumber - 1;
         await this.updatePagination(interaction);
      }
   }

   /**
    * Delete's the pagination
    */
   async deletePagination() {
      if (this.message.deletable) {
         await this.message.delete();
      }
   }

   /**
    * Updates the pagination with the new information
    * @param {import("discord.js").Interaction} interaction
    */
   async updatePagination(interaction) {
      await interaction.editReply(pagePayloadBuilder(this.paginationData, this.pagePosition)).catch(error => console.log(error));
   }
}