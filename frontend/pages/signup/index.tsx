

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchUser, signup } from '../../services/services'
import styles from './signup.module.css'

interface UserData {
    name: string,
    email: string,
    password: string
}

const Signup = () => {


    const initialvalue = { name: '', email: '', password: '' }
    const [formData, setFormData]: any = useState<UserData>(initialvalue)
    const [errormsg, setErrormsg] = useState('')
    console.log(formData);
    const { name, email, password } = formData
    const router = useRouter()
    const handleSubmit = async (e: any) => {
        e.preventDefault()

        try {
            if (email && name && password) {
                const user: any = await signup({ email, name, password })


                if (user) {
                    console.log(user);
                    router.push('/login')
                }

            }


        } catch (error: any) {
            console.log(error.data);
            setErrormsg(error.data.message)
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

            const token: any = JSON.parse(localStorage?.getItem('userInfo')!)

            const user: any = await fetchUser(token && token).catch((err) => {

                console.log(err.data.message);
                if(err.data.message=="Unauthorized"){
                router.push('login')
                }

            })


            if (user.data) {
                router.push('/')
            }

        } catch (error: any) {
            console.log(error);
            if (error?.data?.message == 'Unauthorized') {
                router.push('/login')
            }
        }

    }
    return (
        <div className={styles.body}  >
            <div className={styles.center}>
                <h1>Sign up</h1>

                <form onSubmit={handleSubmit} >
                    <div className={styles.errmsg} >{errormsg && errormsg}  </div>
                    <div className={styles.txt_field}>
                        <input onChange={onChange} name='name' type="text" />
                        <span></span>
                        <label  > Name</label>
                    </div>
                    <div className={styles.txt_field}>
                        <input onChange={onChange} name='email' type="text" />
                        <span></span>
                        <label  > Email</label>
                    </div>
                    <div className={styles.txt_field}>
                        <input onChange={onChange} name='password' type="text" />
                        <span></span>
                        <label  > Password</label>
                    </div>
                    <input type="submit" value={'Sign Up'} />
                    <div className={styles.login_link} >
                        Already a Member?  <Link href={'/login'} ><a  >Login</a></Link>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default Signup;