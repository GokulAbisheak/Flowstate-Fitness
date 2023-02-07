import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/index.css'
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import globalTheme from './theme';
import { setMode } from './state';
import AdminLayout from './pages/AdminLayout';
import GridPage from './pages/GridPage';
import Members from './pages/Members';
import NotFound from './pages/NotFound';

function App() {

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(globalTheme(mode)), [mode]);

  return (
    <div className="App">
      <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<AdminLayout/>}>
          <Route path="/" element={<Navigate to="/admin/dashboard"/>} />
            <Route path="/admin/dashboard" element={<GridPage/>} />
            <Route path="/admin/members" element={<Members/>} />
          </Route>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </ThemeProvider>
      </Router>

      {/* <Stack direction="row">
            <SideNav />
            <Layout>
              <Header />
                <Content>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
                </Grid>
                <Grid item xs={6} md={4}>
                  <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
                </Grid>
                <Grid item xs={6} md={4}>
                  <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
                </Grid>
                <Grid item xs={6} md={4}>
                  <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
                </Grid>
                <Grid item xs={6} md={4}>
                  <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
                </Grid>
                <Grid item xs={6} md={4}>
                  <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
                </Grid>
                <Grid item xs={6} md={4}>
                  <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
                </Grid>
                <Grid item xs={6} md={4}>
                  <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
                </Grid>
                <Grid item xs={6} md={4}>
                  <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
                </Grid>
                <Grid item xs={6} md={4}>
                  <ContentBox backgroundColor={theme.palette.background.alt}></ContentBox>
                </Grid>
              </Grid>
              </Content>
            </Layout>
          </Stack> */}
    </div>
  );
}

export default App;
