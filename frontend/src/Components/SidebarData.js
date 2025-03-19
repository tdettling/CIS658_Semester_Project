import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import StoreIcon from '@mui/icons-material/Store';
import GroupIcon from '@mui/icons-material/Group';

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
        title:"Orders",
        icon: <StoreIcon />,
        link: "/orders",
    }, 
    {
        title:"Users",
        icon: <GroupIcon />,
        link: "/users",
    }, 


]



