import {FormatBold, FormatItalic, FormatQuote, FormatListBulleted, FormatListNumbered} from "@material-ui/icons";
import {ReactElement} from "react";

export interface InlineItemsProps {
    label: string;
    style: string;
    icon?: ReactElement;
}
export type BlockItemsProps = InlineItemsProps;


export const blocks: BlockItemsProps[] = [
    {
        label: 'H1',
        style: 'header-one'
    },
    {
        label: 'H2',
        style: 'header-two'
    },
    {
        label: 'H3',
        style: 'header-three'
    },
    {
        label: 'H4',
        style: 'header-four'
    },
    {
        label: 'UL',
        style: 'unordered-list-item',
        icon: <FormatListBulleted style={{color: 'inherit'}} />
    },
    {
        label: 'OL',
        style: 'ordered-list-item',
        icon: <FormatListNumbered style={{color: 'inherit'}} />
    }

]

export const inlines: InlineItemsProps[]  = [
    {
        label: 'bold',
        style: "BOLD",
        icon: <FormatBold style={{color: 'inherit'}} />
    },
    {
        label: 'italic',
        style: "ITALIC",
        icon: <FormatItalic style={{color: 'inherit'}} />
    },
]
