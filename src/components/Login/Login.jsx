import React, { useState } from 'react';
import axios from 'axios';
import RingLoading from '../Loading/Loading';
import { useHistory } from 'react-router-dom';
import isEmpty from 'validator/lib/isEmpty';
const Login = (props) => {
    
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationMsg, setValidationMsg] = useState('');


    const onChangeEmail = (e) => {
        // const newData = { ...user };
        // newData[e.target.id] = e.target.value;
        // setUser(newData);
        const value = e.target.value;
        setEmail(value);
    }

    const onChangePassword = (e) => {
        const value = e.target.value;
        setPassword(value);

    }

    const validateAll = () => {
        const msg = {};
        if (isEmpty(email)) {
            msg.email = "*Please enter your email address";
        }

        if (isEmpty(password)) {
            msg.password = "*Please enter your password";
        }

        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    }

    const submit = (e) => {

        e.preventDefault();


        const isValid = validateAll();
        if (!isValid) return;


        setLoading(true);

        axios.post("http://hieusuper20hcm.herokuapp.com/api/admin/user/login", {
            email: email,
            password: password,
        })
            .then(res => {
                console.log(res.data);
                setLoading(false);

                if (res.data.msg === 'Không Tìm Thấy User') {
                    const msg = {};
                    msg.email = "*Username does not exits";
                    setValidationMsg(msg);
                }

                if (res.data.msg === 'Sai mật khẩu') {
                    const msg = {};
                    msg.password = "*Password was wrong";
                    setValidationMsg(msg);
                }

                if (res.data.msg === 'Đăng nhập thành công') {
                    localStorage.setItem('isLogin', true);
                    localStorage.setItem('userLocal', JSON.stringify(res.data.user));
                    window.location = 'http://localhost:3000/home';
                }
            })
            .catch(err => {
                console.log(err);
            })

    }


    const loadForm = loading ? (
        <div className="center">
            <RingLoading />
        </div>
    ) : (
        <form onSubmit={(e) => submit(e)}>
            <div className="login-form">
                <h4 className="login-title">Login</h4>
                <div className="row">
                    <div className="col-md-12 col-12 mb-20">
                        <label for="email">User name</label>
                        <input onChange={(e) => onChangeEmail(e)} id="email" className="mb-0" type="email" placeholder="User name" />
                        <p className="text-red-500 text-xs mt-3 ml-2">{validationMsg.email}</p>
                    </div>
                    <div className="col-12 mb-20">
                        <label for="password">Password</label>
                        <input onChange={(e) => onChangePassword(e)} id="password" className="mb-0" type="password" placeholder="Password" />
                        <p className="text-red-500 text-xs mt-3 ml-2">{validationMsg.password}</p>
                    </div>
                    <div className="col-md-8">
                        <div className="check-box d-inline-block ml-0 ml-md-2 mt-10">
                            <a href="/register">Don't have an account?</a>
                        </div>
                    </div>
                    <div className="col-md-4 mt-10 mb-20 text-left text-md-right">
                        <a href="#">Forgotten password?</a>
                    </div>
                    <div className="col-md-12">
                        <button type="submit" className="register-button mt-0">Login</button>
                    </div>
                </div>
            </div>
        </form>
    )



    return (
        <div className="page-section mb-10 mt-10">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12 mb-30">
                        {loadForm}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;