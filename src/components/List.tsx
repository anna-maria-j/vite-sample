import React, { useRef } from 'react';
import { useState } from 'react';
import classes from './List.module.scss';

const SAMPLE = [
  { text: 'shopping', done: true },
  { text: 'laundry', done: false },
  { text: 'vacuuming', done: false }
];

const ListComponent: React.FC = () => {
  const [list, setList] = useState(SAMPLE);
  const inputRef = useRef<HTMLInputElement>(null);

  const add = () => {
    const val = inputRef.current?.value;
    if (!val) { return; }
    setList([...list, { text: val, done: false }]);
    inputRef.current.value = '';
  }

  const toggle = (index: number) => {
    const item = list[index];
    setList([...list.map((el, i) => index !== i ? el : { ...el, done: !item.done })]);
  }

  const remove = (index: number) => {
    setList([...list.slice(0, index), ...list.slice(index + 1)]);
  }

  return (
    <div className={classes.root}>
      <h1>{process.env.VITE_TITLE}</h1>
      <input className={classes.input} type="text" ref={inputRef} />
      <button className={classes.button} onClick={add}>Add</button>
      <ul className={classes.list}>
        {list.map((el, i) =>
          <li
            key={i}
            className={`${classes.listItem} ${el.done ? classes.itemDone : ''}`}
            onClick={() => toggle(i)}
          >
            <span className={classes.itemIcon}>{el.done && <>&#10004;</>}</span>
            {el.text}
            <button className={classes.removeButton} onClick={event => { remove(i); event.stopPropagation() }}>&#10005;</button>
          </li>
        )}
      </ul>
      {!list.length && <p>List is empty</p>}
    </div>
  )
}

export default ListComponent;
