export function AutoButtonCreator(pageListLength: number, autoDelButton: boolean): Promise<buttonList[]>;
export function ButtonCreator(buttonBuilderData: [
    {
        customId: string;
        label?: string;
        style: "Primary" | "Secondary" | "Success" | "Danger";
        emoji?: string;
    }
]): Promise<buttonList[]>;
export function DisabledButtonCreator(buttonList: ButtonBuilder[]): Promise<ActionRowBuilder[]>;
