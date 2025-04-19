import axios from 'axios';
import React, { useEffect } from 'react'

function Info() {
    const [bookData, setBookData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    useEffect(()=>{
        setLoading(true)
        axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
    },[id])
  return (
    <div>
        
    </div>
  )
}

export default Info
