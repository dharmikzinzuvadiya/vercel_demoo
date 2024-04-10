
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [person, setperson] = useState({ fname: "", lname: "" })
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => setData(res.data))
      .catch((e) => console.log(e))
  }, [])

  const handleOnChange = (e) => {
    setperson({ ...person, [e.target.name]: e.target.value })
  }
  const handlePost = () => {
    axios.post('http://localhost:8081/create', person)
      .then((res) => console.log(res))
      .catch((e) => console.log(e))
  }

  const handleDelete = (idx) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${idx}`)
      .then((res) => console.log(res))
      .catch((e) => console.log(e))
  }

  const handleEdit = (idx) => {
    axios.put(`https://jsonplaceholder.typicode.com/posts/${idx}`, person)
      .then((res) => console.log(res))
      .catch((e) => console.log(e))
  }

  return (
    <div className="App">
      <input type='text' name='fname' value={person?.fname} onChange={(e) => handleOnChange(e)} />
      <input type='text' name='lname' value={person?.lname} onChange={(e) => handleOnChange(e)} />

      <button onClick={() => handlePost()}>Post</button>
      {data?.map((item) => {
        return (
          <div style={{ display: 'flex', justifyContent: "space-around" }}>
            <h4>{item?.title}</h4>
            <h4>{item?.id}</h4>
            <button onClick={() => handleDelete(item?.id)}>Delete</button>
            <button onClick={() => handleEdit(item?.id)}>Edit</button>
          </div>
        )
      })}
    </div>
  );
}

export default App;
