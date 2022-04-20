import {makeStyles} from "@material-ui/core";

export default makeStyles({
    root: {
        backgroundColor: '#ebecf0',
        margin: '15px 0',
        borderRadius: 4,
        padding: 15,
        minWidth: 400,
        minHeight: 200,
        maxHeight: 'calc(100vh - 170px)',
        overflow: 'auto',
        boxShadow: '1px 2px 4px -1px rgb(0 0 0 / 20%)',
    },
    tipContainerHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 5px',
        '& .MuiButton-containedPrimary': {
            padding: 10
        },
        '& div .MuiTypography-h2': {
            color: '#0d2e6e',
            fontWeight: 600
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
    submitContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '40px',
        '& .MuiButton-contained' : {
            width: '190px',
            height: '40px',
            '& .MuiButton-label': {
                fontSize: '14px'
            }
        }
    }
})
