import React, { FC} from "react";
import {EditorState, RichUtils} from "draft-js";
import {Container, ToolbarItem} from "./common";
import {blocks} from "./constants";

export interface BlockStyleProps {
    editorState: EditorState,
    setEditorState: (state: EditorState) => void;
}

export const RenderBlockStyles: FC<BlockStyleProps> = ({editorState, setEditorState}) => {
    const applyStyle = (style: string) => {
        setEditorState(RichUtils.toggleBlockType(editorState, style));
    }
    const isActive = (style: string): boolean => {
        const selection = editorState.getSelection();
        const blockStyle = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();
        return blockStyle === style;
    }
    return (
        <Container>
            {blocks.map(({label, icon, style}, index) => (
                <ToolbarItem isActive={isActive(style)} onClick={() => {applyStyle(style)}}  key={`${label}-${index}`} >
                    {icon || label}
                </ToolbarItem>
            ))}
        </Container>
    )
}
