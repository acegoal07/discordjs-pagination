/**
 * Creates a paginations embed for discordjs with customisable options
 * @version 1.4.0
 * @author acegoal07
 */
export class PaginationWrapper {
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
     * @returns {PaginationWrapper}
     */
    setInterface(_interface: Message | Interaction, options?: {
        interaction_ephemeral: boolean;
    }): PaginationWrapper;
    /**
     * Sets the used portal for the pagination
     * @param {Message | Interaction} portal
     * @param {{
     *    interaction_ephemeral: Boolean,
     *    timeout?: Number,
     *    autoDelete?: Boolean,
     *    authorIndependent?: Boolean,
     *    privateReply?: Boolean,
     *    replyMessage?: Boolean
     * }} options
     * @returns {PaginationWrapper}
     */
    setPortal(portal: Message | Interaction, options?: {
        interaction_ephemeral: boolean;
        timeout?: number;
        autoDelete?: boolean;
        authorIndependent?: boolean;
        privateReply?: boolean;
        replyMessage?: boolean;
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
     * @deprecated This function has been deprecated and moved into the setPortal function options
     */
    setTimeout(timeout: number): PaginationWrapper;
    /**
     * Allows you to enable and edit a progressBar for your pagination
     * @param {{
     *    slider?: String,
     *    bar?: String
     * }}
     * @returns {PaginationWrapper}
     */
    setProgressBar({ slider, bar }: {
        slider?: string;
        bar?: string;
    }): PaginationWrapper;
    /**
     * Enables replyMessage for your pagination
     * @returns {PaginationWrapper}
     */
    enableReplyMessage(): PaginationWrapper;
    /**
     * Enables autoDelete for your pagination
     * @returns {PaginationWrapper}
     * @deprecated This function has been deprecated and moved into the setPortal function options
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
     * @deprecated This function has been deprecated and moved into the setPortal function options
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
