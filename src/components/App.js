
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';


import { useAuth } from '../hooks';
import { Home, Login, Signup ,Settings , UserProfile} from '../pages';
import { Loader, Navbar } from './';


function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth.user ? <>{children}</> : <Navigate to="/login" />;
}


const Page404 = () => {
  return <h1>404</h1>;
};

function App() {

  const auth = useAuth();
  
  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      
      <Router>
      <Navbar />
      <Routes>
        <Route  path="/" element={<Home/>} />
       
        <Route  path="/login" element={<Login/>} />

        <Route  path="/signup" element={<Signup/>}/>

        {/* <Route  path='/settings' element={<Settings/>}/> */}
        {/* <PrivateRoute path="/settings" component={Settings} />
         */}
         <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        /> 

        <Route
          path="/user/:userId"
          element={
            <PrivateRoute>
              <UserProfile/>
            </PrivateRoute>
          }
        /> 
        <Route element={<Page404 />} />
        
        </Routes>
      </Router>
    </div>
  );
}

export default App;
