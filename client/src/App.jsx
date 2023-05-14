import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/index.css'
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import globalTheme from './theme';
import AdminLayout from './pages/AdminInterface/AdminLayout';
import GridPage from './pages/AdminInterface/GridPage';
import Members from './pages/UserManagement/Members';
import NotFound from './pages/NotFound';
import Main from './pages/TrainerManagement/main'
import Login from './pages/UserManagement/Login';
import UserLayout from './pages/UserInterface/UserLayout'
import SignUp from './pages/UserManagement/SignUp';
import DisplayUsers from './pages/UserManagement/DisplayUsers';
import PurchaseMembership from './pages/UserManagement/PurchaseMembership';
import DisplayMemberships from './pages/UserManagement/DisplayMembership';
import AddProducts from './pages/ProductManagement/AddProducts';
import UpdateProducts from './pages/ProductManagement/UpdateProducts';
import DeleteProducts from './pages/ProductManagement/DeleteProducts';
import AddReviews from './pages/CustomerRelationshipManagement/addReviews';
import UpdateReviews from './pages/CustomerRelationshipManagement/UpdateReviews';
import Cart from './pages/ProductManagement/Cart';
import MainPayment from './pages/PaymentManagement/MainPayment';
import AdminPayment from './pages/PaymentManagement/AdminPayment';
import TrainerCalendar from './pages/PersonalTrainingManagement/TrainerCalendar';
import Attendance from './pages/PersonalTrainingManagement/Attendance';
import AddAttendance from './pages/PersonalTrainingManagement/AddAttendance';
import ProductScreen from './pages/ProductManagement/ProductScreen';
import ProductHandle from './pages/ProductManagement/ProductHandle';
import UserPrivateRoute from './components/UserPrivateRoute';
import DisplayReviewsUser from './pages/CustomerRelationshipManagement/DisplayReviewsUser';
import DisplayReviewsAdmin from './pages/CustomerRelationshipManagement/DisplayReviewsAdmin';
import UpdateAttendance from './pages/PersonalTrainingManagement/UpdateAttendance';
import DeleteAttendance from './pages/PersonalTrainingManagement/DeleteAttendance';
import AddFinances from './pages/FinanceManagement/AddFinances';
import UpdateFinances from './pages/FinanceManagement/UpdateFinances';
import DeleteFinances from './pages/FinanceManagement/DeleteFinances';
import ScanMembership from './pages/UserManagement/ScanMembership';
import Profile from './pages/UserManagement/Profile';
import AdminPrivateRoute from './components/AdminPrivateRoute';
import ForgetPassword from './pages/UserManagement/ForgetPassword';
import CommonLayout from './pages/CommonInterface/CommonLayout';
import LoggedRedirect from './components/LoggedRedirect';
import AddSession from './pages/PersonalTrainingManagement/AddSession';
import AddTrainer from './pages/TrainerManagement/AddTrainer';
import DisplayTrainers from './pages/TrainerManagement/DisplayTrainer';
import DisplayCards from './pages/TrainerManagement/DisplayCards';
import ApplyTrainer from './pages/TrainerManagement/ApplyTrainer';
import VeiwApp from './pages/TrainerManagement/DisplayApplication';
import Home from './pages/Home';
import UserCalendar from './pages/PersonalTrainingManagement/UserCalendar';
import DeletePayment from './pages/PaymentManagement/DeletePayment';

function App() {

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(globalTheme(mode)), [mode]);

  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<AdminLayout />}>

              {/* User Management */}
              <Route path="/" element={<Navigate to="/admin/dashboard" />} />
              <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
              <Route element={<AdminPrivateRoute />}>
                <Route path="/admin/dashboard" element={<Navigate to="/admin/members" />} />
                <Route path="/admin/members" element={<DisplayUsers />} />
                <Route path="/admin/users" element={<DisplayUsers />} />
                <Route path="/admin/membership" element={<DisplayMemberships />} />
                <Route path="/admin/scan" element={<ScanMembership />} />

                {/* Trainer Management */}
                <Route path="/admin/trainers" element={<DisplayTrainers />} />
                <Route path="/admin/addTrainers" element={<AddTrainer />} />
                <Route path="/admin/viewApp" element={<VeiwApp />} />

                {/* Product Management */}
                <Route path="/admin/products" element={<ProductHandle />} />
                <Route path="/admin/addProducts" element={<AddProducts />} />
                <Route path="/admin/updateProducts" element={<UpdateProducts />} />
                <Route path="/admin/deleteProducts" element={<DeleteProducts />} />

                {/* Finance Management */}
                <Route path="/admin/addFinances" element={<AddFinances />} />
                <Route path="/admin/updateFinances" element={<UpdateFinances />} />
                <Route path="/admin/deleteFinances" element={<DeleteFinances />} />

                {/* Payment Management */}
                <Route path="/admin/mainpayment" element={<MainPayment />} />
                <Route path="/admin/payment" element={<AdminPayment />} />
                <Route path="/admin/deletepayment" element={<DeletePayment />} />
              

                {/* Personal Training Management */}
                <Route path="/admin/schedule" element={<TrainerCalendar />} />
                <Route path="/admin/addSession" element={<AddSession />} />
                <Route path="/admin/attendance" element={<Attendance />} />
                <Route path="/admin/addAttendance" element={<AddAttendance />} />
                <Route path="/admin/updateAttendance" element={<UpdateAttendance />} />
                <Route path="/admin/deleteAttendance" element={<DeleteAttendance />} />

                {/* Customer Relationship Management */}
                <Route path="/admin/feedback" element={<DisplayReviewsAdmin />} />
              </Route>
            </Route>

            <Route element={<CommonLayout />}>
              <Route element={<LoggedRedirect />}>
                {/* User Management */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot" element={<ForgetPassword />} />
                <Route path="/user/applyTrainer" element={<ApplyTrainer />} />
                <Route path="/home" element={<Home />} />
              </Route>
            </Route>

            <Route element={<UserLayout />}>
              <Route element={<UserPrivateRoute />}>
                <Route path="/user" element={<Navigate to="/user/profile" />} />
                <Route path="/user/membership" element={<PurchaseMembership />} />
                <Route path="/user/profile" element={<Profile />} />


                {/* Trainer Managment */}
                <Route path="/user/trainers" element={<DisplayCards />} />

                {/* Customer Relationship Management */}
                <Route path="/user/addReviews" element={<AddReviews />} />
                <Route path="/user/updateReviews" element={<UpdateReviews />} />
                <Route path="/user/displayReviewUser" element={<DisplayReviewsUser />} />

                {/* Product Management */}
                <Route path="/user/productScreen" element={<ProductScreen />} />
                <Route path="/user/cart" element={<Cart />} />

                {/* Payment Management */}
                {/* <Route path="/user/adminpayment" element={<AdminPayment />} /> */}
                <Route path="/user/mnpayment" element={<MainPayment />} />
                <Route path="/user/pay/:amount/:desc" element={<MainPayment />} />

                {/* Personal Training Management */}
                <Route path="/user/addSession" element={<AddSession />} />
                <Route path="/user/usercal" element={<UserCalendar />} />
              </Route>
            </Route>
            
            {/* Page Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>

  );
}

export default App;