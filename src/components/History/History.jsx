import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../css/style.css';
import '../../css/responsive.css';
import '../../css/helper.css';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import Notification from '../Notification/Notification';
import { store } from 'react-notifications-component';
import {handleCreateDate} from './HandleCreateDate.js';
function History(props) {

    const id = JSON.parse(localStorage.getItem('userLocal'))._id;
    const [history, setHistory] = useState([]);
    const [delivery, setDelivery] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [cancel, setCancel] = useState([]);
    const fetchHistoryAPI = async () => {
        const response = await axios.get(`https://hieusuper20hcm.herokuapp.com/api/admin/order?change=true&limit=4&page=1&search=${id}&status=1`)
            .catch((err) => { console.log("Fetch API failed!! " + err); });
            console.log(response);
            setHistory(response.data.orders);
    }

    const fetchDeliveryHistoryAPI = async () => {
        const response = await axios.get(`https://hieusuper20hcm.herokuapp.com/api/admin/order?change=true&limit=4&page=1&search=${id}&status=2`)
            .catch((err) => { console.log("Fetch API failed!! " + err); })
            setDelivery(response.data.orders);
    }
    
    const fetchCompletedHistoryAPI = async () => {
        const response = await axios.get(`https://hieusuper20hcm.herokuapp.com/api/admin/order?limit=4&page=1&search=${id}&status=4`)
            .catch((err) => { console.log("Fetch API failed!! " + err); })
            setCompleted(response.data.orders);
    }
    
    const fetchCancelHistoryAPI = async () => {
        const response = await axios.get(`https://hieusuper20hcm.herokuapp.com/api/admin/order?limit=10&page=1&search=${id}&status=5`)
            .catch((err) => { console.log("Fetch API failed!! " + err); })
            setCancel(response.data.orders);
    }
 

    useEffect(() => {
        fetchHistoryAPI();
        fetchDeliveryHistoryAPI();
        fetchCompletedHistoryAPI();
        fetchCancelHistoryAPI();
    }, [id]);


    const message = {
        cancelOrder: ' Vui lòng tải lại trang hoặc nhấn F5 để cập nhật lại danh sách đơn hàng!',
    }

    const handleCancel = async (e, id) => {
        e.preventDefault();
        const query = '?' + queryString.stringify({ id: id })
        const response = await axios.patch(`https://hieusuper20hcm.herokuapp.com/api/admin/order/cancelorder${query}`)
        .catch((err) => { console.log("Fetch API failed!! " + err); })
        console.log(query);
        const cancelOrder = {
            title: `Bạn đã hủy một đơn hàng !`,
            message: message.cancelOrder,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeInRight"],
            animationOut: ["animate__animated", "animate__fadeOutRight"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        }

        store.addNotification(cancelOrder);
    }



    // const handleCreateDate = (createDate) => {
    //     const string = createDate.toString();
    //     const s = string.slice(0, 16);
    //     return s.replace('T', ' ');
    // }




    const showListConfirmOrder = history && history.length > 0 ? (
        <form className="mt-4">
            <div className="table-content table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="li-product-thumbnail">Date</th>
                            <th className="li-product-thumbnail">Full name</th>
                            <th className="li-product-price">Address</th>
                            <th className="li-product-price">Payment</th>
                            <th className="li-product-add-cart">Detail</th>
                            <th className="li-product-add-cart">Cancel order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            history && history.map((item, index) => (
                                <tr>
                                    <td className="li-product-thumbnail">{handleCreateDate(item.createDate)}</td>
                                    <td className="li-product-thumbnail">{(item.id_note.fullname)}</td>
                                    <td className="li-product-price"><span className="amount">{item.address}</span></td>
                                    <td className="li-product-price"><span className="amount">{item.id_payment.pay_name}</span></td>
                                    <td className="li-product-stock-status"><Link to={`/detailbill/${item._id}`}>Detail</Link></td>
                                    <td className="li-product-add-cart"><a href="/history" onClick={(e) => handleCancel(e, item._id)}>Cancel order</a></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </form>
    ) : (
        <div className="empty-cart">Chua co giao dich</div>
    )


    const showListDeliveryOrder = delivery && delivery.length > 0 ? (
        <form className="mt-4">
            <div className="table-content table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="li-product-thumbnail">Date</th>
                            <th className="li-product-thumbnail">Full name</th>
                            <th className="li-product-price">Address</th>
                            <th className="li-product-price">Payment</th>
                            <th className="li-product-add-cart">Detail</th>
                            <th className="li-product-add-cart">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            delivery && delivery.map((item, index) => (
                                <tr>
                                    <td className="li-product-thumbnail">{handleCreateDate(item.createDate)}</td>
                                    <td className="li-product-thumbnail">{(item.id_note.fullname)}</td>
                                    <td className="li-product-price"><span className="amount">{item.address}</span></td>
                                    <td className="li-product-price"><span className="amount">{item.id_payment.pay_name}</span></td>
                                    <td className="li-product-stock-status"><Link to={`/detailbill/${item._id}`}>Detail</Link></td>
                                    <td className="li-product-add-cart"><b>{item.total.toLocaleString()} VND</b></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </form>
    ) : (
        <div className="empty-cart">Chua co giao dich</div>
    )

    const showListCompletedOrder = completed && completed.length > 0 ? (
        <form className="mt-4">
            <div className="table-content table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="li-product-thumbnail">Date</th>
                            <th className="li-product-thumbnail">Full name</th>
                            <th className="li-product-price">Address</th>
                            <th className="li-product-price">Payment</th>
                            <th className="li-product-add-cart">Detail</th>
                            <th className="li-product-add-cart">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            completed && completed.map((item, index) => (
                                <tr>
                                    <td className="li-product-thumbnail">{handleCreateDate(item.createDate)}</td>
                                    <td className="li-product-thumbnail">{(item.id_note.fullname)}</td>
                                    <td className="li-product-price"><span className="amount">{item.address}</span></td>
                                    <td className="li-product-price"><span className="amount">{item.id_payment.pay_name}</span></td>
                                    <td className="li-product-stock-status"><Link to={`/detailbill/${item._id}`}>Detail</Link></td>
                                    <td className="li-product-add-cart"><b>{item.total.toLocaleString()} VND</b></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </form>
    ) : (
        <div className="empty-cart">Chua co giao dich</div>
    )

    const showListCancelOrder = cancel && cancel.length > 0 ? (
        <form className="mt-4">
            <div className="table-content table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="li-product-thumbnail">Date</th>
                            <th className="li-product-thumbnail">Full name</th>
                            <th className="li-product-price">Address</th>
                            <th className="li-product-price">Payment</th>
                            <th className="li-product-add-cart">Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cancel && cancel.map((item, index) => (
                                <tr>
                                    <td className="li-product-thumbnail">{handleCreateDate(item.createDate)}</td>
                                    <td className="li-product-thumbnail">{(item.id_note.fullname)}</td>
                                    <td className="li-product-price"><span className="amount">{item.address}</span></td>
                                    <td className="li-product-price"><span className="amount">{item.id_payment.pay_name}</span></td>
                                    <td className="li-product-stock-status"><Link to={`/detailbill/${item._id}`}>Detail</Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </form>
    ) : (
        <div className="empty-cart">Chua co giao dich</div>
    )

    return (
        <div>
            <Notification />
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li className="active">History</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Li's Breadcrumb Area End Here */}
            {/*Wishlist Area Strat*/}
            <div className="wishlist-area pt-30 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="li-product-tab">
                                <ul className="nav li-product-menu">
                                    <li><a className="active" data-toggle="tab" href="#pending"><span>Pending order</span></a></li>
                                    <li><a data-toggle="tab" href="#delivery"><span>Delivery</span></a></li>
                                    <li><a data-toggle="tab" href="#completed"><span>Completed order</span></a></li>
                                    <li><a data-toggle="tab" href="#cancel"><span>Cancel order</span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="tab-content mt-20">
                        <div id="pending" className="tab-pane active show" role="tabpanel">
                            {
                                showListConfirmOrder
                            }
                        </div>
                        <div id="delivery" className="tab-pane" role="tabpanel">
                            {
                                showListDeliveryOrder
                            }
                        </div>
                        <div id="completed" className="tab-pane" role="tabpanel">
                            {
                                showListCompletedOrder
                            }
                        </div>
                        <div id="cancel" className="tab-pane" role="tabpanel">
                            {
                                showListCancelOrder
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default History;