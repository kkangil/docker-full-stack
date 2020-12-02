import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [lists, setLists] = useState([]);
    const [value, setValue] = useState("");

    useEffect(() => {
        // 데이터베이스에 있는 값을 가져옴
        axios.get("/api/values")
            .then(res => {
                console.log("response", res.data);
                setLists(res.data);
            })
    }, []);

    const changeHandler = e => {
        setValue(e.currentTarget.value);
    };

    const submitHandler = e => {
        e.preventDefault();
        axios.post("/api/value", {value})
            .then(res => {
                if (res.data.success) {
                    console.log("response", res.data);
                    setLists([...lists, res.data]);
                    setValue("");
                } else {
                    alert("값을 DB에 넣는데 실패했습니다.")
                }
            })
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <div className={"container"}>
                    <ul>
                        {
                            lists && lists.map((list, index) => (
                                <li key={index}>{list.value}</li>
                            ))
                        }
                    </ul>
                    <form className="example" onSubmit={submitHandler}>
                        <input type="text" value={value} placeholder={"입력해주세요..."} onChange={changeHandler}/>
                        <button type={"submit"}>확인</button>
                    </form>
                </div>
            </header>
        </div>
    );
}

export default App;
