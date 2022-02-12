import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import List from "../list/List";

import plus from '../../assets/img/plus.png';
import close from '../../assets/img/close.png';

import './AddList.scss';


function AddList({ onAdd, icon }) {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    function onClose() {
        setVisiblePopup(false);
        setInputValue('');
    }

    const addList = () => {
        if (!inputValue) {
            alert('Введите название списка')
            return;
        }
        setIsLoading(true);


        axios
            .post('http://localhost:3006/lists', {
                name: inputValue,
                colorId: 'icon'
            })
            .then(({ data }) => {
                onAdd(data);
            })
            .finally(() => {
                setIsLoading(false);
                onClose();
            })

    };

    return (
        <div className="add-list">
            <List
                onClick={() => setVisiblePopup(true)}
                icon={plus}
                items={[
                    {
                        className: "list__add-button",
                        name: 'Добавить список',
                    }
                ]} />
            {visiblePopup && <div className="add-list__form">
                <img onClick={onClose} src={close} alt='close' className="add-list__form-close-btn" />
                <input
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    className='field'
                    type='text'
                    placeholder='Название списка' />
                <button onClick={addList} className="button">
                    {isLoading ? 'Добавление...' : 'Добавить'}
                </button>
            </div>}
        </div>
    );
}
export default AddList;