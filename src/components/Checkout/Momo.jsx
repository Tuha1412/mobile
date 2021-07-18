import React, { useState, useEffect } from 'react';
import axios from 'axios';
import crypto from 'crypto';
import { useHistory } from 'react-router-dom';
const Momo = props => {

    const {user, list, total, payment, setLoading} = props;
    const [error, setError] = useState(false);
    const history = useHistory();

    // useEffect(() => {

    // }, []);

    const onClickMomo = async (e) => {

        const fullname = document.getElementById("fullname").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;
        let note;
        let idOrder;

        setLoading(true);

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
            total: total,
            status: "1",
            pay: true,
            feeship: '30000',
            id_payment: '60afcfcedc48d73138aceaf6',
            id_note: note,
            address: address
        }

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
                console.log(res);
                if (res.data === 'Thanh Cong') {
                   
                }
            })
            .catch(err => {
                console.log(err);
            })

        const path = 'https://test-payment.momo.vn/gw_payment/transactionProcessor';
        const partnerCode = 'MOMO10TY20210607';
        const accessKey = '9gWpOwRExiJUZ8FG';
        const requestId =  idOrder;
        const secretKey = '4K9yvUyBRpY55OtUv7SaTWSL9WHNdErC';
        const orderInfo = 'Thanh toan MoMo';
        const amount = total.toString();
        const notifyUrl = 'http://hieusuper20hcm.herokuapp.com/api/comment/payment/momo';
        const returnUrl = 'http://localhost:3000/ordersuccess';
        const orderId = idOrder;
        const requestType = 'captureMoMoWallet';
        const extraData = 'merchantName=Payment';
        const rawSignature = `partnerCode=${partnerCode}&accessKey=${accessKey}&requestId=${requestId}&amount=${amount}&orderId=${orderId}&orderInfo=${orderInfo}&returnUrl=${returnUrl}&notifyUrl=${notifyUrl}&extraData=${extraData}`;
        //
        var signature = crypto.createHmac('sha256', secretKey)
            .update(rawSignature)
            .digest('hex');

        var body = JSON.stringify({
            partnerCode,
            accessKey,
            amount,
            requestId,
            orderId,
            orderInfo,
            returnUrl,
            notifyUrl,
            extraData,
            requestType,
            signature,
        })

        console.log(body);
        await axios.post(path, body)
            .then(response => {
                console.log(response);
                if (response.data.errorCode !== 0) {
                    setError(true);
                    setLoading(false);
                    setTimeout(() => {
                        setTimeout(() => setError(false), 2000);
                    })
                } else {
                    window.location.href = response.data.payUrl;
                }
            })
            .catch(err => {
                console.log('There was an error!!', err);
            })

    }

    return (
        <input className="momo-btn" value="Thanh toan qua Momo" onClick={() => onClickMomo()} type="submit" />
    );
};


export default Momo;