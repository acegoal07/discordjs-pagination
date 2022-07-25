// Params
/**
 * Sends back a string that represents the page as a progressbar
 * @param {Number} pageListLength - An array of the embeds
 * @param {Number} pageNumber - Current page number
 * @param {String} proSlider - The symbol used to symbolise position on the progressBar
 * @param {String} proBar - The symbol used to symbolise pages to go on the progressBar
*/
// Progress bar maker
module.exports = {
   async ProgressBarCreator(pageListLength, pageNumber, proSlider, proBar) {
      try {
         // Progress maths
         const progress = pageNumber + 1;
         const emptyProgress = pageListLength - (pageNumber + 1);
         // Progress text
         const progressText = proSlider.repeat(progress);
         const emptyProgressText = proBar.repeat(emptyProgress);
         // Create bar
         return Promise.resolve(`[${progressText+emptyProgressText}] : Page ${pageNumber + 1}`);
      } catch(error) {
         return console.log(`Error occured with ${__filename.split(/[\\/]/).pop().replace(".js","")} ${error}`)
      }
   }
}