import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../css/style.css';
import '../../css/responsive.css';
import '../../css/helper.css';
import {useParams} from 'react-router-dom';


function Checkout(props) {

    const {id} = useParams();
    //const idUser = JSON.parse(localStorage.getItem('user'))._id;
    const [user, setUser] = useState({});
    const [bill, setBill] = useState([]);
    const [fullname, setFullname] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [total, setTotal] = useState();

    

    let one = `https://hieusuper20hcm.herokuapp.com/api/DetailOrder/${id}`;
    let two = `https://hieusuper20hcm.herokuapp.com/api/admin/order/detail/${id}`;
    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);

    const fetchAPI = async () => {
        await axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            console.log(responseOne);
            console.log(responseTwo);
            setTotal(responseTwo.data.total);
            setBill(responseOne.data);
            setFullname(responseTwo.data.id_note.fullname);
            setAddress(responseTwo.data.address);
            setEmail(responseTwo.data.id_user.email);
            setPhone(responseTwo.data.id_note.phone);
        })).catch((err) => { console.log("Fetch API failed!! " + err);})
    }

    
    useEffect(() => {
        fetchAPI();
    }, []);
    
    


    
    if(!user){
        
    }

    return (
        <div className="checkout-area pt-60 pb-30">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-12">
                        <form action="#">
                            <div className="checkbox-form">
                                <h3>Billing Details</h3>
                                <div className="row">
                                    <div className="col-md-12">
                                    </div>
                                    <div className="col-md-12">
                                        <div className="checkout-form-list">
                                            <label>Full name <span className="required">*</span></label>
                                            <input id="fullname" disabled value={fullname} placeholder type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="checkout-form-list">
                                            <label>Address <span className="required">*</span></label>
                                            <input id="address" disabled value={address} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="checkout-form-list">
                                            <label>Email Address <span className="required">*</span></label>
                                            <input id="email" disabled value={email} placeholder type="email" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="checkout-form-list">
                                            <label>Phone  <span className="required">*</span></label>
                                            <input id="phone" disabled value={phone} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div id="cbox-info" className="checkout-form-list create-account">
                                            <p>Create an account by entering the information below. If you are a returning customer please login at the top of the page.</p>
                                            <label>Account password  <span className="required">*</span></label>
                                            <input placeholder="password" type="password" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-6 col-12">
                        <div className="your-order">
                            <h3>Your order</h3>
                            <div className="your-order-table table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="cart-product-name">Product</th>
                                            <th className="cart-product-name">Quantity</th>
                                            <th className="cart-product-total">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            bill && bill.map((item, index) => (
                                                <tr className="cart_item">
                                                    <td className="cart-product-name">{item.name_product}</td>
                                                    <td className="cart-product-name"><strong className="product-quantity">{item.count}</strong></td>
                                                    <td className="cart-product-total"><span className="amount">{(item.price_product * item.count).toLocaleString()}</span></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr className="order-total">
                                            <td>Feeship</td>
                                            <td colspan="2"><strong><span className="amount">30.000 VND</span></strong></td>
                                        </tr>
                                        <tr className="order-total">
                                            <td>Order Total</td>
                                            <td colspan="2"><strong><span className="amount">{Number(total).toLocaleString()} VND</span></strong></td>
                                        </tr>   
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;