// Dependencies
const { ActionRowBuilder } = require("discord.js"),
   { DisabledButtonCreator } = require("../util/ButtonCreator"),
   { SelectMenuCreator, DisabledSelectMenuCreator } = require("../util/SelectMenuCreator"),
   { ProgressBarCreator } = require("../util/ProgressBarCreator"),
   { FilterCreator } = require("../util/FilterCreator");
// Params
/**
 * The interaction pagination
 * @param {{
 *    portal: import("discord.js").Interaction,
 *    pageList: import("discord.js").EmbedBuilder[],
 *    imageList: import("discord.js").AttachmentBuilder[],
 *    buttonList: import("discord.js").ButtonBuilder[],
 *    attachmentList: import("discord.js").AttachmentBuilder[],
 *    pagination: null
 * }} paginationInfo
 * @param {{
 *    timeout: Number,
 *    replyMessage: Boolean,
 *    autoDelete: Boolean,
 *    privateReply: Boolean,
 *    authorIndependent: Boolean,
 *    ephemeral: Boolean,
 *    disabledButtons: Boolean,
 *    imageList: Boolean,
 *    autoButton: {
 *       toggle: Boolean,
 *       deleteButton: Boolean
 *    },
 *    progressBar: {
 *       toggle: Boolean,
 *       slider: String,
 *       bar: String
 *    },
 *    selectMenu: {
 *       toggle: Boolean,
 *       labels: Array<String>,
 *       useTitle: Boolean
 *    }
 * }} options
 * @returns {import("discord.js").EmbedBuilder[]} The pagination
 */
