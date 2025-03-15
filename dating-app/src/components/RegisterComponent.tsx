import React, { useState } from 'react';
import { registerAPICall } from '../services/AuthService';

const RegisterComponent = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userregisteredstatus, setuserregisteredstatus] = useState('');

    const handleRegistrationForm = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const register = {name, username, email, password}
        console.log(register);
        registerAPICall(register).then((response) => {
            console.log(response.data)
        }).catch(error => {
            console.error(error);
            setuserregisteredstatus(error);
        })
        setuserregisteredstatus("User Registered Successfully");
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div>
                    <div className="card shadow-lg">
                        <div className="card-header text-center">
                            <h2>User Registration Form</h2>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3 row">
                                    <label className="col-md-3 col-form-label text-md-end">Name</label>
                                    <div className="col-md-9">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3 row align-items-center">
                                    <label className="col-md-3 col-form-label text-md-end">Username</label>
                                        <div className="col-md-9">
                                             <input type="text" className="form-control" placeholder="Enter username"
                                             value = {username}
                                             onChange={(e) => setUsername(e.target.value)} />
                                        </div>
                                </div>

                                <div className="mb-3 row">
                                    <label className="col-md-3 col-form-label text-md-end">Email</label>
                                    <div className="col-md-9">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label className="col-md-3 col-form-label text-md-end">Password</label>
                                    <div className="col-md-9">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary" onClick={(e) => handleRegistrationForm(e)}>Submit</button>
                                    <div className="text-success">{userregisteredstatus}</div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterComponent;
