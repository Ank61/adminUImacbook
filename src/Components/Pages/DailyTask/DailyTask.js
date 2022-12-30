import '../mainPage/mainPage.css'
import Sidebar from '../../Sidebar/sidebar';
import DailyTaskDashboard from './DailyTaskDahboard';

export default function DailyTask() {
    // const [status,setStatus] = useState(0)
    return (
        <div className="firstDiv">
            <div className="main">
                <div className="sidebar">
                <Sidebar/>
                </div>
                <div className="dashboard"> 
                <DailyTaskDashboard/>
                </div>
            </div>
        </div>
    )
}