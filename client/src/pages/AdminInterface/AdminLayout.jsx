import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import SideNav from '../AdminInterface/SideNav';

const AdminLayout = () => {
    return (
        <Box width="100%" height="100%" margin="0px">
        <Stack direction="row">
            <SideNav />
            <Box width="100%">
                <Header />
                <Box width="100%" padding="20px">
                    <Outlet>

                    </Outlet>
                </Box>
            </Box>
        </Stack>
        </Box>
    );
}

export default AdminLayout;
