import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setProduct } from '../../reducers/productsReducer';
import { setComments } from '../../reducers/commentsReducer';
import { addCartMini } from '../../reducers/cartMiniReducer';
import Notification from '../Notification/Notification';
import { store } from 'react-notifications-component';
import { useHistory } from 'react-router-dom';

const Detail = (props) => {


    const history = useHistory();
    //lấy API của sản phẩm
    const { id } = useParams();
    const dispatch = useDispatch();
    const fetchProductDetails = async () => {
        const response = await axios.get(`http://hieusuper20hcm.herokuapp.com/api/product/${id}`)
            .catch((err) => { console.log("Fetch API failed!! " + err); });
        dispatch(setProduct(response.data));
    }
    
    useEffect(() => {
        fetchProductDetails();
    }, []);


    //lấy API comment của sản phẩm này
    const [count, setCount] = useState(0);
    const [comments, setCommentss] = useState([]);
    const [comment, setComment] = useState('');
    const [star, setStar] = useState(null);
    const fetchComment = async () => {
        const response = await axios.get(`http://hieusuper20hcm.herokuapp.com/api/comment/${id}`)
            .catch((err) => { console.log("Fetch API failed!! " + err); });
        dispatch(setComments(response.data.comment));
        setCommentss(response.data.comment);

    }

    useEffect(() => {
        fetchComment();
    }, [count]);

    let user = {
        fullname: ''
    };

    if (JSON.parse(localStorage.getItem('userLocal'))) {
        user = JSON.parse(localStorage.getItem('userLocal'));
    }
    //console.log(comments);
    // useEffect(() => {
    //     fetchComment();  
    // }, [id]);
    const handleCreateDate = (createDate) => {
        const string = createDate.toString();
        const s = string.slice(0, 16);
        return s.replace('T', ' ');
    }

    const checkComment = comments && comments.map(item => (
        <div className="product-reviews">
            <div className="product-details-comment-block">
                <div className="comment-author-infos pt-25">
                    <span>{item.id_user !== undefined ? (item.id_user.fullname) : ('undefined')}</span>
                    <em>{handleCreateDate(item.createDate)}</em>
                </div>
                <div className="comment-details">
                    <p className="title-block">{item.content}</p>
                </div>
                {/* Quick View | Modal Area End Here */}
            </div>
        </div>
    ))

    const checkComments = comments.length <= 0 ? (
        <p className="empty-cart no-comment">
            No comment
        </p>
    ) : (checkComment);





    const product = useSelector((state) => state.Products.product);
    const [quantity, setQuantity] = useState(1);


    const changeQuantity = (e) => {
        setQuantity(e.target.value);
    }

    const data = {
        idProduct: product._id,
        name_product: product.name_product,
        price_product: product.price_product,
        image: product.image,
        count: quantity,
    };


    const message = {
        addToCart: 'Bạn đã thêm sản phẩm vào giỏ hàng!',
    }



    const onClick = (message) => {
        dispatch(addCartMini(data));

        const addToCart = {
            title: `Chào ${user.fullname} !`,
            message: message,
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

        store.addNotification(addToCart);

    }
    const onSubmit = (e) => {
        e.preventDefault();
    }
  
    const onSubmitComment = (e) => {
        e.preventDefault();
        let newData = {};
        newData = {
            id_user: user._id,
            id_product: id,
            content: comment,
            start: star, 
        }

        console.log(newData);
        
        axios.post(`http://hieusuper20hcm.herokuapp.com/api/comment/${id}`, newData)
            .then(res => {
                console.log(res);
                if (res.data === 'Thanh Cong'){
                    setCount(count + 1);
                }
            })
            .catch(err => {
                console.log(err);
            });

        setComment('');

        
    }


    const isLogin = JSON.parse(localStorage.getItem('isLogin'));

    const checkWriteComment = isLogin ? (
        <a className="review-links" href="#" data-toggle="modal" data-target="#mymodal">Write Your Review!</a>
    ) : (
        <a className="review-links" href="/login">Write Your Review!</a>
    )




    return (
        <div>
            <Notification />
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li className="active">Single Product</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Li's Breadcrumb Area End Here */}
            {/* content-wraper start */}
            <div className="content-wraper">
                <div className="container">
                    <div className="row single-product-area">
                        <div className="col-lg-5 col-md-6">
                            {/* Product Details Left */}
                            <div className="product-details-left">
                                <div className="product-details-images slider-navigation-1">
                                    <div className="lg-image">
                                        <a className="popup-img venobox vbox-item" href="images/product/large-size/1.jpg" data-gall="myGallery">
                                            <img src={`http://hieusuper20hcm.herokuapp.com/${product.image}`} alt={product.image} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/*// Product Details Left */}
                        </div>
                        <div className="col-lg-7 col-md-6">
                            <div className="product-details-view-content pt-60">
                                <div className="product-info">
                                    <h2>{product.name_product}</h2>
                                    {/* <span className="product-details-ref">Reference: demo_15</span>
                                    <div className="rating-box pt-20">
                                        <ul className="rating rating-with-review-item">
                                            <li><i className="fa fa-star-o" /></li>
                                            <li><i className="fa fa-star-o" /></li>
                                            <li><i className="fa fa-star-o" /></li>
                                            <li className="no-star"><i className="fa fa-star-o" /></li>
                                            <li className="no-star"><i className="fa fa-star-o" /></li>
                                            <li className="review-item"><a href="#">Read Review</a></li>
                                            <li className="review-item"><a href="#">Write Review</a></li>
                                        </ul>
                                    </div> */}
                                    <div className="price-box pt-20">
                                        <span className="new-price new-price-2">{Number(product.price_product).toLocaleString()} VND</span>
                                    </div>
                                    <div className="product-desc">
                                        <p>
                                            <span>100% cotton double printed dress. Black and white striped top and orange high waisted skater skirt bottom. Lorem ipsum dolor sit amet, consectetur adipisicing elit. quibusdam corporis, earum facilis et nostrum dolorum accusamus similique eveniet quia pariatur.</span>
                                        </p>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <div className="product-variants">
                                                <div className="produt-variants-size">
                                                    <label>ROM</label>
                                                    <select className="nice-select">
                                                        <option value={1} title="S" selected="selected">64GB</option>
                                                        <option value={2} title="M">128GB</option>
                                                        <option value={3} title="L">256GB</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="product-variants">
                                                <div className="produt-variants-size">
                                                    <label>Color</label>
                                                    <select className="nice-select">
                                                        <option value={1} selected="selected">Black</option>
                                                        <option value={2}>White</option>
                                                        <option value={3}>Rose Gold</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="single-add-to-cart">
                                        <form onSubmit={(e) => onSubmit(e)} className="cart-quantity">
                                            <div className="quantity">
                                                <label>Quantity</label>
                                                <div className="cart-plus-minus">
                                                    <input className="cart-plus-minus-box" defaultValue={1} onChange={(e) => changeQuantity(e)} type="number" min="1" max="10" />
                                                </div>
                                            </div>
                                            <button className="add-to-cart" onClick={() => onClick(message.addToCart)}>Add to cart</button>
                                        </form>
                                    </div>
                                    <div className="block-reassurance">
                                        <ul>
                                            <li>
                                                <div className="reassurance-item">
                                                    <div className="reassurance-icon">
                                                        <i className="fa fa-check-square-o" />
                                                    </div>
                                                    <p>Security policy (edit with Customer reassurance module)</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="reassurance-item">
                                                    <div className="reassurance-icon">
                                                        <i className="fa fa-truck" />
                                                    </div>
                                                    <p>Delivery policy (edit with Customer reassurance module)</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="reassurance-item">
                                                    <div className="reassurance-icon">
                                                        <i className="fa fa-exchange" />
                                                    </div>
                                                    <p> Return policy (edit with Customer reassurance module)</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* content-wraper end */}
            {/* Begin Product Area */}
            <div className="product-area pt-35">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="li-product-tab">
                                <ul className="nav li-product-menu">
                                    <li><a className="active" data-toggle="tab" href="#description"><span>Description</span></a></li>
                                    <li><a data-toggle="tab" href="#product-details"><span>Product Details</span></a></li>
                                    <li><a data-toggle="tab" href="#reviews"><span>Reviews</span></a></li>
                                </ul>
                            </div>
                            {/* Begin Li's Tab Menu Content Area */}
                        </div>
                    </div>
                    <div className="tab-content">
                        <div id="description" className="tab-pane active show" role="tabpanel">
                            <div className="product-description">
                                <span>{product.describe}</span>
                            </div>
                        </div>
                        <div id="product-details" className="tab-pane" role="tabpanel">
                            <div className="product-details-manufacturer">
                                <a href="#">

                                </a>
                                <p><span>Reference</span> demo_7</p>
                                <p><span>Reference</span> demo_7</p>
                            </div>
                        </div>
                        <div id="reviews" className="tab-pane" role="tabpanel">
                            <div className="list-comment">
                                {checkComments}
                            </div>
                            {/* Begin Quick View | Modal Area */}
                            <div className="modal fade modal-wrapper" id="mymodal">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <h3 className="review-page-title">Write Your Review</h3>
                                            <div className="modal-inner-area row">
                                                <div className="col-lg-6">
                                                    <div className="li-review-product">
                                                        <img src={`http://hieusuper20hcm.herokuapp.com/${product.image}`} alt={product.image} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="li-review-content">
                                                        {/* Begin Feedback Area */}
                                                        <div className="feedback-area">
                                                            <div className="feedback">
                                                                <h3 className="feedback-title">Our Feedback</h3>
                                                                <form action="#">
                                                                    <p className="your-opinion">
                                                                        <label>Your Rating</label>
                                                                        <span>
                                                                            <select id="star" className="star-rating" onChange={(e) => setStar(e.target.value)}>
                                                                                <option value={null}>Chọn điểm đánh giá (không bắt buộc)</option>
                                                                                <option value={1}>1</option>
                                                                                <option value={2}>2</option>
                                                                                <option value={3}>3</option>
                                                                                <option value={4}>4</option>
                                                                                <option value={5}>5</option>
                                                                            </select>
                                                                        </span>
                                                                    </p>
                                                                    <p className="feedback-form">
                                                                        <label htmlFor="content">Your Review</label>
                                                                        <textarea onChange={(e) => setComment(e.target.value)} id="content" name="comment" cols={45} rows={8} aria-required="true" value={comment} />
                                                                    </p>
                                                                    <div className="feedback-input">
                                                                        <p className="feedback-form-author">
                                                                            <label htmlFor="author">Name</label>
                                                                            <input id="author" name="author" defaultValue={user.fullname} disabled size={30} aria-required="true" type="text" />
                                                                        </p>
                                                                        <div className="feedback-btn pb-15">
                                                                            <a href="#" className="close" data-dismiss="modal" aria-label="Close">Close</a>
                                                                            <a href="" onClick={(e) => onSubmitComment(e)}>Submit</a>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                        {/* Feedback Area End Here */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="review-btn mt-4">
                                {checkWriteComment}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Product Area End Here */}
            {/* Begin Li's Laptop Product Area */}
            <section className="product-area li-laptop-product pt-30 pb-50">
                <div className="container">
                    <div className="row">
                        {/* Begin Li's Section Area */}
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="product-active owl-carousel">
                                    <div className="col-lg-12">
                                        {/* single-product-wrap start */}
                                        <div className="single-product-wrap">
                                            <div className="product-image">
                                                <a href="single-product.html">
                                                    <img src="images/product/large-size/1.jpg" alt="Li's Product Image" />
                                                </a>
                                                <span className="sticker">New</span>
                                            </div>
                                            <div className="product_desc">
                                                <div className="product_desc_info">
                                                    <div className="product-review">
                                                        <h5 className="manufacturer">
                                                            <a href="product-details.html">Graphic Corner</a>
                                                        </h5>
                                                        <div className="rating-box">
                                                            <ul className="rating">
                                                                <li><i className="fa fa-star-o" /></li>
                                                                <li><i className="fa fa-star-o" /></li>
                                                                <li><i className="fa fa-star-o" /></li>
                                                                <li className="no-star"><i className="fa fa-star-o" /></li>
                                                                <li className="no-star"><i className="fa fa-star-o" /></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <h4><a className="product_name" href="single-product.html">Accusantium dolorem1</a></h4>
                                                    <div className="price-box">
                                                        <span className="new-price">$46.80</span>
                                                    </div>
                                                </div>
                                                <div className="add-actions">
                                                    <ul className="add-actions-link">
                                                        <li className="add-cart active"><a href="#">Add to cart</a></li>
                                                        <li><a href="#" title="quick view" className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i className="fa fa-eye" /></a></li>
                                                        <li><a className="links-details" href="wishlist.html"><i className="fa fa-heart-o" /></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        {/* single-product-wrap end */}
                                    </div>
                                    <div className="col-lg-12">
                                        {/* single-product-wrap start */}
                                        <div className="single-product-wrap">
                                            <div className="product-image">
                                                <a href="single-product.html">
                                                    <img src="images/product/large-size/2.jpg" alt="Li's Product Image" />
                                                </a>
                                                <span className="sticker">New</span>
                                            </div>
                                            <div className="product_desc">
                                                <div className="product_desc_info">
                                                    <div className="product-review">
                                                        <h5 className="manufacturer">
                                                            <a href="product-details.html">Studio Design</a>
                                                        </h5>
                                                        <div className="rating-box">
                                                            <ul className="rating">
                                                                <li><i className="fa fa-star-o" /></li>
                                                                <li><i className="fa fa-star-o" /></li>
                                                                <li><i className="fa fa-star-o" /></li>
                                                                <li className="no-star"><i className="fa fa-star-o" /></li>
                                                                <li className="no-star"><i className="fa fa-star-o" /></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <h4><a className="product_name" href="single-product.html">Mug Today is a good day</a></h4>
                                                    <div className="price-box">
                                                        <span className="new-price new-price-2">$71.80</span>
                                                        <span className="old-price">$77.22</span>
                                                        <span className="discount-percentage">-7%</span>
                                                    </div>
                                                </div>
                                                <div className="add-actions">
                                                    <ul className="add-actions-link">
                                                        <li className="add-cart active"><a href="#">Add to cart</a></li>
                                                        <li><a href="#" title="quick view" className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i className="fa fa-eye" /></a></li>
                                                        <li><a className="links-details" href="wishlist.html"><i className="fa fa-heart-o" /></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        {/* single-product-wrap end */}
                                    </div>
                                    <div className="col-lg-12">
                                        {/* single-product-wrap start */}
                                        <div className="single-product-wrap">
                                            <div className="product-image">
                                                <a href="single-product.html">
                                                    <img src="images/product/large-size/3.jpg" alt="Li's Product Image" />
                                                </a>
                                                <span className="sticker">New</span>
                                            </div>
                                            <div className="product_desc">
                                                <div className="product_desc_info">
                                                    <div className="product-review">
                                                        <h5 className="manufacturer">
                                                            <a href="product-details.html">Graphic Corner</a>
                                                        </h5>
                                                        <div className="rating-box">
                                                            <ul className="rating">
                                                                <li><i className="fa fa-star-o" /></li>
                                                                <li><i className="fa fa-star-o" /></li>
                                                                <li><i className="fa fa-star-o" /></li>
                                                                <li className="no-star"><i className="fa fa-star-o" /></li>
                                                                <li className="no-star"><i className="fa fa-star-o" /></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <h4><a className="product_name" href="single-product.html">Accusantium dolorem1</a></h4>
                                                    <div className="price-box">
                                                        <span className="new-price">$46.80</span>
                                                    </div>
                                                </div>
                                                <div className="add-actions">
                                                    <ul className="add-actions-link">
                                                        <li className="add-cart active"><a href="#">Add to cart</a></li>
                                                        <li><a href="#" title="quick view" className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i className="fa fa-eye" /></a></li>
                                                        <li><a className="links-details" href="wishlist.html"><i className="fa fa-heart-o" /></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        {/* single-product-wrap end */}
                                    </div>
                                    <div className="col-lg-12">
                                        {/* single-product-wrap start */}
                                        <div className="single-product-wrap">
                                            <div className="product-image">
                                                <a href="single-product.html">
                                                    <img src="images/product/large-size/4.jpg" alt="Li's Product Image" />
                                                </a>
                                                <span className="sticker">New</span>
                                            </div>
                                            <div className="product_desc">
                                                <div className="product_desc_info">
                                                    <div className="product-review">
                                                        <h5 className="manufacturer">
                                                            <a href="product-details.html">Studio Design</a>
                                                        </h5>
                                                        <div className="rating-box">
                                                            <ul className="rating">
                                                                <li><i className="fa fa-star-o" /></li>
                                                                <li><i className="fa fa-star-o" /></li>
                                                                <li><i className="fa fa-star-o" /></li>
                                                                <li className="no-star"><i className="fa fa-star-o" /></li>
                                                                <li className="no-star"><i className="fa fa-star-o" /></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <h4><a className="product_name" href="single-product.html">Mug Today is a good day</a></h4>
                                                    <div className="price-box">
                                                        <span className="new-price new-price-2">$71.80</span>
                                                        <span className="old-price">$77.22</span>
                                                        <span className="discount-percentage">-7%</span>
                                                    </div>
                                                </div>
                                                <div className="add-actions">
                                                    <ul className="add-actions-link">
                                                        <li className="add-cart active"><a href="#">Add to cart</a></li>
                                                        <li><a href="#" title="quick view" className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i className="fa fa-eye" /></a></li>
                                                        <li><a className="links-details" href="wishlist.html"><i className="fa fa-heart-o" /></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        {/* single-product-wrap end */}
                                    </div>
                                    <div className="col-lg-12">
                                        {/* single-product-wrap start */}
                                        <div className="single-product-wrap">
                                            <div className="product-image">
                                                <a href="single-product.html">
                                                    <img src="images/product/large-size/5.jpg" alt="Li's Product Image" />
                                                </a>
                                                <span className="sticker">New</span>
                                            </div>
                                            <div className="product_desc">
                                                <div className="product_desc_info">
                                                    <div className="product-review">
                                                        <h5 className="manufacturer">
                                                            <a href="product-details.html">Graphic Corner</a>
                                                        </h5>
                                                        <div className="rating-box">
                                                            <ul className="rating">
                                                                <li><i className="fa fa-star-o" /></li>
                                                                <li><i className="fa fa-star-o" /></li>
                                                                <li><i className="fa fa-star-o" /></li>
                                                                <li className="no-star"><i className="fa fa-star-o" /></li>
                                                                <li className="no-star"><i className="fa fa-star-o" /></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <h4><a className="product_name" href="single-product.html">Accusantium dolorem1</a></h4>
                                                    <div className="price-box">
                                                        <span className="new-price">$46.80</span>
                                                    </div>
                                                </div>
                                                <div className="add-actions">
                                                    <ul className="add-actions-link">
                                                        <li className="add-cart active"><a href="#">Add to cart</a></li>
                                                        <li><a href="#" title="quick view" className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i className="fa fa-eye" /></a></li>
                                                        <li><a className="links-details" href="wishlist.html"><i className="fa fa-heart-o" /></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        {/* single-product-wrap end */}
                                    </div>
                                    <div className="col-lg-12">
                                        {/* single-product-wrap start */}
                                        <div className="single-product-wrap">
                                            <div className="product-image">
                                                <a href="single-product.html">
                                                    <img src="images/product/large-size/6.jpg" alt="Li's Product Image" />
                                                </a>
                                                <span className="sticker">New</span>
                                            </div>
                                            <div className="product_desc">
                                                <div className="product_desc_info">
                                                    <div className="product-review">
                                                        <h5 className="manufacturer">
                                                            <a href="product-details.html">Studio Design</a>
                                                        </h5>
                                                        <div className="rating-box">
                                                            <ul className="rating">
                                                                <li><i className="fa fa-star-o" /></li>
                                                                <li><i className="fa fa-star-o" /></li>
                                                                <li><i className="fa fa-star-o" /></li>
                                                                <li className="no-star"><i className="fa fa-star-o" /></li>
                                                                <li className="no-star"><i className="fa fa-star-o" /></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <h4><a className="product_name" href="single-product.html">Mug Today is a good day</a></h4>
                                                    <div className="price-box">
                                                        <span className="new-price new-price-2">$71.80</span>
                                                        <span className="old-price">$77.22</span>
                                                        <span className="discount-percentage">-7%</span>
                                                    </div>
                                                </div>
                                                <div className="add-actions">
                                                    <ul className="add-actions-link">
                                                        <li className="add-cart active"><a href="#">Add to cart</a></li>
                                                        <li><a href="#" title="quick view" className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i className="fa fa-eye" /></a></li>
                                                        <li><a className="links-details" href="wishlist.html"><i className="fa fa-heart-o" /></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        {/* single-product-wrap end */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Li's Section Area End Here */}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Detail;