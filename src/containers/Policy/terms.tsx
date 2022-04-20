import React, {FC, useEffect, useState} from "react";
import {Button, Container, Typography} from "@material-ui/core";
import {EditorState, Editor, convertToRaw, ContentState} from "draft-js";
import {EditorContainer, EditorWrapper, useStyle} from "./styles";
import {Toolbar} from "components/Toolbar";
import createLinkDecorator from "components/Toolbar/Link";


import 'draft-js/dist/Draft.css';
import "./editor.css";
import {useHistory} from "react-router";

import {postTermsAndCondition, getTermsAndCondition} from "api/Policy";
import {stateToHTML} from "draft-js-export-html";
import Loading from "../../components/Loading";
import htmlToDraft from "html-to-draftjs";

const styledMap = {
    "header-one": {
        color: '#FF0000'
    }
}


const Terms: FC = () => {
    const {root, contentContainer,submitContainer, navigationHeader, cancelBtn} = useStyle();
    const decorator = createLinkDecorator();
    const history = useHistory();
    const updateState = (editorState: EditorState) => {
        console.log(convertToRaw(editorState.getCurrentContent()));
        setEditorState(editorState);
    }
    const onBack = () => {
        history.push("/policy");
    }
    const [loader, setLoader] = useState<boolean>(false);
    const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty(decorator));

    useEffect(() => {
        (async () => {
            setLoader(true);
            try {
                const response = await getTermsAndCondition();
                setLoader(false);
                if (response.success) {
                    const {contentBlocks, entityMap} = htmlToDraft(response.data.replaceAll('<br>', ''));
                    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
                    console.log(contentState);
                    setEditorState(() => EditorState.createWithContent(contentState, decorator));
                }
            } catch (e) {
                setLoader(false);
            }
        })()
    }, [])

    const postTerms = async () => {
        setLoader(true);
        try {
            const response = await postTermsAndCondition(stateToHTML(editorState.getCurrentContent()));
            setLoader(false);
            if(response.success) {
                history.push("/");
            }
        } catch (e) {
            setLoader(false);
        }

    }

    return (
        <>
            {loader && <Loading/>}
            <div className={root}>
                <div className={contentContainer}>
                    <Typography variant="h2">
                        Terms and condition
                    </Typography>
                    <EditorWrapper>
                        <Toolbar editorState={editorState} setEditorState={updateState} />
                        <EditorContainer>
                            <Editor
                                placeholder="write Terms & Condition"
                                editorState={editorState}
                                onChange={updateState}
                                customStyleMap={styledMap}
                                // onChange={setEditorState}
                            />
                        </EditorContainer>
                    </EditorWrapper>
                </div>
                <div className={submitContainer}>
                    <Button className={cancelBtn} onClick={() => history.push('/')}   variant="contained" size="small" color="primary">
                        Cancel
                    </Button>
                    <Button onClick={postTerms}  type="submit" variant="contained" size="small" color="primary">
                        Save
                    </Button>

                </div>
            </div>
        </>
    )
}

export default Terms;
