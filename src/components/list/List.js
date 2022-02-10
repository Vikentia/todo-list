import React from "react";
import classNames from "classnames";
import axios from "axios";

import remove from '../../assets/img/close2.png'


import './List.scss';




function List({ items, isRemovable, onClick, onRemove, icon }) {

    const removeList = (item) => {
        if (window.confirm('Вы действительно хотите удалить список?')) {
            axios.delete(`http://localhost:3006/lists/ + ${item.id}`).then(() => {
                onRemove(item.id);
            })

        }

    }

    return (
        <ul onClick={onClick} className='list'>
            {items.map((item, index) => (
                <li key={index} className={classNames(item.className, { 'active': item.active })}>
                    <i>{<img src={icon} alt='picture' />}</i>
                    <span>{item.name}</span>
                    {isRemovable && (
                        <img
                            src={remove}
                            className='list__remove-icon'
                            onClick={() => removeList(item)}
                            alt='icon'
                        />)}
                </li>
            ))
            }

        </ul >
    )
}
export default List;