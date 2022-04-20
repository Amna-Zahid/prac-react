import React, {ChangeEventHandler, FC, KeyboardEventHandler, useRef, useState} from "react";
import {Container, ToolbarItem} from "./common";
import { InsertLink, LinkOff } from "@material-ui/icons";
import {EditorState, RichUtils} from "draft-js";

export interface LinkStyleProps {
    editorState: EditorState,
    setEditorState: (state: EditorState) => void;
}


 export const RenderLink: FC<LinkStyleProps> = ({editorState, setEditorState}) => {
    const [showURLInput, setShowURLInput] = useState<boolean>(false);
    const [urlValue, setUrlValue] = useState<string>('');
    const urlRef = useRef<HTMLInputElement | null>(null);
    const promptForCLick = () => {
        const selection = editorState.getSelection();
        if(!selection.isCollapsed()) {
            const contentState = editorState.getCurrentContent();
            const startKey = editorState.getSelection().getStartKey();
            const startOffset = editorState.getSelection().getStartOffset();
            const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
            const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
            let url = '';
            if (linkKey) {
                const linkInstance = contentState.getEntity(linkKey);
                url = linkInstance.getData().url;
            }
            setShowURLInput(() => true);
            if (urlRef && urlRef.current) {
               urlRef.current?.focus();
            }
            setUrlValue(url);

        }
    }
    const onURLChange: ChangeEventHandler<HTMLInputElement> = ({target: {value}}) => {
        setUrlValue(value);
    }
    const onLinkInputKeyDown: KeyboardEventHandler<HTMLInputElement> = ({which}) => {
            if (which === 13) {
                confirmLink();
            }
    }
    const removeLik = () => {
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            setEditorState(RichUtils.toggleLink(editorState, selection, null));
        }
    }
    const confirmLink = () => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'MUTABLE',
            {url: urlValue}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        let nextEditorState = EditorState.set(editorState,
            { currentContent: contentStateWithEntity }
        );

        nextEditorState = RichUtils.toggleLink( nextEditorState,
            nextEditorState.getSelection(), entityKey
        );
        setEditorState(nextEditorState);
        setShowURLInput(false);
        setUrlValue(' ');
    }
    return (
        <Container>
            <ToolbarItem isActive={showURLInput} onClick={promptForCLick} >
                <InsertLink  style={{color: 'inherit'}} />
            </ToolbarItem>
            <ToolbarItem isActive={false} onClick={removeLik}>
                <LinkOff style={{color: 'inherit'}} />
            </ToolbarItem>
            {showURLInput && (
                <div >
                    <input
                        onChange={onURLChange}
                        ref={urlRef}

                        type="text"
                        value={urlValue}
                        onKeyDown={onLinkInputKeyDown}
                    />
                    <button onMouseDown={confirmLink}> Confirm </button>
                </div>
            )}
        </Container>
    )
}
