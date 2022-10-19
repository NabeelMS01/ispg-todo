import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchUser, login } from '../../services/services';
import styles from './login.module.css'

const Login: NextPage = () => {
    const router = useRouter()
    const [errormsg, setErrormsg] = useState('')
 
 const [formData, setFormData] = useState({ email: "", password: "" })
    const { email, password } = formData

    const onSubmit = async (e: any) => {
        e.preventDefault()

        try {
            if (email && password) {

                const user: any = await login({ email, password })
                console.log(user.data.message);
                if (user?.data?.message == "success") {
                    console.log("hello");

                    router.push('/')
                }

            }
        } catch (error) {
            console.log(error);

        }

    }



    const onChange = (e: any) => {
        setErrormsg('')
        setFormData((prevState: any) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }



    
    useEffect(() => {
        getuser()

    }, [])


    const getuser = async () => {
try {
     const user: any = await fetchUser() 
 
    
   if(user.data){
    router.push('/')
   }

} catch (error:any) {
    console.log(error.data.message);
    if(error.data.message=='Unauthorized'){
   router.push('/login')
    }
} 

    }


    return (
        <div className={styles.body}  >
            <div className={styles.center}>
                <h1>Login</h1>
                <form onSubmit={onSubmit} >
                    <div className={styles.errmsg} >{errormsg && errormsg}  </div>
                    <div className={styles.txt_field}>
                        <input onChange={onChange} name='email' type="text" />
                        <span></span>
                        <label > Email</label>
                    </div>
                    <div className={styles.txt_field}>
                        <input onChange={onChange} name='password' type="text" />
                        <span></span>
                        <label  > Password</label>
                    </div>
                    <input type="submit" value={'Login'} />
                    <div className={styles.login_link} >
                        Not a Member?  <Link href={'/signup'} ><a  >Sign up</a></Link>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default Login;