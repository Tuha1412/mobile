import React, { useState } from 'react';
import axios from 'axios';
import RingLoading from '../Loading/Loading';
import {useHistory} from 'react-router-dom';
import Momo from './Momo';
import Notification from '../Notification/Notification';
import { store } from 'react-notifications-component';

function Checkout(props) {

    const history = useHistory();
    const list = JSON.parse(localStorage.getItem('mini_cart'));
    const [loading, setLoading] = useState(false);
    const [payment, setPayment] = useState('false');
    const [message, setMessage] = useState('');
    const [coupon, setCoupon] = useState(1);
    const total = list.reduce((object, item) => {
        let sum = object + item.price_product * item.count;
        return sum;
    }, 0);

    const [totalBill, setTotalBill] = useState(total);

    const user = JSON.parse(localStorage.getItem('userLocal'));


    const onChange = (e) => {

    }



    const onSubmit = async (e) => {

        //setLoading(true);
        const fullname = document.getElementById("fullname").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;
        let note;
        let idOrder;
        const data_delivery = {
            fullname: fullname,
            phone: phone,
        }

        await axios.post(`https://hieusuper20hcm.herokuapp.com/api/Note`, data_delivery)
            .then(res => {
                note = res.data._id;
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })

        const newData = {
            id_user: user._id,
            total: totalBill,
            status: "1",
            pay: payment,
            feeship: '30000',
            id_payment: '6086709cdc52ab1ae999e882',
            id_note: note,
            address: address
        }
        console.log(newData);

        await axios.post(`https://hieusuper20hcm.herokuapp.com/api/Payment/order2`, newData)
            .then(res => {
                idOrder = res.data._id;
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    
        const data_detail_order = {
            id_order: idOrder,
            cartItem: list
        }

        await axios.post(`https://hieusuper20hcm.herokuapp.com/api/DetailOrder`, data_detail_order)
            .then(res => {
                setLoading(false);
                console.log(res);
                if (res.data === 'Thanh Cong'){
                    setMessage('Đặt hàng thành công!');
                    history.push('/ordersuccess');
                }
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }


    const onChangePayment = (e) => {
        setPayment(e.target.value);
    }





    const [couponRes, setCouponRes] = useState({});

    const setting = {
        title: `Chào ${user.fullname} !`,
        message,
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeInRight"],
        animationOut: ["animate__animated", "animate__fadeOutRight"],
        dismiss: {
            duration: 5000,
            onScreen: true
        },
        showIcon: true,
    }

    const onSubmitCoupon = async (e) => {
        e.preventDefault();
        setLoading(true);

        const couponReq = {
            id_user: user._id,
            code: coupon, 
        }

        await axios.post(`https://hieusuper20hcm.herokuapp.com/api/admin/coupon/check`, couponReq)
            .then(res => {
                setLoading(false);
                console.log(res);
                if (res.data.msg === 'Thành công') {
                    setCoupon(res.data.coupon.promotion);
                    setTotalBill(total - total * Number(res.data.coupon.promotion) / 100);
                    return;
                }
                else if (res.data.msg === 'Coupon không áp dụng cho user của bạn'){
                    setMessage('Không đủ điều kiện để sử dụng coupon này.');
                }
                else {
                    setMessage(res.data.msg);           
                }

                store.addNotification(setting);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
         
        }

    return (
        <div className="checkout-area pt-60 pb-30 checkout-position">
            <Notification />
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
                                            <input required onChange={(e) => onChange(e)} id="fullname" placeholder type="text" />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="checkout-form-list">
                                            <label>Address <span className="required">*</span></label>
                                            <input required onChange={(e) => onChange(e)} id="address" type="text" />
                                        </div>
                                    </div>
                                    {/* <div className="col-md-6">
                                        <div className="checkout-form-list">
                                            <label>Email Address <span className="required">*</span></label>
                                            <input onChange={(e) => onChange(e)} id="email" placeholder type="email" />
                                        </div>
                                    </div> */}
                                    <div className="col-md-12">
                                        <div className="checkout-form-list">
                                            <label>Phone  <span className="required">*</span></label>
                                            <input required onChange={(e) => onChange(e)} id="phone" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="checkout-form-list">
                                            <label for="coupon">Coupon code</label>
                                            <div className="coupon">
                                                <input id="coupon" onChange={(e) => setCoupon(e.target.value.toUpperCase())}className="input-text" placeholder="Coupon code" type="text" />
                                                <button className="button-coupon" onClick={(e) => onSubmitCoupon(e)}>Apply</button>
                                            </div>
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
                                            list && list.map((item, index) => (
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
                                            <td colspan="2"><strong><span className="amount">{(totalBill + 30000).toLocaleString()} VND</span></strong></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div className="payment-method">
                                <div className="payment-accordion">
                                    <div id="accordion">
                                        <div className="card">
                                            <div className="card-header" id="#payment-2">
                                                <h5 className="panel-title">
                                                    <a className="collapsed">
                                                        Payment
                                                    </a>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order-button-payment">
                                        <input value="Thanh toan khi nhan hang" onClick={(e) => onSubmit(e)} type="submit" />
                                        <Momo user={user} list={list} payment={payment} total={total} setLoading={setLoading} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                loading ? (
                <div className="show-loading-block">
                    <div className="center checkout-center">
                        <RingLoading />
                    </div>
                </div>
                ) : (
                <div className="show-loading-none">
                    <div className="center checkout-center">
                        <RingLoading />
                    </div>
                </div>
                )
            }
            
        </div>
    );
}

export default Checkout;