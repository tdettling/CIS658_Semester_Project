/*
L Dettling 
CIS 658 Project

Sources for this file:
https://www.w3schools.com/react/react_useeffect.asp
https://react.dev/reference/react/useEffect
https://www.digitalocean.com/community/tutorials/react-axios-react
https://axios-http.com/docs/handling_errors
https://stackoverflow.com/questions/49967779/axios-handling-errors
https://www.w3schools.com/jsref/jsref_slice_array.asp
https://react.dev/learn/updating-arrays-in-state
*/

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
        link: "/Home",
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



