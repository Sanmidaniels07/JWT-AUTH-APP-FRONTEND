import React, { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from "react-cookie"
import { ToastContainer, toast } from 'react-toastify'

export default function Secret() {

  const navigate = useNavigate()
  const [cookies, setCookies, removeCookies] = useCookies([])
  useEffect(() => {
    const verifyUser = async () => {
      if(!cookies.jwt) {
        navigate("/login")
      } else {
        const { data } = await axios.post(
          "http://localhost:4000", {}, { withCredentials: true, }
        );
        if(!data.status){
          removeCookies("jwt");
          navigate("/login")
        } else toast.success(`Login successful ${data.user}`, { theme: 'dark', toastId: 'success1'});
      }
    }
    verifyUser()
  }, [cookies, navigate, removeCookies])

  const logOut = () => {
    removeCookies("jwt")
    navigate("/login")
  }


  return (
    <>
    <div className='private'>
      <h1>Welcome Page</h1>
      <button onClick={logOut}>Log Out</button>
    </div>
    <ToastContainer/>
    </>
  )
}
