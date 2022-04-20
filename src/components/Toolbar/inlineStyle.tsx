import React, { FC} from "react";
import {EditorState, RichUtils} from "draft-js";
import {Container, ToolbarItem} from "./common";
import {inlines} from "./constants";

export interface InlineStyleProps {
    editorState: EditorState,
    setEditorState: (state: EditorState) => void;
}

export const RenderInlineStyles: FC<InlineStyleProps> = ({editorState, setEditorState}) => {
    const applyStyle = (style: string) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    }
    const isActive = (style: string): boolean => {
        const currentStyle = editorState.getCurrentInlineStyle();
        return currentStyle.has(style);
    }
    return (
        <Container>
            {inlines.map(({label, icon, style}, index) => (
                <ToolbarItem isActive={isActive(style)} onClick={() => {applyStyle(style)}}  key={`${label}-${index}`} >
                    {icon || label}
                </ToolbarItem>
            ))}
        </Container>
    )
}
