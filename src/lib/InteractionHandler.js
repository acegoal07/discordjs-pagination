const { ComponentType } = require('discord.js'),
   { ButtonAction, TimeoutEnding } = require('../assets/enums/Enums'),
   filterBuilder = require('../assets/builders/FilterBuilder'),
   pagePayloadBuilder = require('../assets/builders/PagePayloadBuilder'),
   disableButtons = require('../assets/tools/DisableButtons');

/**
 * @param {import('../assets/typedef/PaginationData')} paginationData
 */
module.exports = async function interactionHandler(paginationData) {
   let pagePosition = 0;
   const pagination = await paginationData.context.editReply(pagePayloadBuilder(paginationData, pagePosition));

   const collector = await pagination.createMessageComponentCollector({
      filter: filterBuilder,
      time: paginationData.settings.timeout,
      ComponentType: ComponentType.Button
   });

   collector.on("collect", async (i) => {
      switch (paginationData.buttons.find(button => button.data.custom_id == i.customId).action) {
         case ButtonAction.next:
            if ((pagePosition + 1) !== paginationData.pages.length) {
               pagePosition++;
               await paginationData.context.editReply(pagePayloadBuilder(paginationData, pagePosition));
            }
            break;
         case ButtonAction.back:
            if (pagePosition !== 0) {
               pagePosition--;
               await paginationData.context.editReply(pagePayloadBuilder(paginationData, pagePosition));
            }
            break;
         case ButtonAction.start:
            if (pagePosition !== 0) {
               pagePosition = 0;
               await paginationData.context.editReply(pagePayloadBuilder(paginationData, pagePosition));
            }
            break;
         case ButtonAction.end:
            if (pagePosition !== paginationData.pages.length) {
               pagePosition = (paginationData.pages.length - 1);
               await paginationData.context.editReply(pagePayloadBuilder(paginationData, pagePosition));
            }
            break;
         case ButtonAction.delete:
            pagination.delete();
            collector.stop();
            break;
         default:
            console.warn("[COLLECTOR ERROR]: No recognised button was pressed");
            break;
      }
      if (!i.deferred) { await i.deferUpdate(); }
      collector.resetTimer();
   });

   collector.on("end", async () => {
      await paginationData.context.channel.messages.fetch({ message: pagination.id })
         .then(async (i) => {
            if (paginationData.settings.timeoutEnding === TimeoutEnding.deletePagination) {
               pagination.delete();
            } else if (paginationData.settings.timeoutEnding === TimeoutEnding.deleteButtons) {
               await paginationData.context.editReply({ components: [] });
            } else {
               disableButtons(paginationData);
               await paginationData.context.editReply(pagePayloadBuilder(paginationData, pagePosition));
            }
            disableButtons(paginationData);
            await paginationData.context.editReply(pagePayloadBuilder(paginationData, pagePosition));
         })
         .catch(() => { return; });
   });
}