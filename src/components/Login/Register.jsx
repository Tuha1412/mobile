import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import RingLoading from '../Loading/Loading';
import isEmpty from 'validator/lib/isEmpty';

export const Register = (props) => {


    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const url = "https://hieusuper20hcm.herokuapp.com/api/admin/user/create";
    const [data, setData] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
        permission: '6087dcb5f269113b3460fce4'
    });


    const handle = (e) => {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

    const submit = (e) => {
        e.preventDefault();

        setLoading(true);

        axios.post(url, null, {
            params: {
                name: data.fullname,
                username: data.username,
                email: data.email,
                password: data.password,
                permission: data.permission,
            }
        })
        .then(res => {
            if (res.data.msg === 'Bạn đã thêm thành công') {

                window.location = 'http://localhost:3000/login';
                setLoading(false);
            }

        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })
    }

    const loadForm = loading ? (
        <div className="center">
            <RingLoading />
        </div>
    ) : (
        <form onSubmit={(e) => submit(e)} action="#">
            <div className="login-form">
                <h4 className="login-title">Register</h4>
                <div className="row">
                    <div className="col-md-6 col-12 mb-20">
                        <label for="name">Full Name</label>
                        <input onChange={(e) => handle(e)} value={data.name} id="fullname" className="mb-0" type="text" placeholder="Full Name" />
                    </div>
                    <div className="col-md-6 col-12 mb-20">
                        <label for="username">User Name</label>
                        <input onChange={(e) => handle(e)} required value={data.username} id="username" className="mb-0" type="text" placeholder="Last Name" />
                    </div>
                    <div className="col-md-12 mb-20">
                        <label for="email">Email Address*</label>
                        <input onChange={(e) => handle(e)} required value={data.email} id="email" className="mb-0" type="email" placeholder="Email Address" />
                    </div>
                    <div className="col-12 mb-20">
                        <label for="password">Password</label>
                        <input onChange={(e) => handle(e)} required value={data.password} id="password" className="mb-0" type="password" placeholder="Password" />
                    </div>
                    <div className="col-md-12 mb-20">
                        <label for="confirmpassword">Confirm Password</label>
                        <input id="confirmpassword" required className="mb-0" type="password" placeholder="Confirm Password" />
                    </div>
                    <div className="col-md-6 col-12 mb-20">
                        <button type="submit" className="register-button mt-0">Register</button>
                    </div>
                    <div className="col-md-6 col-12 mb-20 text-left text-md-right">
                        <a href="/login">Have a account?</a>
                    </div>
                </div>
            </div>
        </form>
    )




    return (
        <div className="page-section mb-60">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12 mb-30">
                        {/* Login Form s*/}
                        {loadForm}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;