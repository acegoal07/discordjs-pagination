const { TimeoutEnding, MessageResponseType } = require('../enums/Enums');

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
   timeoutEnding = TimeoutEnding.DisableButtons;

   /**
    * Whether or not to make the interaction pagination ephemeral
    * @type {Boolean}
    */
   interactionEphemeral = false;

   /**
    * Whether or not the pagination can be controlled by only the author
    * @type {Boolean}
    */
   authorSpecific = false;

   /**
    * Whether or not to let the pagination loop around on itself
    * @type {Boolean}
    */
   loop = false;

   /**
    * Whether or not to include a delete button when automatically generating buttons
    * @type {Boolean}
    */
   autoDeleteButton = false;

   /**
    * How the message pagination should be sent
    * @type {MessageResponseType}
    */
   messageResponseType = MessageResponseType.Send;

   /**
    * Whether or not buttons should be disabled if they can't be used depending on page position
    * @type {Boolean}
    */
   disableUnusableButtons = false;
}