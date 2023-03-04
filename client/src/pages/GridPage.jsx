import { useTheme, Grid } from '@mui/material';
import ContentBox from '../components/ContentBox';
import React from 'react';

const GridPage = () => {

    const theme = useTheme();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
                <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
            </Grid>
            <Grid item xs={12} md={6}>
                <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
            </Grid>
            <Grid item xs={12} md={6}>
                <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
            </Grid>
            <Grid item xs={12} md={6}>
                <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
            </Grid>
            <Grid item xs={12} md={6}>
                <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
            </Grid>
            <Grid item xs={12} md={6}>
                <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
            </Grid>
            <Grid item xs={12} md={6}>
                <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
            </Grid>
            <Grid item xs={12} md={6}>
                <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
            </Grid>
            <Grid item xs={12} md={6}>
                <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
            </Grid>
            <Grid item xs={12} md={6}>
                <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
            </Grid>
            <Grid item xs={12} md={6}>
                <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
            </Grid>
            <Grid item xs={12} md={6}>
                <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
            </Grid>
            <Grid item xs={12} md={6}>
                <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
            </Grid>
            <Grid item xs={12} md={6}>
                <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
            </Grid>
        </Grid>
    );
}

export default GridPage;
