import React, {FC} from "react";
import styled from "styled-components"
import {InlineStyleProps, RenderInlineStyles} from "./inlineStyle";
import {RenderLink} from "./linkStyle";

import {RenderBlockStyles} from "./blockStyle"

const ToolbarContainer = styled.div`
    display: flex; 
    flex-direction: row;
    align-items: center;
    min-height: 48px;
    padding: 5px 7px;
    margin-bottom: 8px;
    border-radius: 2px 2px 0 0;
    box-shadow: 0 0 3px 1px rgba(15, 15, 15, 0.17);
`;

export const Toolbar: FC<InlineStyleProps> = ({setEditorState, editorState}) => {
    return (
        <ToolbarContainer>
            <RenderInlineStyles editorState={editorState} setEditorState={setEditorState} />
            <RenderBlockStyles editorState={editorState} setEditorState={setEditorState} />
            <RenderLink editorState={editorState} setEditorState={setEditorState} />
        </ToolbarContainer>
    )
}
