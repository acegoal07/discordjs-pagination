export function MessagePagination(paginationInfo: {
    portal: Message;
    pageList: EmbedBuilder[];
    buttonList: ButtonBuilder[];
    pagination: null;
}, options: {
    timeout: number;
    replyMessage: boolean;
    autoDelete: boolean;
    privateReply: boolean;
    authorIndependent: boolean;
    pageBuilderInfo: any[];
    buttonBuilderInfo: any[];
    ephemeral: boolean;
    autoButton: {
        toggle: boolean;
        deleteButton: boolean;
    };
    progressBar: {
        toggle: boolean;
        slider: string;
        bar: string;
    };
    selectMenu: {
        toggle: boolean;
        labels: any[];
        useTitle: boolean;
    };
}): EmbedBuilder[];
