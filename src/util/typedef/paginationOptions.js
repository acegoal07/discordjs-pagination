module.exports = class PaginationOptions {
   constructor() {
      this.timeout = 20000;
      this.replyMessage = false;
      this.autoDelete = false;
      this.privateReply = false;
      this.authorIndependent = false;
      this.ephemeral = false;
      this.disabledButtons = true;
      this.imageList = false;
      this.autoButton = {
         toggle: false,
         deleteButton: false
      };
      this.progressBar = {
         toggle: false,
         slider: "▣",
         bar: "▢"
      };
      this.selectMenu = {
         toggle: false,
         useTitle: false,
         labels: null
      };
   }
};