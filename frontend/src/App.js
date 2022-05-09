import React, { useState, useEffect } from 'react';
import http                           from 'axios';
import logo                           from './logo.svg';
import './App.css';

function App() {

    const [lists, setLists] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        http.get('/api/values')
            .then(response => {
                console.log('response ', response.data);
                setLists(response.data);
            });
    }, []);

    const valueChangeHandler = (event) => {
        setValue(event.currentTarget.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        http.post('/api/value', {
            value: value
        })
            .then(response => {
                if (response.status !== 201) {
                    alert('Error!');
                }
                console.log('response ', response.data);
                setLists([...lists, response.data]);
                setValue('');
            });
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="container">
                    {lists && lists.map((list, index) => (
                        <li key={index}>{list.value}</li>
                    ))}
                    <form
                        className="example"
                        onSubmit={submitHandler}>
                        <input
                            type="text"
                            placeholder="입력해주세요..."
                            value={value}
                            onChange={valueChangeHandler}
                        />
                        <button type="submit">전송</button>
                    </form>
                </div>
            </header>
        </div>
    );
}

export default App;
