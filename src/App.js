import React, {useState, useEffect} from "react"
import './App.css';
import {storage} from "./firebase"
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import axios from "axios"

function App() {

  const [image, setImage] = useState()
  const [url, setUrl] = useState()
  const [counter, setCounter] = useState(1)

  const handleChange = (event)=>{
    // console.log(event.target.files[0])
    setImage(event.target.files[0])
  }

  const createImage = (imageObject) =>{
    axios.post("http://localhost:8000/images", imageObject)
      .then(response => console.log(response))
  }

  const handleSubmit = (event)=>{
    let count = counter
    event.preventDefault()
    const imageRef = ref(storage, `1-profile-image-${counter}`)
    uploadBytes(imageRef, image)
      .then(()=>{
        getDownloadURL(imageRef)
          .then(url => {
            const imageObject ={
              imageUrl:url
            }
            createImage(imageObject)
            setCounter(count += 1)
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }


  return (
    <div>
      <h1>File Upload</h1>
      <form onSubmit={handleSubmit}> 
        <label>Picture: </label>
        <br/>
        <br/>
        <input type="file" onChange={handleChange} />
        <br/>
        <br/>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
