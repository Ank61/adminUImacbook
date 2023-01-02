import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';

export default function Dashboard() {
    const [dept, setDept] = useState("")
    const [update, setUpdate] = useState("")
    const [present, setpresent] = useState("")
    const [Absent, setabsent] = useState("")
    const [showtoday, setTodayShow] = useState(false);
    const [showMonth, setMonthShow] = useState(false);
    const [showUpdate, setUpdateShow] = useState(false);
    const [editPresentation, setEditPresentation] = useState(false);
    const [editData,setEditData] =useState({presentationClickedName:"",presentationClickedTopic:""})


    useEffect(() => {
        axios.get("http://localhost:3001/dashboard").then((response) => {
            setUpdate(response.data[0].update);
        }).catch((err) => console.log(err))


        axios.get("http://localhost:3001/user").then((response) => {
            const present = response.data.filter((item) => item.status === "present");
            const absent = response.data.filter(function (filteredInput) {
                return !present.find(function (input) {
                    return input.name === filteredInput.name;
                });
            });
            setabsent(absent.length)
            setpresent(present.length)
        }).catch((err) => console.log(err))

        axios.get("http://localhost:3001/dashboard").then((response) => {
            setDept(response.data[0])
            console.log(response.data[0])
        }).catch((err) => console.log(err))
    }, [])
    //Handler for Editing Presentation
    const handlePresentation = (item) => {setEditPresentation(true)
          setEditData({presentationClickedName :item.name, presentationClickedTopic :item.topic})}
    const closePresentation = () => setEditPresentation(false);
    //Handler for Today Modal
    const handleClose = () => setTodayShow(false);
    const handleShow = () => setTodayShow(true);
    //Handler for Month Modal
    const handleCloseMonth = () => setMonthShow(false);
    const handleShowMonth = () => setMonthShow(true);
    //Handler for Month Modal
    const handleCloseUpdate = () => setUpdateShow(false);
    const handleShowUpdate = () => setUpdateShow(true);
    //Global Variable for calculation 
    var Assigned = 0
    var Completed = 0
    var MonthAssgined = 0;
    var MonthAchieved = 0;
    //Current Month
    const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthNumber = new Date().getMonth()
    var Month = monthName[monthNumber]
    //Current Full Date
    const today = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const fullDate = today.toLocaleDateString('en-IN', options);
    //react-crousel 
    const prevIconn = <span className="carousel-control-prev"><i class="fa-solid fa-arrow-left-long"></i></span>
    const nextIconn = <span className="carousel-control-next"><i class="fa-solid fa-arrow-right-long"></i></span>
    const indicatorss = <span className="carousel-indicators"><i class="fa-solid fa-arrow-right-long"></i></span>
    //Submiting the presentation edit
    function handleSubmitPresentation(e){
        e.preventDefault()
        console.log("onsbmit",editData.presentationClickedName, editData.presentationClickedTopic)
        // setEditData({presentationClicked:""})
        const obj ={
            name : editData.presentationClickedName,
            topic: editData.presentationClickedTopic,
            time: "3:00 PM"
        }
        axios.put('http://localhost:3001/dashboard',obj).then((response)=>console.log(response.data)).catch((err)=>console.log(err))
        closePresentation();
    }

    return (
        <div>
            <div className="MainDash">
                <div className="Dash">
                    <h5 className="heading">Notification</h5>
                    <ul className='notification'>
                        {update[0] ? <li><small>Today is {update[0].Birthday}'s birthday.</small></li> : ""}
                    </ul>
                    <h6 className="Subheading">Today's Status</h6>
                    <ul className='notification'>
                        <li><small>Total employee present : &nbsp; {present}  </small></li>
                        <li><small>Total employee absent : &nbsp; {Absent}  </small></li>
                    </ul>
                </div>
                <div className="Dash2">
                    <h5 className="heading">Today's Update </h5>
                    <u>Presentation</u>
                    <Modal show={editPresentation} onHide={closePresentation} dialogClassName="modal-90w" centered>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ color: '#bd6b35', marginLeft: 30 }}>Edit Presentation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={(e)=>handleSubmitPresentation(e)}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Employee</Form.Label>
                                    <Form.Control type="text"  value={editData.presentationClickedName } onChange={(e)=>setEditData((prevState)=>({...prevState,presentationClickedName: e.target.value}))}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Topic</Form.Label>
                                    <Form.Control type="text" value={editData.presentationClickedTopic } onChange={(e)=>setEditData((prevState)=>({...prevState,presentationClickedTopic: e.target.value}))}/>
                                </Form.Group>
                                <Button className="closeButton" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Button className="closeButton" onClick={closePresentation}>
                            Close
                        </Button>
                    </Modal>
                    {/*<button className='editPresentation' onClick={() => handlePresentation(item)}><i class="fa-solid fa-pen-to-square"></i></button> */}
                    <ul>
                        {update ? update[1].presentation.map((item, i) => (<li key={i}> <small><b>Employee:&nbsp;</b>&nbsp;{item.name} &nbsp; <b>Topic:</b>&nbsp;{item.topic}</small> </li>)) : ""}
                    </ul>
                    <u>Meeting</u>
                    <ul>
                        {update ? update[2].meetings.map((item, i) => (<li key={i}> <small><b>Subject:&nbsp;</b>&nbsp;{item.subject} </small></li>)) : ""}
                    </ul>
                    <u>Proposal</u>
                    <ul>
                        {update ? update[3].proposal.map((item, i) => (<li key={i}> <small><b>Subject:&nbsp;</b>&nbsp;{item.topic} </small></li>)) : ""}
                    </ul>
                </div>
            </div>


            {/* Crousal for bootstrap*/}
            <Carousel variant="dark" prevIcon={prevIconn} nextIcon={nextIconn} indicators={indicatorss} interval={2000} >

                {/* First Slide starts here*/}
                <Carousel.Item>
                    <div className="Dash3">
                        <div className='text_performance'>
                            <h5>Performance</h5>
                            <p style={{ color: '#0f1322' }}>Buisness Development Department</p>
                        </div>

                        <div className='bda' onClick={handleShow}>
                            <h6 style={{ marginLeft: 30, display: 'inline' }}>This Day</h6>&nbsp; &nbsp;
                            {dept.bda ? dept.bda.map((item) => {
                                const completed = Number(item.completed)
                                const assigned = Number(item.today)
                                Assigned += assigned
                                Completed += completed
                            }) : ""}
                            {Assigned >= Completed ? <i class="fa-solid fa-arrow-down" style={{ color: '#f56f61' }}></i> : <i class="fa-solid fa-arrow-up" style={{ color: 'green' }}></i>}
                            <ul style={{ paddingTop: 8 }}>
                                <li><small>Assigned : {Assigned}</small></li>
                                <li><small>Completed : {Completed}</small></li>
                            </ul>
                        </div>

                        <div className='bda_Month' onClick={handleShowMonth}>
                            <h6 style={{ marginLeft: 16, display: 'inline' }}>This Month</h6>&nbsp; &nbsp;
                            {dept.bda ? dept.bda.map((item) => {
                                const monthCompleted = Number(item.achieved)
                                const Month = Number(item.assigned)
                                MonthAssgined += Month
                                MonthAchieved += monthCompleted
                            }) : ""}
                            {MonthAssgined >= MonthAchieved ? <i class="fa-solid fa-arrow-down" style={{ color: '#f56f61' }}></i> : <i class="fa-solid fa-arrow-up" style={{ color: 'green' }}></i>}
                            <ul style={{ paddingTop: 8 }}>
                                <li><small>Assigned : {MonthAssgined}</small></li>
                                <li><small>Completed : {MonthAchieved}</small></li>
                            </ul>
                        </div>

                        <div className='bda_Month' onClick={handleShowUpdate}>
                            <h6 style={{ marginLeft: 25, display: 'inline' }}>Update</h6>&nbsp; &nbsp;<i style={{ color: '#f75720' }} class="fa-solid fa-envelope"></i>
                            {dept.bda ? <p style={{ marginLeft: 8 }}><small>"We need to schedule a meeting with client today!"</small></p> : ""}
                        </div>


                        {/* Modal for today*/}
                        <Modal show={showtoday} onHide={handleClose} dialogClassName="modal-90w" centered>
                            <Modal.Header closeButton>
                                <Modal.Title style={{ color: '#bd6b35', marginLeft: 30 }}>Buisness Development Associate</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ul> {dept.bda ? dept.bda.map((item, i) => (<> <li key={i} style={{ paddingTop: 30 }}><b>Name &nbsp;:</b> &nbsp;{item.name}</li><b>Assigned &nbsp;today &nbsp;:</b> &nbsp;{item.today} &nbsp;&nbsp; <b>Completed </b> &nbsp;: &nbsp;{item.completed}</>)) : ""}</ul>
                            </Modal.Body>
                            <Button className="closeButton" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal>

                        { /* Modal for Month*/}
                        <Modal show={showMonth} onHide={handleCloseMonth} dialogClassName="modal-90w" centered>
                            <Modal.Header closeButton>
                                <Modal.Title style={{ color: '#bd6b35', marginLeft: 30 }}>Buisness Development Associate</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h5 style={{ color: '#bd6b35', marginLeft: 180 }}> {Month}</h5>
                                <ul> {dept.bda ? dept.bda.map((item, i) => (<> <li key={i} style={{ paddingTop: 20 }}><b>Name &nbsp;:</b> &nbsp;{item.name}</li><b>Assigned &nbsp;this month &nbsp;:</b> &nbsp;{item.assigned} &nbsp;&nbsp; <b>Completed </b> &nbsp;: &nbsp;{item.achieved}</>)) : ""}</ul>
                            </Modal.Body>
                            <Button className="closeButton" onClick={handleCloseMonth}>
                                Close
                            </Button>
                        </Modal>


                        { /* Modal for Update*/}
                        <Modal show={showUpdate} onHide={handleCloseUpdate} dialogClassName="modal-90w" centered>
                            <Modal.Header closeButton>
                                <Modal.Title style={{ color: '#bd6b35', marginLeft: 30 }}>Buisness Development Associate</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h6 style={{ marginLeft: 30 }}> Recieved on : <span style={{ color: '#bd6b35' }}>{fullDate}</span></h6>
                                {dept.bda ? <h6 style={{ marginLeft: 28, marginTop: 20 }}>"We need to schedule a meeting with client today!"</h6> : ""}
                                {dept.bda ? <h6 style={{ marginLeft: 300, marginTop: 10 }}><b>&nbsp;- &nbsp;B D Team</b></h6> : ""}
                            </Modal.Body>
                            <Button className="closeButton" onClick={handleCloseUpdate}>
                                Close
                            </Button>
                        </Modal>
                    </div>
                </Carousel.Item>

                {/* Second Slide starts here*/}
                <Carousel.Item>
                    <div className="Dash3">
                        <div className='text_performance'>
                            <h5>Performance</h5>
                            <p style={{ color: '#0f1322' }}>Technical Team</p>
                            <p style={{ color: '#0f1322', fontSize: 15 }}>- &nbsp; MERN</p>
                            <p style={{ color: '#0f1322', fontSize: 15 }}>- &nbsp; MEAN</p>
                        </div>
                        <div className='bda' onClick={handleShow}>
                            <h6 style={{ marginLeft: 30, display: 'inline' }}>This Day</h6>&nbsp; &nbsp;
                            {dept.bda ? dept.bda.map((item) => {
                                const completed = Number(item.completed)
                                const assigned = Number(item.today)
                                Assigned += assigned
                                Completed += completed
                            }) : ""}
                            {Assigned >= Completed ? <i class="fa-solid fa-arrow-down" style={{ color: '#f56f61' }}></i> : <i class="fa-solid fa-arrow-up" style={{ color: 'green' }}></i>}
                            <ul style={{ paddingTop: 8 }}>
                                <li><small>Assigned : {Assigned}</small></li>
                                <li><small>Completed : {Completed}</small></li>
                            </ul>
                        </div>

                        <div className='bda_Month' onClick={handleShowMonth}>
                            <h6 style={{ marginLeft: 16, display: 'inline' }}>This Month</h6>&nbsp; &nbsp;
                            {dept.bda ? dept.bda.map((item) => {
                                const monthCompleted = Number(item.achieved)
                                const Month = Number(item.assigned)
                                MonthAssgined += Month
                                MonthAchieved += monthCompleted
                            }) : ""}
                            {MonthAssgined >= MonthAchieved ? <i class="fa-solid fa-arrow-down" style={{ color: '#f56f61' }}></i> : <i class="fa-solid fa-arrow-up" style={{ color: 'green' }}></i>}
                            <ul style={{ paddingTop: 8 }}>
                                <li><small>Assigned : {MonthAssgined}</small></li>
                                <li><small>Completed : {MonthAchieved}</small></li>
                            </ul>
                        </div>

                        <div className='bda_Month' onClick={handleShowUpdate}>
                            <h6 style={{ marginLeft: 25, display: 'inline' }}>Update</h6>&nbsp; &nbsp;<i style={{ color: '#f75720' }} class="fa-solid fa-envelope"></i>
                            {dept.bda ? <p style={{ marginLeft: 8 }}><small>"We need to schedule a meeting with client today!"</small></p> : ""}
                        </div>

                    </div>
                </Carousel.Item>
            </Carousel>

        </div>
    )
}