import {makeStyles} from "@material-ui/core";

export default makeStyles({
    containerRoot: {
        padding: 30
    },
    helperSortable: {
        boxShadow: 'rgba(0, 0, 0, 0.075) 0px 1px 6px, rgba(0, 0, 0, 0.075) 0px 1px 4px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        cursor: 'row-resize',
        borderRadius: 8,
        marginBottom: 20,
        padding: 20,
    },
    noItemContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        '& img': {
            height: 150
        }
    },
    goalsContainer: {
        margin: '10px 0',
        padding: '15px 30px',
        border: '1px solid #ccc',
        minHeight: 200,
        borderRadius: 8,
        '& .MuiTypography-h3': {
            fontSize: 24,
            margin: '15px 0',
            fontWeight: 600,
        }
    }

});
