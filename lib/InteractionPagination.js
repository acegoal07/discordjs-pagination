// Dependencies
const { Interaction, ActionRowBuilder,  EmbedBuilder, ButtonBuilder } = require("discord.js");
const { DisabledButtonCreator } = require("../util/ButtonCreator");
const { SelectMenuCreator, DisabledSelectMenuCreator } = require("../util/SelectMenuCreator");
const { ProgressBarCreator } = require("../util/ProgressBarCreator");
const { FilterCreator } = require("../util/FilterCreator");
// Params
/**
 * The interaction pagination
 *
 * @param {Interaction} interaction - Discord.js interface
 * @param {EmbedBuilder[]} pageList - An array of the embeds
 * @param {ButtonBuilder[]} buttonList - An array of the buttons
 * @param {Number} timeout - How long the timeout lasts
 * @param {Boolean} autoDelete - If autoDelete is enabled
 * @param {Boolean} privateReply - If privateReply is enabled
 * @param {Boolean} progressBar - ProgressBar settings
 * @param {String} proSlider - The symbol used to symbolise position on the progressBar
 * @param {String} proBar - The symbol used to symbolise pages to go on the progressBar
 * @param {Boolean} authorIndependent - Only the author can use pagination
 * @param {Boolean} selectMenu - If select menu is enabled
 * @returns {EmbedBuilder[]} The pagination
 */
// Interaction pagination
module.exports = InteractionPagination = async(interaction, pageList, buttonList, timeout, autoDelete, privateReply, progressBar, proSlider, proBar, authorIndependent, selectMenu) => {
   try {
      // Set page number
      let pageNumber = 0;
      // Create row
      let row;
      if (selectMenu) {row = await SelectMenuCreator(pageList.length)}
      else {row = new ActionRowBuilder().addComponents(buttonList);}
      // Create embed
      const paginationContent = {
         embeds: [pageList[pageNumber].setFooter({text: `${progressBar ? `${ProgressBarCreator(pageList.length, pageNumber, proSlider, proBar)}` : `Page ${pageNumber + 1} / ${pageList.length}`}`})],
         components: [row], fetchReply: true
      };
      let pagination;
      if (privateReply) {
         interaction.deferred ? await interaction.editReply("The reply has been sent privately") : await interaction.reply("The reply has been sent privately");
         pagination = await interaction.client.users.cache.get(interaction.member.user.id).send(paginationContent);
      } else if (interaction.deferred) {
         pagination = await interaction.editReply(paginationContent);
      } else {
         pagination = await interaction.reply(paginationContent);
      }
      // Create collector
      const collector = await pagination.createMessageComponentCollector({
         filter: FilterCreator({interaction, buttonList, authorIndependent, selectMenu}),
         time: timeout
      });

      // Button inputs
      // Majorly broken unable to compare id's
      collector.on("collect", async (i) => {
         // Button response
         if (!selectMenu) {
            switch (i.customId) {
               // Button 1
               case buttonList[0].data.custom_id:
                  if (buttonList.length > 3) {
                     pageNumber = 0;
                     break;
                  }
                  pageNumber = pageNumber > 0 ? --pageNumber : pageList.length - 1;
                  break;
               // Button 2
               case buttonList[1].data.custom_id:
                  if (buttonList.length > 3) {
                     pageNumber = pageNumber > 0 ? --pageNumber : pageList.length - 1;
                     break;
                  }
                  pageNumber = pageNumber + 1 < pageList.length ? ++pageNumber : 0;
                  break;
               // Button 3
               case buttonList[2].data.custom_id:
                  if (buttonList.length > 3) {
                     pageNumber = pageNumber + 1 < pageList.length ? ++pageNumber : 0;
                     break
                  }
                  pagination.delete();
                  return;
               // Button 4
               case buttonList[3].data.custom_id:
                  pageNumber = pageList.length - 1 ;
                  break;
               // Button 5
               case buttonList[4].data.custom_id:
                  pagination.delete();
                  return;
               // Catch undefined
               case undefined || null:
                  throw new Error("InteractionPagination ERROR: The button input has been received as undefined");
               // Default
               default:
                  break;
            }
            if (!i.deferred) await i.deferUpdate();
            // Edit page after input
            await i.editReply({
               embeds: [pageList[pageNumber].setFooter({text: `${progressBar ? `${ProgressBarCreator(pageList.length, pageNumber, proSlider, proBar)}` : `Page ${pageNumber + 1} / ${pageList.length}`}`})],
               fetchReply: true
            }).catch(error => {return console.log(error)});
         }
         // Select menu response
         else {
            // Deferrer update
            if (!i.deferred) await i.deferUpdate();
            // Edit page after input
            pageNumber = i.values[0] - 1 ;
            await i.editReply({
               embeds: [pageList[pageNumber].setFooter({text: `${progressBar ? `${ProgressBarCreator(pageList.length, pageNumber, proSlider, proBar)}` : `Page ${pageNumber + 1} / ${pageList.length}`}`})],
               fetchReply: true
            }).catch(error => {return console.log(error)});
         }
         // Refresh timeout timer
         collector.resetTimer();
      });
      // Timeout ended or embed was deleted
      collector.on("end", async() => {
         try {
            // Make sure the embed exists
            await interaction.channel.messages.fetch({message: pagination.id});
            // Delete if autoDelete in enabled
            if (autoDelete) return pagination.delete();
            // Disable select menu
            if (selectMenu) {
               try {
                  return pagination.edit({ components: [await DisabledSelectMenuCreator(pageList.length)] });
               } catch(error) {}
            }
            // Disable buttons
            else {
               try {
                  return pagination.edit({ components: [await DisabledButtonCreator(buttonList)] });
               } catch (error) {return}
            }
         } catch(error) {return}
      });
   } catch(error) {
      return console.log(`Error occured with ${__filename.split(/[\\/]/).pop().replace(".js","")} ${error}`)
   }
};
