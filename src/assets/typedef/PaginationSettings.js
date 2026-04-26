const { TimeoutEnding } = require('../enums/Enums');

/**
 * The Pagination settings
 */
module.exports = class PaginationSettings {
   /**
    * How long the pagination should stay active for (Default: 20000ms)
    * @type {Number}
    */
   timeout = 20000;

   /**
    * What the pagination should do with itself once the timeout has ended
    * @type {TimeoutEnding}
    */
   timeoutEnding = TimeoutEnding.disableButtons;

   /**
    * Whether or not to make the pagination ephemeral
    * @type {Boolean}
    */
   interactionEphemeral = false;

   /**
    * Whether or not the pagination can be controlled by only the author
    * @type {Boolean}
    */
   authorSpecific = false;
}