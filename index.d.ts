export = PaginationWrapper;
declare class PaginationWrapper {
    interface: any;
    pageList: EmbedBuilder[];
    buttonList: ButtonBuilder[];
    timeout: number;
    replyMessage: boolean;
    autoDelete: boolean;
    privateReply: boolean;
    authorIndependent: boolean;
    pageBuilderInfo: [{
        title?: string;
        url?: string;
        author?: {
            name: string;
            icon_url?: string;
            url?: string;
        };
        description?: string;
        thumbnailUrl?: string;
        fields?: [
            {
                name: string;
                value: string;
                inline?: boolean;
            }
        ];
        imageUrl?: string;
        color?: 'Default' | 'Random' | 'White' | 'Aqua' | 'Green' | 'Blue' | 'Yellow' | 'Purple' | 'LuminousVividPink' | 'Fuchsia' | 'Gold' | 'Orange' | 'Red' | 'Grey' | 'Navy' | 'DarkAqua' | 'DarkGreen' | 'DarkBlue' | 'DarkPurple' | 'DarkVividPink' | 'DarkGold' | 'DarkOrange' | 'DarkRed' | 'DarkGrey' | 'DarkerGrey' | 'LightGrey' | 'DarkNavy' | 'Blurple' | 'Greyple' | 'DarkButNotBlack' | 'NotQuiteBlack';
    }];
    buttonBuilderInfo: [{
        customId: string;
        label?: string;
        style: "Primary" | "Secondary" | "Success" | "Danger";
        emoji?: string;
    }];
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
    pagination: any;
    /**
     * Sets the used interface for the pagination
     * @param {Message | Interaction} _interface
     * @returns {PaginationWrapper}
     */
    setInterface(_interface: Message | Interaction, options?: {
        interaction_ephemeral: boolean;
    }): PaginationWrapper;
    /**
     * Set the buttonList for the paginationY
     * @param {ButtonBuilder[]} buttonList
     * @returns {PaginationWrapper}
     */
    setButtonList(buttonList: ButtonBuilder[]): PaginationWrapper;
    /**
     * Set the pageList for the pagination
     * @param {EmbedBuilder[]} pageList
     * @returns {PaginationWrapper}
     */
    setPageList(pageList: EmbedBuilder[]): PaginationWrapper;
    /**
     * Run the pagination
     * @returns {PaginationWrapper}
     */
    paginate(): PaginationWrapper;
    /**
     * How many milliseconds your pagination will run for
     * @param {Number} timeout
     * @returns {PaginationWrapper}
     */
    setTimeout(timeout: number): PaginationWrapper;
    /**
     * Allows you to enable and edit a progressBar for your pagination
     * @param {String} slider
     * @param {String} bar
     * @returns {PaginationWrapper}
     */
    setProgressBar({ slider, bar }: string): PaginationWrapper;
    /**
     * Enables replyMessage for your pagination
     * @returns {PaginationWrapper}
     */
    enableReplyMessage(): PaginationWrapper;
    /**
     * Enables autoDelete for your pagination
     * @returns {PaginationWrapper}
     */
    enableAutoDelete(): PaginationWrapper;
    /**
     * Enables privateReply for your pagination
     * @returns {PaginationWrapper}
     */
    enablePrivateReply(): PaginationWrapper;
    /**
     * Enables authorIndependent for your pagination
     * @returns {PaginationWrapper}
     */
    enableAuthorIndependent(): PaginationWrapper;
    /**
     * Enables autoButton for your pagination
     * @param {Boolean} deleteButton
     * @returns {PaginationWrapper}
     */
    enableAutoButton(deleteButton?: boolean): PaginationWrapper;
    /**
     * Enables selectMenu for your pagination
     * @param {{
     *    data?: Array,
     *    useTitle?: Boolean
     * }}
     * @returns {PaginationWrapper}
     */
    enableSelectMenu({ labels, useTitle }: {
        data?: any[];
        useTitle?: boolean;
    }): PaginationWrapper;
    /**
     * Allows you to use the pagination to create the pages for the pagination
     * @param {[{
     *    title?: String,
     *    url?: String,
     *    author?: {
     *       name: String,
     *       icon_url?: String,
     *       url?: String
     *    },
     *    description?: String,
     *    thumbnailUrl?: String,
     *    fields?: [{
     *       name: String,
     *       value: String,
     *       inline?: Boolean
     *    }],
     *    imageUrl?: String,
     *    color?: 'Default'
     *       |  'Random'
     *       |  'White'
     *       |  'Aqua'
     *       |  'Green'
     *       |  'Blue'
     *       |  'Yellow'
     *       |  'Purple'
     *       |  'LuminousVividPink'
     *       |  'Fuchsia'
     *       |  'Gold'
     *       |  'Orange'
     *       |  'Red'
     *       |  'Grey'
     *       |  'Navy'
     *       |  'DarkAqua'
     *       |  'DarkGreen'
     *       |  'DarkBlue'
     *       |  'DarkPurple'
     *       |  'DarkVividPink'
     *       |  'DarkGold'
     *       |  'DarkOrange'
     *       |  'DarkRed'
     *       |  'DarkGrey'
     *       |  'DarkerGrey'
     *       |  'LightGrey'
     *       |  'DarkNavy'
     *       |  'Blurple'
     *       |  'Greyple'
     *       |  'DarkButNotBlack'
     *       |  'NotQuiteBlack'
     * }]} data
     * @returns {PaginationWrapper}
     */
    createPages(data?: [
        {
            title?: string;
            url?: string;
            author?: {
                name: string;
                icon_url?: string;
                url?: string;
            };
            description?: string;
            thumbnailUrl?: string;
            fields?: [
                {
                    name: string;
                    value: string;
                    inline?: boolean;
                }
            ];
            imageUrl?: string;
            color?: 'Default' | 'Random' | 'White' | 'Aqua' | 'Green' | 'Blue' | 'Yellow' | 'Purple' | 'LuminousVividPink' | 'Fuchsia' | 'Gold' | 'Orange' | 'Red' | 'Grey' | 'Navy' | 'DarkAqua' | 'DarkGreen' | 'DarkBlue' | 'DarkPurple' | 'DarkVividPink' | 'DarkGold' | 'DarkOrange' | 'DarkRed' | 'DarkGrey' | 'DarkerGrey' | 'LightGrey' | 'DarkNavy' | 'Blurple' | 'Greyple' | 'DarkButNotBlack' | 'NotQuiteBlack';
        }
    ]): PaginationWrapper;
    /**
     * Allows you to use the pagination to create the buttons for the pagination
     * @param {[{
     *    customId: String,
     *    label?: String,
     *    style: "Primary"
     *       | "Secondary"
     *       | "Success"
     *       | "Danger",
     *    emoji?: String
     * }]} info
     * @returns {PaginationWrapper}
     */
    createButtons(info?: [
        {
            customId: string;
            label?: string;
            style: "Primary" | "Secondary" | "Success" | "Danger";
            emoji?: string;
        }
    ]): PaginationWrapper;
}
