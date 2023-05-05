import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {ToastContainer, toast} from 'react-toastify';
import styles from '../styles/login.module.css';
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from '../hooks';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggigIn] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoggigIn(true);

        if(!email || !password){
            return toast('Please enter both email and passoword',{
                appearance: 'error'
            })
        }
        const response = await auth.login(email, password);
   
        if(response.success){
            toast('Successfully logged in ',{
                appearance: 'success'
            })
        }else{
            return toast(response.message,{
                appearance: 'error'
            })
        }
        setLoggigIn(false)
    }
    if(auth.user){
        return navigate('/');
      }
    

    return ( 
        <form className={styles.loginForm} onSubmit={handleSubmit}>
        <span className={styles.loginSignupHeader}>Log In</span>

        <div className={styles.field}>
            <input 
            type='email' 
            placeholder='Email' 
            // required 
            value={email} 
            onChange={(e) => setEmail(e.target.value) } />
            </div>

            <div className={styles.field}>
            <input 
            type='password' 
            placeholder='Password' 
            // required
            value={password} 
            onChange={(e) => setPassword(e.target.value) } 
             />
            </div>

            <div className={styles.field} >
           <button disabled={loggingIn}>
            {loggingIn ? 'Logging in...' : 'Log In'}
            <ToastContainer/>
           </button>
            </div>

        </form>
    )
}

export default Login;