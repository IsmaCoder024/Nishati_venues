import React from "react";
import "./RegistrationForm.css";
import UserLayout from "../../Layouts/UserLayout.jsx";

import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react"; 
// import route from 'ziggy-js'

export default function RegistrationForm() {
    const { flash } = usePage().props;

    const { data, setData, post, processing, reset } = useForm({
        firstName: "",
        lastName: "",
        email: "",
        chequeNo: "",
        password: "",
        password_confirmation: "",
    });

    //holds any message we want to display
    const { message, setMessage } = useState({});

    const submit = (e) => {
        e.preventDefault();

        post("/register", {
            onFinish: () => {
                reset("password", "password_confirmation");
                // window.location.reload();
            },
        });
    };

    return (
        <UserLayout items={[{ label: "Home", href: "home" }]}>
            <div>
                {flash.registerError && (
                    <div className="flash-error">
                        {flash.registerError}
                    </div>
                )}
            </div>

            <div className="form-container">
                <form className="registration-form" onSubmit={submit}>
                    <h2 className="form-title">Register</h2>
                    <p className="alt-option">
                        <small>Already have an account?</small>
                        <a href={(route = "login")}> Login</a>
                    </p>

                    <div className="form-group">
                        <label>Name</label>
                        <div className="name-fields">
                            <input
                                type="text"
                                name="firstName"
                                value={data.firstName}
                                onChange={(e) =>
                                    setData("firstName", e.target.value)
                                }
                                placeholder="First Name"
                            />

                            <input
                                type="text"
                                name="lastName"
                                value={data.lastName}
                                onChange={(e) =>
                                    setData("lastName", e.target.value)
                                }
                                placeholder="Last Name"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Cheque Number</label>
                            <input
                                type="text"
                                name="chequeNo"
                                value={data.chequeNo}
                                onChange={(e) =>
                                    setData("chequeNo", e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <small>*Must be atleast 8 characters</small>
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </form>
            </div>
        </UserLayout>
    );
}
