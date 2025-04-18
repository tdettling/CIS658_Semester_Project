import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import StoreIcon from '@mui/icons-material/Store';
import GroupIcon from '@mui/icons-material/Group';
import GradingIcon from '@mui/icons-material/Grading';
import SettingsIcon from '@mui/icons-material/Settings';

export const SidebarData = [
    {
        title:"Home",
        icon: <HomeIcon />,
        link: "/",
    }, 
    {
        title:"Inventory Report",
        icon: <InventoryIcon />,
        link: "/inventory",
    }, 
    {
        title:"ISDs",
        icon: <StoreIcon />,
        link: "/ISDs",
    }, 

    {
        title:"Items to Order",
        icon: <GradingIcon />,
        link: "/ItemsToOrder",
    }, 
    {
        title:"Users",
        icon: <GroupIcon />,
        link: "/Users",
    }, 
    {
        title:"Settings",
        icon: <SettingsIcon />,
        link: "/Settings",
    }, 



]



