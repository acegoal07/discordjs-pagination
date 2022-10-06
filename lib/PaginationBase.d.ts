declare function _exports({ interface, pageList, buttonList, timeout, replyMessage, autoDelete, privateReply, authorIndependent, pageBuilderInfo, buttonBuilderInfo, ephemeral, progressBar, autoButton, selectMenu }: {
    interface: any;
    pageList: any;
    buttonList: any;
    timeout?: number;
    replyMessage?: boolean;
    autoDelete?: boolean;
    privateReply?: boolean;
    authorIndependent?: boolean;
    pageBuilderInfo?: any;
    buttonBuilderInfo?: any;
    ephemeral?: boolean;
    progressBar?: {
        toggle: boolean;
        slider: string;
        bar: string;
    };
    autoButton?: {
        toggle: boolean;
        deleteButton: boolean;
    };
    selectMenu?: {
        toggle: boolean;
        labels: any;
        useTitle: boolean;
    };
}): Promise<any>;
export = _exports;
