import { log } from "console";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";


import { useEffect, useState } from "react";
import { fetchUser, logout } from "../services/services";
import styles from './homepage.module.css'


interface userData {
    _id: string,
    name: string,
    email: string
}
const index: NextPage = () => {


    const [userData, setUserData] = useState<userData>({ _id: '', email: '', name: '' })
    const router = useRouter()
    useEffect(() => {
        getuser()

    }, [])


    const getuser = async () => {
        try {

            const token: any = JSON.parse(localStorage?.getItem('userInfo')!)
            const config = {
                headers: { Authorization: `Bearer ${token.access_token}` }
            };
            const user: any = await fetchUser(config)


            if (user.data) {
                router.push('/')
            }

        } catch (error: any) {
            console.log(error?.data?.message);
            if (error.data.message == 'Unauthorized') {
                router.push('/login')
            }
        }

    }

    const logOut = async () => {

        try {
            const data: any = await logout()

            if (data) {
                console.log(data);

                router.push('/login')


            }
        } catch (error) {

        }


    }
    return (
        <div className={styles.homePage}>

            <h1>Todo application </h1>
            <h3>welcome {userData.name}</h3>
            <Link href={'/todo'} >
                <h2 style={{ color: "blue", cursor: "pointer", width: "200px" }}> Go to app</h2>
            </Link>


            <button onClick={logOut} className={styles.logoutbtn} >Logout</button>
        </div>
    );
}

export default index;