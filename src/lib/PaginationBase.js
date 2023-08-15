// Dependencies
const { MessagePayload } = require("discord.js"),
   { InteractionPagination } = require("./InteractionPagination"),
   { MessagePagination } = require("./MessagePagination"),
   { AutoButtonCreator, ButtonCreator } = require("../util/ButtonCreator"),
   { PageCreator } = require("../util/PageCreator");
// Params
/**
 * The function that prepares the required data and detects whether its a interaction or message pagination
 * @returns {Promise.<import("discord.js").EmbedBuilder[]>}
 */
// pagination
exports.PaginationBase = async({
   paginationInfo = {
      // Interfaces
      portal: null,
      // Required inputs
      pageList: null,
      imageList: null,
      buttonList: null,
      // Pagination
      pagination: null
   },
   options = {
      // General options
      timeout: 12000,
      replyMessage: false,
      autoDelete: false,
      privateReply: false,
      authorIndependent: false,
      pageBuilderData: null,
      buttonBuilderData: null,
      disabledButtons: true,
      imageList: false,
      ephemeral: false,
      // AutoButton settings
      autoButton: {
         toggle: false,
         deleteButton: false
      },
      // ProgressBar settings
      progressBar: {
         toggle: false,
         slider: "▣",
         bar: "▢"
      },
      // SelectMenu settings
      selectMenu: {
         toggle: false,
         labels: [],
         useTitle: false
      }
   }
}) => {
   try {
      // Checks
      if (!paginationInfo.pageList && !paginationInfo.imageList) {
         if (options.pageBuilderData) {
            paginationInfo.pageList = await PageCreator(options.pageBuilderData);
         } else {
            throw new Error("PaginationBase ERROR: Missing pages or images");
         }
      }
      if (paginationInfo.pageList && paginationInfo.imageList) {
         throw new Error("PaginationBase ERROR: A pageList and a imageList has been provided only one can at a time");
      }
      const pageLength = options.imageList ? paginationInfo.imageList.length : paginationInfo.pageList.length;
      if (!paginationInfo.buttonList && !options.selectMenu.toggle) {
         if (options.buttonBuilderData) {
            paginationInfo.buttonList = await ButtonCreator(options.buttonBuilderData);
         } else if (options.autoButton.toggle && !options.buttonBuilderData) {
            paginationInfo.buttonList = await AutoButtonCreator(pageLength, options.autoButton.deleteButton);
         } else {
            throw new Error("PaginationBase ERROR: Missing buttons");
         }
      }
      if (options.selectMenu.toggle && (paginationInfo.buttonList || options.autoButton.toggle || options.autoButton.deleteButton)) {process.emitWarning("PaginationBase WARNING: SelectMenu overwrites any button settings, remove all button settings to stop getting this message");}
      if (options.progressBar.toggle) {
         if (options.progressBar.slider.length > 1) {throw new Error("PaginationBase ERROR: You can only use 1 character to represent the progressBar slider");}
         if (options.progressBar.bar.length > 1) {throw new Error("PaginationBase ERROR: You can only use 1 character to the progressBar");}
      }
      if (!options.selectMenu.toggle) {
         if (paginationInfo.buttonList.length < 2) {throw new Error("PaginationBase ERROR: Need provide at least 2 buttons");}
         if (paginationInfo.buttonList.length > 5) {
            process.emitWarning("PaginationBase WARNING: More than 5 buttons have been provided the extras will be removed, remove the extra buttons from the buttonList to stop getting this message");
            paginationInfo.buttonList = paginationInfo.buttonList.slice(0, 5);
         }
         for (const button of paginationInfo.buttonList) {
            if (button.style === "LINK") {throw new Error("PaginationBase ERROR: Link buttons are not supported please check what type of buttons you are using");}
            if (button.disabled) {throw new Error("PaginationBase ERROR: You have provided buttons that are disabled these cant be used to turn pages, make sure the buttons you are trying to use are enabled");}
         }
      } else {
         if (!options.selectMenu.labels) {
            const labelData = [];
            if (options.selectMenu.useTitle) {
               for (const page of paginationInfo.pageList) {
                  labelData.push(`${page.data.title}`);
               }
            } else {
               for (let i=0; i<pageLength + 1; i++) {
                  labelData.push(`Page ${i + 1}`);
               }
            }
            options.selectMenu.labels = labelData;
         }
      }
      // Interaction
      if (new MessagePayload(paginationInfo.portal).isInteraction) {
         // Checks
         if (pageLength < 2) {
            if (options.privateReply) {
               await paginationInfo.portal.deferred ? await paginationInfo.portal.editReply("The reply has been sent privately") : await paginationInfo.portal.reply({content: "The reply has been sent privately", ephemeral: options.ephemeral});
               return paginationInfo.portal.client.users.cache.get(paginationInfo.portal.member.user.id).send({embeds: [paginationInfo.pageList[0]]});
            } else {
               return paginationInfo.portal.deferred ? await paginationInfo.portal.editReply({embeds: [paginationInfo.pageList[0]]}) : await paginationInfo.portal.reply({embeds: [paginationInfo.pageList[0]], ephemeral: options.ephemeral});
            }
         }
         if (paginationInfo.portal.ephemeral) {
            if (paginationInfo.buttonList.length === 3 || paginationInfo.buttonList.length === 5) {
               throw new Error("PaginationBase ERROR: Delete buttons are not supported by embeds with ephemeral enabled");
            }
            if (options.ephemeral) {
               process.emitWarning("PaginationBase WARNING: The interaction already has ephemeral enable meaning the pagination does not require the setting enabled");
            }
         }
         // Run
         return Promise.resolve(InteractionPagination(paginationInfo, options));
      }
      // Message + Checks
      if (options.replyMessage && options.privateReply) {process.emitWarning("PaginationBase WARNING: The privateReply setting overwrites and disables replyMessage setting");}
      if (!paginationInfo.portal.channel) {throw new Error("PaginationBase ERROR: Channel is inaccessible");}
      if (options.imageList) {
         if (paginationInfo.imageList < 2) {
            if (options.privateReply) {
               await paginationInfo.portal.channel.send("The reply has been sent privately");
               return paginationInfo.portal.author.send({embeds: [paginationInfo.imageList[0]]});
            } else {
               return options.replyMessage ? paginationInfo.portal.reply({embeds: [paginationInfo.imageList[0]]}) : paginationInfo.portal.channel.send({embeds: [paginationInfo.imageList[0]]});
            }
         }
      } else {
         if (paginationInfo.pageList.length < 2) {
            if (options.privateReply) {
               await paginationInfo.portal.channel.send("The reply has been sent privately");
               return paginationInfo.portal.author.send({embeds: [paginationInfo.pageList[0]]});
            } else {
               return options.replyMessage ? paginationInfo.portal.reply({embeds: [paginationInfo.pageList[0]]}) : paginationInfo.portal.channel.send({embeds: [paginationInfo.pageList[0]]});
            }
         }
      }
      // Run
      return Promise.resolve(MessagePagination(paginationInfo, options));
   } catch(error) {throw new Error(`Error occurred with ${__filename.split(/[\\/]/).pop().replace(".js","")} ${error}`);}
}