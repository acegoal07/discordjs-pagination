export function ProgressBarCreator(pageListLength: number, pageNumber: number, progressBar: {
    toggle: boolean;
    slider?: string;
    bar?: string;
}): Promise<string>;
