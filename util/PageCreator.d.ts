export function PageCreator(pageBuilderData: [
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
]): Promise<pageList[]>;
