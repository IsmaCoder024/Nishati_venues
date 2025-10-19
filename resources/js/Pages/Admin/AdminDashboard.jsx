import './AdminDashboard.css';
import UserLayout from "../../Layouts/UserLayout.jsx";

import actionImage from "../../images/action.png";
import userImage from "../../images/user management.png";
import reserveImage from "../../images/reserve.jpg";
import activityImage from "../../images/activity.png";

import { usePage } from "@inertiajs/react";


export default function AdminDashboard(){

    const { flash } = usePage().props;

    return(
        <UserLayout>

            <div>
                {flash.logSuccess && (
                    <div className="flash-success">
                        {flash.logSuccess}
                    </div>
                )}
            </div>

        <div className='dashboardContainer'>
            <div className='dashboardCard'>
                <h3>Actions</h3>
                <div className='cardItems'>
                    <img src={actionImage} className='dashboardImage' alt='Actions'/>
                    <nav>
                        <a href= { route ='new'}><li>Add new venue</li></a>
                        <a href= { route ='delete'}><li>Delete venue</li></a>
                        <a href= { route ='add'}><li>Update venue</li></a>
                    </nav>
                </div>
            </div>

            <div className='dashboardCard'>
                <h3>User Management</h3>

                <div className='cardItems'>
                    <img src={userImage} className='dashboardImage' alt='User Management'/>

                    <nav>
                        <a href= { route ='usersList'}><li>Users list</li></a>
                        <a href= { route =''}><li>Add new</li></a>
                        <a href= { route =''}><li></li></a>
                    </nav>
                </div>
            </div>

            <div className='dashboardCard'>
                <h3>Reservations</h3>

                <div className='cardItems'>
                    <img src={reserveImage} className='dashboardImage' alt='Reservations'/>
                    <nav>
                        <a href= { route ='reservations'}><li>Active reservations</li></a>
                        <a href= { route =''}><li>Past reservations</li></a>
                        <a href= { route =''}><li></li></a>
                    </nav>
                </div>
            </div>

            <div className='dashboardCard'> 
                <h3>Activity</h3>

                <div className='cardItems'>
                    <img src={activityImage} className='dashboardImage' alt='Activity'/>
                    <nav>
                        <a href= { route =''}><li></li></a>
                        <a href= { route =''}><li></li></a>
                        <a href= { route =''}><li></li></a>
                    </nav>
                </div>
            </div>
        
        </div>
        </UserLayout>
    )
}