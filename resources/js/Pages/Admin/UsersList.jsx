import UserLayout from "../../Layouts/UserLayout.jsx";
import "./UsersList.css";

import { router } from "@inertiajs/react";
import { useState } from "react";
import { usePage } from "@inertiajs/react";

export default function UsersList({ users }) {
    const { flash } = usePage().props;

    const [processing, setProcessing] = useState();

    const [showSection, setShowSection] = useState();

    const handleAction = (userId) => {
        setShowSection((prev) => (prev === userId ? null : userId));
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            setProcessing(true);
            router.delete(`/usersList/${id}`);
        }
    };

    const handleEdit = (id) => {
        router.get(`/usersList/${id}/edit`);
        setProcessing(true);
    };

    return (
        <UserLayout items={[{ label: "Home", href: "home" }]}>
            <div className="flash-success">
                {processing ? "Retrieving.." : ""}
            </div>

            <div>
                {flash.updateUserSuccess && (
                    <div className="flash-success">
                        {flash.updateUserSuccess}
                    </div>
                )}
            </div>

            <section className="venue-container">
                <table>
                    <tr>
                        <th>id</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Cheque number</th>
                        <th>Number of bookings made</th>
                        <th>Actions</th>
                    </tr>

                    {users.map((user) => (
                        <tr key={user.id} className="">
                            <td>
                                <span className="record-0">{user.id}</span>
                            </td>

                            <td>
                                <span className="record-1">
                                    {user.firstName}
                                </span>
                            </td>

                            <td>
                                <span className="record-1">
                                    {user.lastName}
                                </span>
                            </td>

                            <td>
                                <span className="record-2">
                                    {user.chequeNo}
                                </span>
                            </td>

                            <td>
                                <span className="record-1">
                                    {user.bookings_count}
                                </span>
                            </td>

                            <td>
                                <div className="actions-group">
                                    <span className="record-3">
                                        <button
                                            onClick={() =>
                                                handleAction(user.id)
                                            }
                                        >
                                            Action
                                        </button>
                                    </span>

                                    {showSection === user.id && (
                                        <nav className="actions">
                                            <li>
                                                <button
                                                    onClick={() =>
                                                        handleEdit(user.id)
                                                    }
                                                >
                                                    Edit record
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(user.id)
                                                    }
                                                >
                                                    Delete user
                                                </button>
                                            </li>
                                        </nav>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </table>
            </section>
        </UserLayout>
    );
}
