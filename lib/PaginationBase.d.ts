export function PaginationBase({ paginationInfo, options }: {
    paginationInfo?: {
        portal: any;
        pageList: any;
        buttonList: any;
        pagination: any;
    };
    options?: {
        timeout: number;
        replyMessage: boolean;
        autoDelete: boolean;
        privateReply: boolean;
        authorIndependent: boolean;
        pageBuilderData: any;
        buttonBuilderData: any;
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
            labels: any;
            useTitle: boolean;
        };
    };
}): Promise<EmbedBuilder[]>;
