import './mainPage.css'
import Dashboard from './dashboard';
import Sidebar from '../../Sidebar/sidebar';

export default function Main() {
    // const [status,setStatus] = useState(0)
    // const dashboardStyle =true;
    return (
        <div className="firstDiv">
            <div className="main">
                <div className="sidebar">
                <Sidebar/>
                </div>
                <div className="dashboard"> 
                <Dashboard/>
                </div>
            </div>
        </div>
    )
}