exports.InteractionPagination = async(paginationInfo, options) => {
   try {
      // Set page number
      let pageNumber = 0;
      const pageLength = options.imageList ? paginationInfo.imageList.length : paginationInfo.pageList.length;
      // Create embed
      const paginationContent = options.imageList ?
      {
         files: [paginationInfo.imageList[pageNumber]],
         components: [options.selectMenu.toggle ? await SelectMenuCreator(pageLength, options.selectMenu.labels) : new ActionRowBuilder().addComponents(paginationInfo.buttonList)],
         fetchReply: true,
         ephemeral: options.ephemeral
      } : paginationInfo.attachmentList !== null ? {
         embeds: [paginationInfo.pageList[pageNumber].setFooter({text: `${options.progressBar.toggle ? `${await ProgressBarCreator(pageLength, pageNumber, options.progressBar)}` : `Page ${pageNumber + 1} / ${pageLength}`}`})],
         files: [paginationInfo.attachmentList[pageNumber] !== null ? paginationInfo.attachmentList[pageNumber] : null],
         components: [options.selectMenu.toggle ? await SelectMenuCreator(pageLength, options.selectMenu.labels) : new ActionRowBuilder().addComponents(paginationInfo.buttonList)],
         fetchReply: true,
         ephemeral: options.ephemeral
      } : {
         embeds: [paginationInfo.pageList[pageNumber].setFooter({text: `${options.progressBar.toggle ? `${await ProgressBarCreator(pageLength, pageNumber, options.progressBar)}` : `Page ${pageNumber + 1} / ${pageLength}`}`})],
         components: [options.selectMenu.toggle ? await SelectMenuCreator(pageLength, options.selectMenu.labels) : new ActionRowBuilder().addComponents(paginationInfo.buttonList)],
         fetchReply: true,
         ephemeral: options.ephemeral
      }
      let pagination;
      if (options.privateReply) {
         paginationInfo.portal.deferred ? await paginationInfo.portal.editReply("The reply has been sent privately") : await paginationInfo.portal.reply("The reply has been sent privately");
         pagination = await paginationInfo.portal.client.users.cache.get(paginationInfo.portal.member.user.id).send(paginationContent);
      } else if (paginationInfo.portal.deferred) {
         pagination = await paginationInfo.portal.editReply(paginationContent);
      } else {
         pagination = await paginationInfo.portal.reply(paginationContent);
      }
      // Create collector
      const collector = await pagination.createMessageComponentCollector({
         filter: FilterCreator({interaction: paginationInfo.portal, buttonList: paginationInfo.buttonList, authorIndependent: options.authorIndependent, selectMenu: options.selectMenu}),
         time: options.timeout
      });
      // Button inputs
      collector.on("collect", async (i) => {
         // Button response
         if (!options.selectMenu.toggle) {
            switch (i.customId) {
               // Button 1
               case paginationInfo.buttonList[0].data.custom_id:
                  if (paginationInfo.buttonList.length > 3) {
                     pageNumber = 0;
                     break;
                  }
                  pageNumber = pageNumber > 0 ? --pageNumber : pageLength - 1;
                  break;
               // Button 2
               case paginationInfo.buttonList[1].data.custom_id:
                  if (paginationInfo.buttonList.length > 3) {
                     pageNumber = pageNumber > 0 ? --pageNumber : pageLength - 1;
                     break;
                  }
                  pageNumber = pageNumber + 1 < pageLength ? ++pageNumber : 0;
                  break;
               // Button 3
               case paginationInfo.buttonList[2].data.custom_id:
                  if (paginationInfo.buttonList.length > 3) {
                     pageNumber = pageNumber + 1 < pageLength ? ++pageNumber : 0;
                     break;
                  }
                  pagination.delete();
                  return;
               // Button 4
               case paginationInfo.buttonList[3].data.custom_id:
                  pageNumber = pageLength - 1;
                  break;
               // Button 5
               case paginationInfo.buttonList[4].data.custom_id:
                  pagination.delete();
                  return;
               // Catch null
               case null:
                  throw new Error("InteractionPagination ERROR: The button input is null");
               // Catch undefined
               case undefined:
                  throw new Error("InteractionPagination ERROR: The button input is undefined");
               // Default
               default:
                  break;
            }
            if (!i.deferred) {await i.deferUpdate();}
            // Edit page after input
            await i.editReply(options.imageList ?
               {
                  files: [paginationInfo.imageList[pageNumber]],
                  fetchReply: true
               } : paginationInfo.attachmentList !== null ? {
                  embeds: [paginationInfo.pageList[pageNumber].setFooter({text: `${options.progressBar.toggle ? `${await ProgressBarCreator(pageLength, pageNumber, options.progressBar)}` : `Page ${pageNumber + 1} / ${pageLength}`}`})],
                  files: [paginationInfo.attachmentList[pageNumber] !== null ? paginationInfo.attachmentList[pageNumber] : null],
                  fetchReply: true
               } :{
                  embeds: [paginationInfo.pageList[pageNumber].setFooter({text: `${options.progressBar.toggle ? `${await ProgressBarCreator(pageLength, pageNumber, options.progressBar)}` : `Page ${pageNumber + 1} / ${pageLength}`}`})],
                  fetchReply: true
               }
            ).catch(error => {return console.log(error)});
         }
         // Select menu response
         else {
            // Deferrer update
            if (!i.deferred) {await i.deferUpdate();}
            // Edit page after input
            pageNumber = i.values[0] - 1;
            await i.editReply(options.imageList ?
               {
                  files: [paginationInfo.imageList[pageNumber]],
                  fetchReply: true
               } : paginationInfo.attachmentList !== null ? {
                  embeds: [paginationInfo.pageList[pageNumber].setFooter({text: `${options.progressBar.toggle ? `${await ProgressBarCreator(pageLength, pageNumber, options.progressBar)}` : `Page ${pageNumber + 1} / ${pageLength}`}`})],
                  files: [paginationInfo.attachmentList[pageNumber] !== null ? paginationInfo.attachmentList[pageNumber] : null],
                  fetchReply: true
               } : {
                  embeds: [paginationInfo.pageList[pageNumber].setFooter({text: `${options.progressBar.toggle ? `${await ProgressBarCreator(pageLength, pageNumber, options.progressBar)}` : `Page ${pageNumber + 1} / ${pageLength}`}`})],
                  fetchReply: true
               }
            ).catch(error => {return console.log(error)});
         }
         // Refresh timeout timer
         collector.resetTimer();
      });
      // Timeout ended or embed was deleted
      collector.once("end", async() => {
         try {
            // Make sure the embed exists
            await paginationInfo.portal.channel.messages.fetch({message: pagination.id});
            // Delete if autoDelete in enabled
            if (options.autoDelete) {return paginationInfo.portal.deleteReply().catch(error => {return console.log(error)});}
            // No disabled buttons
            if (!options.disabledButtons) {return paginationInfo.portal.editReply({components: []}).catch(error => {return console.log(error)});}
            // Disable buttons or select menu
            return paginationInfo.portal.editReply(options.selectMenu.toggle ?
               {
                  components: [await DisabledSelectMenuCreator(pagination.components[0])]
               } : {
                  components: [await DisabledButtonCreator(paginationInfo.buttonList)]
               }
            ).catch(error => {console.log(error)});
         } catch(error) {return;}
      });
   } catch(error) {throw new Error(`Error occurred with ${__filename.split(/[\\/]/).pop().replace(".js","")} ${error}`);}
}