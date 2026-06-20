/**
 * Disables all the buttons stored in the pagination data
 * @param {import("../typedef/PaginationData")} paginationData
 */
module.exports = function disableButtons(paginationData) {
   try {
      paginationData.buttons.forEach((b) => {
         b.setDisabled(true);
      });

      if (paginationData.extraRows.length != 0) {
         paginationData.extraRows.forEach((r) => {
            r.components.forEach((c) => {
               c.setDisabled(true);
            });
         });
      }
   } catch (error) {
      throw new Error('[DISABLE BUTTONS ERROR]:', { cause: error });
   }
};
