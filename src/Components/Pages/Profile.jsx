import Cookies from "js-cookie";
import {Link, useNavigate} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import Button from "../Button/Button.jsx";
import classes from './Pages.module.css'

export default function ProfileSection(){
    const cookie = Cookies.get("auth")
    const [user, setUser] = useState({})
    const [isAdmin, setIsAdmin] = useState(false)

    const fetchUser = useCallback(async () => {
        const response = await fetch(
            `http://localhost:5045/profile`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + cookie,
                }
            }
        )
        const data = await response.json()
        //const slicedQuestions = data.slice(0, 5) // Обрезаем массив до первых 5 элементов
        setUser(data)

        const adminResponse = await fetch(
            `http://localhost:5045/api/Reports`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + cookie,
                }
            }
        )

        if(adminResponse.ok){
            setIsAdmin(true)
        }

    }, [])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    function logOut(){
        Cookies.remove("auth")
    }

    return (
        <div className={classes.loginDiv} style={{minHeight: '80vh'}}>
            <h1>Профиль</h1>
            <p>Фамилия: {user.Surname}</p>
            <p>Имя: {user.Name}</p>
            <p>Отчество: {user.SecondName}</p>
            <p>Группа: {user.Group}</p>
            <p>Почта: {user.Email}</p>

            {isAdmin && <Link to={"/admin"}><Button style={{marginBottom: "1rem"}}>Админка</Button></Link>}

            <Link to={"/"}><Button onClick={logOut}>Выйти</Button></Link>
        </div>
    )
}