export function FilterCreator({ message, interaction, buttonList, authorIndependent, selectMenu }: {
    message?: Message;
    interaction?: Interaction;
    buttonList: ButtonBuilder;
    authorIndependent: boolean;
    selectMenu: {
        toggle: boolean;
        labels: any[];
        useTitle: boolean;
    };
}): Function;
