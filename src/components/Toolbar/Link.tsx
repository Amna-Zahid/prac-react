import React, {FC} from "react";
import { CompositeDecorator, ContentState, ContentBlock } from "draft-js";
import styled from "styled-components"

const LinkButton = styled.a`
    color: #986c3a;
    text-decoration: none;
`

export interface LinkProps {
    contentState: ContentState;
    entityKey: string;
}
export type LinkEntityCallback = (start: number, end: number) => void;
const findLinkEntities = (contentBlock: ContentBlock, callback: LinkEntityCallback, contentState: ContentState) => {
    contentBlock.findEntityRanges(character => {
        const entityKey = character.getEntity();
        return (
            entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK'
        )
    }, callback)
}

const Link: FC<LinkProps> = ({entityKey, contentState, children}) => {
    const { url }  = contentState.getEntity(entityKey).getData();
    return <LinkButton href={url} >{children}</LinkButton>
}
const createLinkDecorator = (): CompositeDecorator => (
    new CompositeDecorator([{
        strategy: findLinkEntities,
        component: Link
    }])
)

export default createLinkDecorator;
