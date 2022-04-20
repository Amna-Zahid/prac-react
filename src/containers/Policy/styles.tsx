import styled from "styled-components";
import {makeStyles} from "@material-ui/core";


export const EditorWrapper = styled.div`
    min-width: 700px;
    display: flex;
    height: fit-content;
    flex-direction: column;
`;

export const EditorContainer = styled.div`
  display: flex;
  min-height: 9em;
  border-radius: 0 0 3px 3px;
  background-color: #FFF;
  padding: 5px;
  font-size: 17px;
  font-weight: 300;
  box-shadow: 0px 0px 3px 1px rgba(15, 15, 15, 0.17);
`
export const useStyle = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    navigationHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: 0,
        '& img': {
            width: 40
        }
    },
    contentContainer: {
        padding: '15px 5px',
        height: 'calc(100vh - 130px)',
        '& .MuiTypography-h2': {
            color: '#0d2e6e',
            fontSize: 24,
            marginBottom: 18,
            fontWeight: 600
        }
    },
    submitContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '40px',
        '& .MuiButton-contained' : {
            width: '115px',
            height: '40px',
            '& .MuiButton-label': {
                fontSize: '14px'
            }
        }
    },
    cancelBtn: {
        backgroundColor: '#FFF',
        border: '2px solid #0d2e63',
        margin: '0 10px',
        '&:hover':  {
            backgroundColor: '#303f9f3b'
        },
        '& .MuiButton-label': {
            color: '#0d2e63'
        }
    }
})
