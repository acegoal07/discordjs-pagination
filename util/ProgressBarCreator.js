module.exports = {
   /**
    * Sends back a string that represents the page as a progressbar
    * @param {Number} pageListLength - An array of the embeds
    * @param {Number} pageNumber - Current page number
    * @param {Object} progressBar - All the progressBar settings
    * @returns {Promise.<String>}
   */
   async ProgressBarCreator(pageListLength, pageNumber, progressBar) {
      try {
         // Progress maths
         // const progress = pageNumber + 1;
         // const emptyProgress = pageListLength - (pageNumber + 1);
         // Progress text
         const progressText = progressBar.slider.repeat(pageNumber + 1);
         const emptyProgressText = progressBar.bar.repeat(pageListLength - (pageNumber + 1));
         // Create bar
         return Promise.resolve(`[${progressText+emptyProgressText}] : Page ${pageNumber + 1}`);
      } catch(error) {
         return console.log(`Error occured with ${__filename.split(/[\\/]/).pop().replace(".js","")} ${error}`)
      }
   }
}