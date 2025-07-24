import React, {useState} from 'react'
import Modal from 'react-modal'
import Button from "../Button/Button.jsx"
import classes from "./Modal.module.css";
import Cookies from "js-cookie";

export default function ModalW({id}) {
    const cookie = Cookies.get("auth")
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    }
    const closeModal = () => {
        setModalIsOpen(false);
    }
    const [Complaint, setForm] = useState({
        topic: '',
        description: '',
        hasError: false
    })
    function handleTopicChange(event) {
        setForm((prev) => ({
            ...prev,
            topic: event.target.value,
            hasError: event.target.value.trim().length === 0,
        }))
    }
    function handleDescriptionChange(event) {
        setForm((prev) => ({
            ...prev,
            description: event.target.value,
            hasError: event.target.value.trim().length === 0,
        }))
    }

    async function fetchReport(description, key){
        const response = await fetch('http://localhost:5045/api/Reports', {
            method: "post",
            body: JSON.stringify({
                text: description,
                typeReportId: 1,
                categoryId: 1,
                uid: key,
            }),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + cookie,
            }
        })
        const json = await response.json()
        if(response.ok){
            closeModal()
        } else {
            console.log(json)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const description = event.target.description.value
        console.log(description)
        fetchReport(description, id)
    };

    const modalContent = (
        <div className={classes.divModal}>
            <h1 style={{color: 'white'}}>Жалоба</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="description"
                    className="control"
                    placeholder="Описание жалобы"
                    value={Complaint.description}
                    style={{
                        backgroundColor:'#93AAFD',
                        minHeight: 200,
                        minWidth: 300,
                    }}
                    onChange={handleDescriptionChange}
                />
                <Button style={{marginLeft: "auto", marginRight: "auto",backgroundColor: '#93AAFD'}}>Отправить</Button>
            </form>
        </div>
    )
    return (
        <div>
            {cookie &&
                <>
                    <Button style={{padding: 10, margin: 5}} onClick={openModal}>Пожаловаться</Button>
                    <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                        {modalContent}
                    </Modal>
                </>
            }
        </div>
    )
}

