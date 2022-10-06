/**
 * Sends back a list of buttons to be used
 * @param {Number} pageListLength
 * @param {Boolean} autoDelButton
 * @returns {Promise.<buttonList: Array>}
 */
export function AutoButtonCreator(pageListLength: number, autoDelButton: boolean): Promise<buttonList>;
/**
 * Sends back a list of buttons to be used
 * @param {Number} pageListLength
 * @param {Boolean} autoDelButton
 * @returns {Promise.<buttonList: Array>}
 */
export function AutoButtonCreator(pageListLength: number, autoDelButton: boolean): Promise<buttonList>;
/**
 * Sends back a list of custom buttons
 * @returns {Promise.<buttonList: Array>}
 */
export function ButtonCreator(): Promise<buttonList>;
/**
 * Sends back a list of custom buttons
 * @returns {Promise.<buttonList: Array>}
 */
export function ButtonCreator(): Promise<buttonList>;
/**
 * @param {ButtonBuilder[]} buttonList - An array of the buttons
 * @returns {Promise.<ActionRowBuilder>}
 */
export function DisabledButtonCreator(buttonList: ButtonBuilder[]): Promise<ActionRowBuilder>;
/**
 * @param {ButtonBuilder[]} buttonList - An array of the buttons
 * @returns {Promise.<ActionRowBuilder>}
 */
export function DisabledButtonCreator(buttonList: ButtonBuilder[]): Promise<ActionRowBuilder>;
