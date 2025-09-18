import { router } from '@inertiajs/react';
import './UsersList.css';
import { useState } from 'react';

export default function UsersList({ users }){

    const [showSection, setShowSection] = useState(null);

    const handleClick = (userId) => {
        setShowSection ( prev => prev === userId ? null : venueId)
        
    };

    const handleDelete = (id) => {
        if(connfirm('Are you sure you want to delete this user?')){
            router.delete(`/usersList/${id}`);
        }
    };

    const handleEdit = (id) => {
        router.get(`/usersList/${id}/edit`);
    };

    return(

        <>
            <section className="venue-container">

                        <table>
                            <tr>
                                <th>id</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Cheque number</th>
                                <th>Number of bookings</th>
                                <th>Actions</th>
                            </tr>
                            
                            {users.map((user) => (

                            <tr key={user.id} className="">
                                <td><span className='record-0'>{user.id}</span></td>
                                <td><span className='record-1'>{user.firstName}</span></td>
                                <td><span className='record-1'>{user.lastName}</span></td>
                                <td><span className='record-2'>{user.chequeNo}</span></td>
                                <td></td>
                                <td>
                                    <span className='record-3'>
                                        <button onClick={ () => handleClick = (user.id) }>Action</button>
                                    </span>

                                        {showSection === user.id && (

                                            <nav className='actions'>
                                                <li onClick={ () => handleEdit(user.id) }>Edit info</li>
                                                <li onClick={ () => handleDelete(user.id) }>Delete user</li>
                                            </nav>

                                        )}

                                </td>
                            </tr>

                             ))}

                        </table>

            </section>
        </>

    )
}