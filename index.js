///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const InteractionPagination = require('@acegoal07/discordjs-pagination/lib/interaction');
const MessagePagination = require('@acegoal07/discordjs-pagination/lib/message');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// pagination ///////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = pagination = async ({interaction, message, pages, buttonList, timeout = 12000}) => {
   // Checks
   if (message === undefined && interaction === undefined) throw new Error("Please provide either interaction or message for the pagination to use");
   if (!pages) throw new Error("Missing pages");
   if (!buttonList) throw new Error("Missing buttons");
   if (timeout < 1000) throw new Error("You have provided a timeout less then 1000ms which is not allowed");
   for (const button of buttonList) {if (button.style === "LINK") throw new Error("Link buttons are not supported please check what type of buttons you are using")}
   if (buttonList.length < 2) throw new Error("Need provide at least 2 buttons");
   if (buttonList.length > 5) {
      new Error("More than 5 buttons have been provided the extras will be removed");
      buttonList = buttonList.slice(1, 5);
   }
   // Pass on
   if (message === undefined) {return InteractionPagination(interaction, pages, buttonList, timeout)}
   else if (interaction === undefined) {return MessagePagination(message, pages, buttonList, timeout)}
   else {throw new Error("The pagination was unable to run")}
}