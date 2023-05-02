import { Box } from '@mui/system';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const CommonLayout = () => {
    
    return (
        <Box width="100%" height="100%" margin="0px">
            <Header />
            <Outlet>

            </Outlet>
        </Box>
    );
}

export default CommonLayout;
