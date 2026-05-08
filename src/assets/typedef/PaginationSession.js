module.exports = class PaginationSession {
   /**
    * Handles all the page progress for the pagination
    * @param {Boolean} loop
    * @param {Number} totalPages
    */
   constructor(loop, totalPages) {
      /**
       * Whether loop is enabled or not
       * @type {Boolean}
       */
      this.loop = loop;

      /**
       * How many pages there are
       * @type {Number}
       */
      this.totalPages = totalPages;
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
      if (this.message) {
         return;
      }
      this.message = message;
      return this;
   }

   /**
    * The page position
    * @type {Number}
    */
   pagePosition = 0;

   /**
    * Goes to the next page
    * @returns {Boolean} Whether or not the page number was changed
    */
   nextPage() {
      if ((this.pagePosition + 1) === this.totalPages) {
         if (this.settings.loop) {
            this.pagePosition = 0;
         } else {
            return false;
         }
      } else {
         this.pagePosition++;
      }
      return true;
   }

   /**
    * Goes to the previous page
    * @returns {Boolean} Whether or not the page number was changed
    */
   backPage() {
      if (this.pagePosition === 0) {
         if (this.settings.loop) {
            this.pagePosition = this.totalPages - 1;
         } else {
            return false
         }
      } else {
         this.pagePosition--;
      }
      return true;
   }

   /**
    * Goes to the first page
    * @returns {Boolean} Whether or not the page number was changed
    */
   startPage() {
      if (this.pagePosition !== 0) {
         this.pagePosition = 0;
         return true;
      }
      return false;
   }

   /**
    * Goes to the last page
    * @returns {Boolean} Whether or not the page number was changed
    */
   endPage() {
      if (this.pagePosition !== this.totalPages) {
         this.pagePosition = (this.totalPages - 1);
         return true;
      }
      return false;
   }

   /**
    * Goes to the page number given
    * @param {Number} pageNumber
    * @returns {Boolean} Whether or not the page number was changed
    */
   goToPage(pageNumber) {
      if (this.totalPages >= pageNumber) {
         this.pagePosition = pageNumber - 1;
         return true;
      }
      return false;
   }
}