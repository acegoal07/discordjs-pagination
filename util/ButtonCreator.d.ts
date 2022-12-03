export function AutoButtonCreator(pageListLength: number, autoDelButton: boolean): Promise<buttonList[]>;
export function ButtonCreator(buttonBuilderInfo: any[]): Promise<buttonList[]>;
export function DisabledButtonCreator(buttonList: ButtonBuilder[]): Promise<ActionRowBuilder[]>;
