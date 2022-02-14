import React, { useState, useEffect } from 'react';
import List from '../list/List';
import AddList from '../add-list/AddList';
import Tasks from '../tasks/Tasks';

import axios from 'axios';

import point from '../../assets/img/point.png';
import menu from '../../assets/img/menu.png';
import plus from '../../assets/img/plus.png';


import './App.scss';


function App() {

  const [lists, setLists] = useState(null);


  useEffect(() => {
    axios
      .get('http://localhost:3006/lists')
      .then(({ data }) => {
        setLists(data)
      })
  }, [])

  useEffect(() => {
    axios
      .get('http://localhost:3006/lists')
      .then(({ data }) => {
        setLists(data)
      })
  }, [lists])

  function onAddList(obj) {
    obj.icon = point;
    const newList = [...lists, obj];
    setLists(newList);
  }

  return (
    <div className="todo">
      <div className='todo__sidebar'>

        <List items={[
          {
            name: 'Все задачи',
            active: true,
          }
        ]}
          icon={menu}
        />

        {lists ? (
          <List
            items={lists}
            icon={point}
            onRemove={id => {
              const newLists = lists.filter(item => item.id !== id);
              setLists(newLists);
            }
            }
            isRemovable
          />
        ) : (
          'Загрузка...'
        )}

        <AddList onAdd={onAddList} icon={plus} />
      </div>

      <div className='todo__tasks'>
        <Tasks />
      </div>

    </div >
  );
}

export default App;
