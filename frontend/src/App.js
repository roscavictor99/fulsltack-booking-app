import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './booking/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import TopNav from './components/TopNav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './user/Dashboard';
import DashboardSeller from './user/DashboardSeller';
import NewHotel from './hotels/NewHotel';
import StripeCallback from './stripe/StripeCallback';

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <ToastContainer position="top-center" />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/dashboard" component={Dashboard} exact />
        <PrivateRoute path="/dashboard/seller" component={DashboardSeller} />
        <PrivateRoute path="/hotels/new" component={NewHotel} />
        <PrivateRoute path="/stripe/callback" component={StripeCallback} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
