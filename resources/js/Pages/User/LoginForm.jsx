import React from "react";
import "./RegistrationForm.css";
import UserLayout from "../../Layouts/UserLayout.jsx";
import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";

export default function RegistrationForm() {
    const { flash } = usePage().props;

    const { data, setData, post, processing } = useForm({
        email: "",
        password: "",
    });

    //holds any message we want to display
    const { message, setMessage } = useState({});

    const submit = (e) => {
        e.preventDefault();

        post("/login", {
            onFinish: () => reset("password"),
        });
    };

    return (
        <UserLayout items={[{ label: "Home", href: "home" }]}>
            <div>
                {flash.registerSuccess && (
                    <div className="flash-success">{flash.registerSuccess}</div>
                )}
            </div>

            <div>
                {flash.logError && (
                    <div className="flash-error">{flash.logError}</div>
                )}
            </div>

            <div>
                {flash.notAdminError && (
                    <div className="flash-error">{flash.notAdminError}</div>
                )}
            </div>

            <div className="form-container">
                <form className="registration-form" onSubmit={submit}>
                    <h2 className="form-title">Log-in</h2>
                    <p className="alt-option">
                        <small>Don't have an account?</small>
                        <a href={(route = "register")}> Register</a>
                    </p>

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
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
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
