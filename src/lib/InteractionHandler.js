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
      collector.resetTimer();
      if (!i.deferred && !i.replied) { await i.deferUpdate(); }
      switch (paginationData.buttons.find(button => button.data.custom_id == i.customId).action) {
         case ButtonAction.Next:
            if ((pagePosition + 1) === paginationData.pages.length) {
               if (paginationData.settings.loop) {
                  pagePosition = 0;
               } else {
                  break;
               }
            } else {
               pagePosition++;
            }

            await i.editReply(pagePayloadBuilder(paginationData, pagePosition));

            break;
         case ButtonAction.Back:
            if (pagePosition === 0) {
               if (paginationData.settings.loop) {
                  pagePosition = paginationData.pages.length - 1;
               } else {
                  break;
               }
            } else {
               pagePosition--;
            }

            await i.editReply(pagePayloadBuilder(paginationData, pagePosition));

            break;
         case ButtonAction.Start:
            if (pagePosition !== 0) {
               pagePosition = 0;
               await i.editReply(pagePayloadBuilder(paginationData, pagePosition));
            }
            break;
         case ButtonAction.End:
            if (pagePosition !== paginationData.pages.length) {
               pagePosition = (paginationData.pages.length - 1);
               await i.editReply(pagePayloadBuilder(paginationData, pagePosition));
            }
            break;
         case ButtonAction.Delete:
            pagination.delete();
            collector.stop();
            break;
         default:
            console.warn("[COLLECTOR ERROR]: No recognised button was pressed");
            break;
      }
   });

   collector.on("end", async () => {
      await paginationData.context.channel.messages.fetch({ message: pagination.id })
         .then(async () => {
            switch (paginationData.settings.timeoutEnding) {
               case TimeoutEnding.DeleteButtons:
                  await paginationData.context.editReply({ components: [] });
                  break;
               case TimeoutEnding.DeletePagination:
                  pagination.delete();
                  break;
               case TimeoutEnding.DisableButtons:
                  disableButtons(paginationData);
                  await paginationData.context.editReply(pagePayloadBuilder(paginationData, pagePosition));
                  break;
               default:
                  throw new Error('[TIMEOUT ENDING ERROR]: Invalid timeout ending type');
            }
         })
         .catch(() => { return; });
   });
}