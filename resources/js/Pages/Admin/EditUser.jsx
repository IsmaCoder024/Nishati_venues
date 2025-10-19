import UserLayout from "../../Layouts/UserLayout.jsx";

import './EditUser.css';

import { useForm } from "@inertiajs/react";

export default function EditUser({ user }){


    const { data, setData, put, processing } = useForm({

        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        chequeNo: user.chequeNo || '',

    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/usersList/${user.id}`, data, {
            onSucess: () => alert('Updated successfully')
        });
    };

    return(
        <UserLayout>
            <div className="edit-container">
            
                <form onSubmit={ handleSubmit } className="edit-form">

                    <div className="form-group">
                        <label>First name : 
                            <input
                                type="text"
                                value={ data.firstName}
                                onChange={ e => setData('firstName', e.target.value) }
                            />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>Last name : 
                            <input
                                type="text"
                                value={ data.lastName}
                                onChange={ e => setData('lastName', e.target.value) }
                            />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>Email : 
                            <input
                                type="text"
                                value={ data.email}
                                onChange={ e => setData('email', e.target.value) }
                            />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>Cheque number : 
                            <input
                                type="text"
                                value={ data.chequeNo}
                                onChange={ e => setData('chequeNo', e.target.value) }
                            />
                        </label>
                    </div>

                    {/* <div className="form-group">
                        <label>Password : 
                            <input
                                type="text"
                                value={ data.password}
                                onChange={ e => setData('password', e.target.value) }
                            />
                        </label>
                    </div> */}

                    <button type="submit" disabled={processing} className="update-btn">
                        { processing ? "Updating" : "Update user info" }
                    </button>

                </form>

            </div>
        </UserLayout>
        
    )
}