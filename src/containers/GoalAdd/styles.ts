import {makeStyles, SelectProps} from "@material-ui/core";
import styled from "styled-components";


export const ErrorLabel = styled.span`
   font-style: normal;
   color: #f44336;
   font-size: 12px;
   line-height: 16px;
   letter-spacing: 0.03333em;
`;

export default makeStyles({
    main: {
        padding: 0,
        '& form': {
            marginTop: 20,
            paddingLeft: 20
        }
    },
    navigationHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: 0,
        '& img': {
            width: 40
        }
    },
    formContainer: {
        padding: '0 10px 10px 25px',
        margin: 0,
        height: 'calc(100vh - 155px)',
        overflow: 'auto',
        width: 'auto',
        '& .MuiTypography-h3': {
            color: '#0d2e6e',
        },
        '& .MuiTypography-h3:nth-child(1)': {
            fontSize: 24,
            textTransform: 'none',
            fontWeight: 600,
            marginBottom: 20
        }
    },
    iconSelected: {
        width: 17,
        height: 17,
        marginRight: 5,
        marginLeft: -2,
    },
    color: {
        width: 14,
        height: 14,
        flexShrink: 0,
        borderRadius: 3,
        border: '1px solid #8e8c8c',
        marginRight: 8,
        marginTop: 2,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPaper: {
        position: 'relative',
        backgroundColor: '#FFF',
        width: 'calc(100vw - 200px)',
        overflow: 'auto',
        border: '2px solid #000',
        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
        padding: '0',
        maxHeight: '100vh',
        ['@media (max-width:1100px)']: {
            marginBottom: 680
        },
        '& .MuiCard-root .MuiCardContent-root': {
            padding: 0
        }
    },
    autoCompleteInput: {
        '& .MuiInput-underline': {
            height: 46,
            margin: '3px 0'
        },
        '& .MuiInputLabel-root': {
          margin: '4px 16px',
          color: '#0000008a',
        },
        '& .MuiInput-input.Mui-disabled': {
            color: '#5E626B'
        }
    },
    uploadCaption: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '& .MuiTypography-caption': {
            fontStyle: 'italic',
            fontSize: '10px'
        },
        '& .MuiButton-outlinedPrimary' : {
            display: 'block',
            width: '90px',
            height: '38px',
            marginTop: '8px',
            '& .MuiButton-label' : {
                textTransform: 'none',
                fontSize: '14px',
                margin: 0,
            }
        }
    },
    uploadPlaceholder: {
        display: 'flex',
        width: '85px',
        height: '85px',
        marginRight: '30px',
        border: '2px solid #FAFCFF',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#B0B3B9',
        flexDirection: 'column',
        background: '#F0F2F5',
        boxShadow: '0px 0px 4px rgba(89, 57, 227, 0.55)',
        '& img': {
            width: '85px',
            height: '85px',
            borderRadius: '50%',
        }
    },
    uploadContainer: {
        display: 'flex',
        justifyContent: 'start',
        padding: '5px 0',
        width: '450px',
    },
    fieldContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        maxWidth: 450,
    },
    errorText: {
        marginTop: -4,
        fontSize: 12,
        lineHeight: '16px',
        color: '#f44336',
        fontFamily: `'Inter', sans-serif`,
        fontWeight: 400,
        letterSpacing: '0.4px',
    },
    thingsContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      '& .MuiTextField-root': {
        flexGrow: 1
      },
      '& .MuiSvgIcon-root': {
          fontSize: 14
      }
    },
    submitContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '40px',

        '& .MuiButton-contained' : {
            width: '115px',
            height: '40px',
            textTransform: 'none',
            '& .MuiButton-label': {
                fontSize: '14px'
            }
        }
    }

});
export const selectProps: Partial<SelectProps> = {
    MenuProps:{
        PaperProps: {
            style: {
                width: '190px',
                marginTop: '5px',
                boxShadow: '0px 4px 4px rgba(51, 51, 51, 0.5), 0px 14px 24px rgba(51, 51, 51, 0.5)',
                borderRadius: '4px',
            }
        },
        anchorReference: 'anchorEl',
        anchorOrigin: {
            horizontal: 'left',
            vertical: 'bottom'
        },
        getContentAnchorEl: null
    }
};
