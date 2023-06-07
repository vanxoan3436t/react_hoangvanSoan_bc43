import ReactDOM from 'react-dom/client';

//Cấu hình react router dom
import { BrowserRouter, unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom'
import HomeTemplate from './Templates/HomeTemplate';
import Home from './Pages/Home';
import Login from './Pages/Login';
import UseStateDemo from './Pages/Hooks/UseStateDemo';
import UseEffectDemo from './Pages/Hooks/UseEffectDemo';
import UseCallBackDemo from './Pages/Hooks/UseCallBackDemo/UseCallBackDemo';
import UseMemoDemo from './Pages/Hooks/UseMemo/UseMemoDemo';
import UseRefDemo from './Pages/Hooks/UseRefDemo/UseRefDemo';
// Cấu hình redux
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
import DemoAppChat from './Pages/Hooks/ReduxHook/DemoAppChat';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import Detail from './Pages/Detail';
import Seach from './Pages/Seach';
import Movie from './Pages/Hooks/Movie';

import { createBrowserHistory } from 'history';
//tạo ra 1 history tương tự useNavigate
export const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path='' element={<HomeTemplate />}>
          <Route index element={<Home />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='usestate' element={<UseStateDemo />}></Route>
          <Route path='useeffect' element={<UseEffectDemo />}></Route>
          <Route path='usecallback' element={<UseCallBackDemo />}></Route>
          <Route path='usememo' element={<UseMemoDemo />}></Route>
          <Route path='useref' element={<UseRefDemo />}></Route>
          <Route path='demo-chat' element={<DemoAppChat />}></Route>

          <Route path='profile' element={<Profile />}></Route>
          <Route path='detail' >
            <Route path=':id' element={<Detail />}></Route>
          </Route>
          <Route path='seach' element={<Seach />}></Route>
          <Route path='movie' element={<Movie />}></Route>
          <Route path='register' element={<Register />}></Route>
        </Route>

      </Routes>
    </HistoryRouter>
  </Provider>
);


