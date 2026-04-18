const { ButtonAction } = require('../assets/enums/Enums');
const FilterBuilder = require('../assets/tools/FilterBuilder');
const PagePayloadBuilder = require('../assets/tools/PagePayloadBuilder');

/**
 * @param {import('../assets/typedef/PaginationData')} paginationData
 */
module.exports = async function interactionHandler(paginationData) {
   const pagePosition = 0;
   const pagination = await paginationData.context.editReply(PagePayloadBuilder(paginationData, pagePosition));

   const collector = await pagination.createMessageComponentCollector({
      filter: FilterBuilder,
      time: paginationData.settings.timeout
   });

   collector.on("collect", async (i) => {
      switch (paginationData.buttons.find(button => button.data.custom_id == i.customId).action) {
         case ButtonAction.next:
            console.log("next");
            break;
         case ButtonAction.back:
            console.log("back");
            break;
         case ButtonAction.start:
            console.log("start");
            break;
         case ButtonAction.end:
            console.log("end");
            break;
         case ButtonAction.delete:
            console.log("delete");
            break;
         default:
            console.warn("[COLLECTOR ERROR]: No recognised button was pressed");
            break;
      }
   });
}