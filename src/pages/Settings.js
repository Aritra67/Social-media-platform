import {  useState } from 'react';
import {ToastContainer, toast} from 'react-toastify';
import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';
import "react-toastify/dist/ReactToastify.css";





const Settings = () => {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user?.name ? auth.user.name : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingForm, setSavingForm] = useState(false);
  console.log(auth);



  const clearForm = () => {
setPassword('');
setConfirmPassword('');
  }

  const updateProfile = async() => {
    setSavingForm(true);

    let error = false;
    if(!name || !password || !confirmPassword ){
      toast('Please fill all the fields', {
        appearance: 'error'
      })
      error = true;
    }

    if(password !== confirmPassword ){
      toast('Password and confirm password doesnot match', {
        appearance: 'error'
      })
      error = true;
    }
    if(error){
      return setSavingForm(false);
    }

    const response = await auth.updateUser(
      auth.user._id, 
      name,
      password,
      confirmPassword)

      console.log('settings response', response);
      if(response.success) {
        setEditMode(false);
        setSavingForm(false);
        clearForm();

        return toast('User updated successfully' , {
          appearance: 'success'
        })
      } else {
        toast(response.message ,{
          appearance: 'error'
        })
      }
      
    setSavingForm(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png
"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>

      {editMode && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}

      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
              disabled={savingForm}
            >
              {savingForm ? 'Saving profile...' : 'Save profile'}
            </button>
            <button
              className={`button ${styles.editBtn}`}
              onClick={() => setEditMode(false)}
            >
              Go back
            </button>
          </>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Settings;
