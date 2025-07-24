import { styled } from 'styled-components'
import React, {useEffect, useRef, useState} from 'react'
import Button from "../Button/Button.jsx";
import {Link, useNavigate} from "react-router-dom";
import classes from "../Pages/Pages.module.css";
import Cookies from "js-cookie";
import TabHeader from "./TabsHeader.jsx";

const HeaderContainer = styled.header`
  height: 50px;
  display: flex;
  padding: 0 3rem;
  border-bottom: 1px solid #ccc;
  background: #fafafa; 
  ::placeholder {
        color: white;
    }
`
export default function Header() {
    const [form, setForm] = useState({
        find: '',
        hasError: false
    })

    function handleChange(event) {
        setForm((prev) => ({
            ...prev,
            find: event.target.value,
            hasError: event.target.value.trim().length === 0,
        }))
    }
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const question = event.target.find.value
        if(question !== ""){
            console.log(question)
            navigate("/search/" + question)
            event.target.reset();
        }
    };

    return (
        <HeaderContainer>
            <Link to={"/"}><h1 style={{color: '#2D5BFF'}}>BaumanForum</h1></Link>
            <form onSubmit={handleSubmit}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <input
                        placeholder=" Поиск вопроса..."
                        type="text"
                        id="find"
                        className="control"
                        value={form.find}
                        onChange={handleChange}
                        style={{
                            marginBottom: 0, background: '#2D5BFF', border: 'none',
                            padding: 4, marginRight: 10
                        }}
                    />
                    <Button type="submit">> Искать</Button>
                </div>
            </form>
            <TabHeader/>
        </HeaderContainer>
    )
}