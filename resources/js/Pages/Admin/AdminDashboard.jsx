import './AdminDashboard.css';
import UserLayout from "../../Layouts/UserLayout.jsx";

export default function AdminDashboard(){
    return(
        <>
        <div>
            <button>Action</button>
            <nav>
                <a href= { route ='new'}><li>Add new venue</li></a>
                <a href= { route ='delete'}><li>Delete venue</li></a>
                <a href= { route ='add'}><li>Update venue</li></a>
            </nav>
        </div>

        <div>
            <button>User management</button>
            <nav>
                <a href= { route =''}><li></li></a>
                <a href= { route =''}><li></li></a>
                <a href= { route =''}><li></li></a>
            </nav>
        </div>

        <div>
            <button>Reservations</button>
            <nav>
                <a href= { route =''}><li></li></a>
                <a href= { route =''}><li></li></a>
                <a href= { route =''}><li></li></a>
            </nav>
        </div>

        <div>
            <button>Activity</button>
            <nav>
                <a href= { route =''}><li></li></a>
                <a href= { route =''}><li></li></a>
                <a href= { route =''}><li></li></a>
            </nav>
        </div>
        
        </>
    )
}