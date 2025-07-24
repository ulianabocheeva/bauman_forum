import React, {useState} from 'react'
import Modal from 'react-modal'
import Button from "../Button/Button.jsx"
import classes from "./Modal.module.css";
import Cookies from "js-cookie";
import {useParams} from "react-router-dom";

export default function ModalAnswer() {
    const cookie = Cookies.get("auth")
    let { id } = useParams();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    }
    const closeModal = () => {
        setModalIsOpen(false);
    }
    const [Complaint, setForm] = useState({
        description: '',
        hasError: false
    })

    function handleDescriptionChange(event) {
        setForm((prev) => ({
            ...prev,
            description: event.target.value,
            hasError: event.target.value.trim().length === 0,
        }))
    }

    async function fetchAnswer(description){
        const response = await fetch('http://localhost:5045/api/Answers', {
            method: "post",
            body: JSON.stringify({
                text: description,
                questionToAnswerId: id,
                countLikes: 0,
                countDislikes: 0
            }),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + cookie,
            }
        })
        const json = await response.json()
        if(response.ok){
            closeModal()
            window.location.reload();
        } else {
            console.log(json)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const description = event.target.description.value
        console.log(description)
        fetchAnswer(description)
    };

    const modalContent = (
        <div className={classes.divModal}>
            <h1 style={{color: 'white'}}>Ответ на вопрос</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="description"
                    className="control"
                    placeholder="Текст ответа"
                    value={Complaint.description}
                    style={{
                        backgroundColor:'#93AAFD',
                        minHeight: 200,
                        minWidth: 300,
                    }}
                    onChange={handleDescriptionChange}
                />
                <Button type="submit" style={{marginLeft: "auto", marginRight: "auto", backgroundColor: '#93AAFD'}}>Отправить</Button>
            </form>
        </div>
    )
    return (
        <div>
            {cookie &&
                <>
                    <Button style={{marginLeft: "auto", marginEight: 0, marginBottom: "1rem"}} onClick={openModal}>Ответить</Button>
                    <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                        {modalContent}
                    </Modal>
                </>
            }
        </div>
    )
}

