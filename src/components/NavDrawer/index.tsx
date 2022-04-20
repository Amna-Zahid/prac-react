import React, {FC, useEffect} from "react";
import {makeStyles,Drawer, Typography, Divider,
    ListItem, List, Theme, ListItemIcon, ListItemText } from "@material-ui/core";
import logoAlt from "assets/logoAlt.svg"
import {PeopleAlt, Search, Settings, Dashboard, Policy} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {useHistory, useLocation} from "react-router";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#0d2e6e'
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    logoNav: {
        display: 'flex',
        gap: 15,
        alignItems: 'center',
        '& img': {
            maxWidth: '30px'
        },
        '& .MuiTypography-body2': {
            fontSize: 20,
            fontWeight: 500,
            lineHeight: '25px',
            color: '#FFF'
        },
        padding: '22px 0 22px 15px !important'

    },
    navActive: {
        background: 'linear-gradient(270deg, #1b3566 0%, #1552c7 100%)',
        '& .MuiListItemIcon-root': {
            '& .MuiSvgIcon-root': {
                color: '#fff!important'
            }
        },
        '& .MuiListItemText-root': {
            color: '#FFF!important'
        }
    }

}));

const listIcons = [
    <Dashboard style={{color: '#FFF'}} />,
    <Policy style={{color: '#FFF'}} />,
    <Policy style={{color: '#FFF'}} />,
];

const NavDrawer: FC = () => {
   const classes = useStyles();
   const history = useHistory();
   let {pathname} = useLocation();
   console.log(pathname);
   const routeTo = (route: string) => {
       history.push(route);
   }
   const activeNav = (route: string): boolean => {
       if (route === pathname || (['/', '/goalsAdd', '/goalTip'].includes(pathname) && route === '/')) {
           return true;
       }
       return false;
    }

   return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            PaperProps={{ elevation: 4 }}
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <div className={`${classes.drawerPaper} ${classes.logoNav}`} >
                <img src={logoAlt}/>
                <Typography variant="body2"> Pennyworth</Typography>
            </div>
            <List style={{marginTop: 50}}>
                {[{text: 'Goals hub', route: '/'}, {text: 'Privacy  policy', route: '/policy'}, {text: 'Terms & conditions', route: '/terms'}].map(({route, text}, index) => (
                    <ListItem button key={text} className={`${activeNav(route) && classes.navActive}`}>
                        <ListItemIcon>{listIcons[index]}</ListItemIcon>
                        <ListItemText style={{color: '#FFF'}}  onClick={() => {routeTo(route)}}>
                            {text}
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}

export default NavDrawer;
