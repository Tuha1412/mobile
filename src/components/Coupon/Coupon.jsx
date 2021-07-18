import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {handleCreateDate} from '../History/HandleCreateDate';
function Coupon(props) {

    const [coupons, setCoupon] = useState([]);

    const fetchCouponAPI = async () => {
        const response = await axios.get(`https://hieusuper20hcm.herokuapp.com/api/admin/coupon`)
            .catch((err) => { console.log("Fetch API failed!! " + err); });
            console.log(response.data.coupons);
            setCoupon(response.data.coupons);
    }

    useEffect(() => {
        fetchCouponAPI();
    }, [])




    const showList = coupons && coupons.length > 0 ? (
        <form action="#">
            <div className="table-content table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="li-product-thumbnail">CODE</th>
                            <th className="cart-product-name">Chú thích</th>
                            <th className="li-product-price">Ngày hết hạn</th>
                            <th className="li-product-stock-status">Số lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            coupons && coupons.map((item, index) => (
                                <tr>
                                    <td className="li-product-name">{item.code}</td>
                                    <td className="li-product-thumbnail">{item.describe}</td>
                                    <td className="li-product-price">{handleCreateDate(item.endDate)}</td>
                                    <td className="li-product-stock-status"><span className="amount">{item.number}</span></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </form>
    ) : (
        <div className="empty-cart">Chua co ma giam gia nao</div>
    )

    return (
        <div>
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li className="active">Coupon</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Li's Breadcrumb Area End Here */}
            {/*Wishlist Area Strat*/}
            <div className="wishlist-area pt-60 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {
                                showList
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Coupon;