export class Pagination {
    paginationInfo: {
        portal: any;
        pageList: any;
        buttonList: any;
        pagination: any;
    };
    options: {
        timeout: number;
        replyMessage: boolean;
        autoDelete: boolean;
        privateReply: boolean;
        authorIndependent: boolean;
        pageBuilderInfo: any;
        buttonBuilderInfo: any;
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
    /**
     * Sets the used portal for the pagination
     * @param {Message | Interaction} _interface
     * @deprecated This function has been deprecated and replaced with setPortal to stop clashes with future versions of javascript
     * @returns {Pagination}
     */
    setInterface(_interface: Message | Interaction, options?: {
        interaction_ephemeral: boolean;
    }): Pagination;
    /**
     * Sets the used portal for the pagination
     * @param {Message | Interaction} portal
     * @param {{
     *    interaction_ephemeral?: Boolean,
     *    timeout?: Number,
     *    autoDelete?: Boolean,
     *    authorIndependent?: Boolean,
     *    privateReply?: Boolean,
     *    replyMessage?: Boolean
     * }} options
     * @returns {Pagination}
     */
    setPortal(portal: Message | Interaction, options?: {
        interaction_ephemeral?: boolean;
        timeout?: number;
        autoDelete?: boolean;
        authorIndependent?: boolean;
        privateReply?: boolean;
        replyMessage?: boolean;
    }): Pagination;
    /**
     * Set the buttonList for the paginationY
     * @param {ButtonBuilder[]} buttonList
     * @returns {Pagination}
     */
    setButtonList(buttonList: ButtonBuilder[]): Pagination;
    /**
     * Set the pageList for the pagination
     * @param {EmbedBuilder[]} pageList
     * @returns {Pagination}
     */
    setPageList(pageList: EmbedBuilder[]): Pagination;
    /**
     * Run the pagination
     * @returns {Pagination}
     */
    paginate(): Pagination;
    /**
     * How many milliseconds your pagination will run for
     * @param {Number} timeout
     * @returns {Pagination}
     * @deprecated This function has been deprecated and moved into the setPortal function options
     */
    setTimeout(timeout: number): Pagination;
    /**
     * Allows you to enable and edit a progressBar for your pagination
     * @param {{
     *    slider?: String,
     *    bar?: String
     * }}
     * @returns {Pagination}
     */
    setProgressBar({ slider, bar }: {
        slider?: string;
        bar?: string;
    }): Pagination;
    /**
     * Enables replyMessage for your pagination
     * @returns {Pagination}
     */
    enableReplyMessage(): Pagination;
    /**
     * Enables autoDelete for your pagination
     * @returns {Pagination}
     * @deprecated This function has been deprecated and moved into the setPortal function options
     */
    enableAutoDelete(): Pagination;
    /**
     * Enables privateReply for your pagination
     * @returns {Pagination}
     */
    enablePrivateReply(): Pagination;
    /**
     * Enables authorIndependent for your pagination
     * @returns {Pagination}
     * @deprecated This function has been deprecated and moved into the setPortal function options
     */
    enableAuthorIndependent(): Pagination;
    /**
     * Enables autoButton for your pagination
     * @param {Boolean} deleteButton
     * @returns {Pagination}
     */
    enableAutoButton(deleteButton?: boolean): Pagination;
    /**
     * Enables selectMenu for your pagination
     * @param {{
     *    data?: Array,
     *    useTitle?: Boolean
     * }}
     * @returns {Pagination}
     */
    enableSelectMenu({ labels, useTitle }: {
        data?: any[];
        useTitle?: boolean;
    }): Pagination;
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
     * @returns {Pagination}
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
    ]): Pagination;
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
     * @returns {Pagination}
     */
    createButtons(info?: [
        {
            customId: string;
            label?: string;
            style: "Primary" | "Secondary" | "Success" | "Danger";
            emoji?: string;
        }
    ]): Pagination;
}
