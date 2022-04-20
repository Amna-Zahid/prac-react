import React , {FC} from 'react';
import {Box} from "@material-ui/core";

export interface TabPanelProps {
    dir?: string;
    index: number;
    value: number;
}

const TabPanel: FC<TabPanelProps> = ({index, children, value, ...other}) => (
    <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} {...other}>
        {value === index && (
            <Box style={{height: 'calc(100vh - 250px)'}}>
                {children}
            </Box>
        )}
    </div>
)
export default TabPanel;
