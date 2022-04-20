import React, {FC, useEffect, useState} from "react";
import {Button, Container, Typography} from "@material-ui/core";
import {EditorState, ContentState, Editor, convertToRaw} from "draft-js";
import {EditorContainer, EditorWrapper, useStyle} from "./styles";
import {Toolbar} from "components/Toolbar";
import {getPrivacyAndPolicy, postPrivacyAndPolicy} from "api/Policy";
import createLinkDecorator from "components/Toolbar/Link";
import {stateToHTML} from "draft-js-export-html";
import htmlToDraft from "html-to-draftjs";


import 'draft-js/dist/Draft.css';
import "./editor.css";
import {useHistory} from "react-router";
import Loading from "../../components/Loading";


const styledMap = {
    "header-one": {
        color: '#FF0000'
    }
}


const Policy: FC = () => {


    const {root, contentContainer,submitContainer, cancelBtn} = useStyle();
    const decorator = createLinkDecorator();
    const history = useHistory();
    const [loader, setLoader] = useState<boolean>(false);
    const updateState = (editorState: EditorState) => {
        console.log(convertToRaw(editorState.getCurrentContent()));
        setEditorState(editorState);
    }
    const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty(decorator));
    editorState.getCurrentContent();

    useEffect(() => {
        (async () => {
            setLoader(true);
            try {
                const response = await getPrivacyAndPolicy();
                setLoader(false);
                if (response.success) {

                    const {contentBlocks, entityMap} = htmlToDraft(response.data.replaceAll('<br>', ''));
                    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
                    console.log(contentState);
                    const editorState = EditorState.createWithContent(contentState)
                    setEditorState(() => EditorState.createWithContent(contentState, decorator));
                }
            } catch (e) {
                setLoader(false);
            }
        })()
    }, [])
    const postPolicy = async () => {
        setLoader(true);
        try {
            const response = await postPrivacyAndPolicy(stateToHTML(editorState.getCurrentContent()));
            setLoader(false);
            if(response.success) {
                history.push("/");
            }
        } catch (e) {
            setLoader(false);
        }

    }
    // editorState.getCurrentContent().get
    return (
        <>
            {loader && <Loading />}
            <div className={root}>
                <div className={contentContainer}>
                    <Typography variant="h2">
                        Privacy policy
                    </Typography>
                    <EditorWrapper>
                        <Toolbar editorState={editorState} setEditorState={updateState} />
                        <EditorContainer>
                            <Editor
                                placeholder="write policy"
                                editorState={editorState}
                                onChange={updateState}
                                customStyleMap={styledMap}
                                // onChange={setEditorState}
                            />
                        </EditorContainer>
                    </EditorWrapper>
                </div>
                <div className={submitContainer}>
                    <Button className={cancelBtn} onClick={() => {history.push("/")}}  type="submit" variant="contained" size="small" color="primary">
                        Cancel
                    </Button>
                    <Button onClick={postPolicy}  type="submit" variant="contained" size="small" color="primary">
                        Save
                    </Button>
                </div>
            </div>
        </>

    )
}

export default Policy;
