import '../Pages/mainPage/mainPage.css'
import { Button } from 'react-bootstrap';
import Image from '../../Images/logo.jpeg';
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from 'react';
import axios from 'axios';
import './sidebar.css';
import { useLocation } from 'react-router-dom';
import Profile from '../../Images/profiepic.jpg'



export default function Sidebar(){
 const [admin,setAdmin] = useState({})
 const [underline,setUnderline] = useState({float: 'right',marginTop:20})
 const [user,setUser] = useState({float: 'right',marginTop:20})
 const [dailyTask,setDailyTask] = useState({float: 'right',marginTop:20})

 const navigate =useNavigate()
 let location = useLocation();

    function handleLogo(){
        navigate("/")
    }
    function handleDashboard(){
        navigate("/")
    }
    function handleUser(){
        navigate("/user")
    }
    function handleDailyTask(){
        navigate("/dailyTask")
    }

useEffect(()=>{
    if(location.pathname==="/"){
        setUnderline({float: 'right',marginTop:20,borderBottom:'3px solid #ef0b60'})
        setUser({marginLeft:73,marginTop:20})
        setDailyTask({float:'right',marginTop:20})
    }
    if(location.pathname==="/user"){
        setUser({marginLeft:73,marginTop:20,borderBottom:'3px solid #ef0b60'})
        setUnderline({float: 'right',marginTop:20})
        setDailyTask({float:'right',marginTop:20})
    }
    if(location.pathname==="/dailyTask"){
        setUser({marginLeft:73,marginTop:20})
        setUnderline({float: 'right',marginTop:20})
        setDailyTask({float:'right',marginTop:20,borderBottom:'3px solid #ef0b60'})
    }
axios.get('http://localhost:3001/user').then((response)=>setAdmin(response.data)).catch((err)=>console.log(err))
},[])


    return (
        <>
         <img src={Image} alt="Company Logo" style={{width:180,height: 110,paddingLeft:60}} onClick={()=>handleLogo()}></img>
           <div>
            <div className='profilePic'>
                <img src={Profile} alt="Profile Pic" style={{width:70,height:70,borderRadius:30}}></img>
<div className="changeProfile"><i class="fa-solid fa-bolt"></i></div>
            </div>
         {admin.length>0?<h6 className='admin'>{admin[5].name}</h6>:""}
         {admin.length>0?<h6 className='designation'>{admin[5].designation}</h6>:""}
         </div>
                <br></br>
                <Button  variant="light" size="md" style={underline} onClick={()=>handleDashboard()}><i class="fa-solid fa-chart-line"></i> &nbsp; Dashboard</Button>
                <br></br>
                <Button  variant="light" size="md" style={user}  onClick={()=>handleUser()}><i class="fa-solid fa-user"></i> &nbsp; User</Button>
                <br></br>
                <Button  variant="light" size="md" style={dailyTask}  onClick={()=>handleDailyTask()}><i class="fa-solid fa-list-check"></i> &nbsp; Daily Task</Button>
        </>
    )
}