import Sidebar from "../../Sidebar/sidebar";
import '../mainPage/mainPage.css';
import UserDashboard from "./userDashboard";

export default function User() {
    return (
        <div className="firstDiv">
            <div className="main">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="dashboard">
                    <UserDashboard />
                </div>

            </div>
        </div>
    )
}