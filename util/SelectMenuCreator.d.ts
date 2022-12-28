/**
 * Creates a select menu to be used as a way to interact with the pagination
 * @param {Number} pageListLength An array of the embeds
 * @param {Array} labels An array of labels
 * @returns {Promise.<ActionRowBuilder[]>}
 */
export function SelectMenuCreator(pageListLength: number, labels: any[]): Promise<ActionRowBuilder[]>;
/**
 * Creates a disabled select menu
 * @param {ActionRowBuilder[]} actionRow
 * @returns {Promise.<ActionRowBuilder[]>}
 */
export function DisabledSelectMenuCreator(actionRow: ActionRowBuilder[]): Promise<ActionRowBuilder[]>;
