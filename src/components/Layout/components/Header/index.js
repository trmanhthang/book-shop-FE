import classNames from "classnames/bind";
import styles from './Header.module.scss'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Header() {
    let flag = true;
    const cartInfo = JSON.parse(localStorage.getItem("cart"));
    const isLogging = localStorage.getItem("isLogin");
    const user = JSON.parse(localStorage.getItem("user"));
    const cart = cartInfo?.cartDetails;

    useEffect(() => {

    }, [flag])

    return (
        <div className={cx('header')}>
            <div className={'grid wide'}>
                <div className={cx('header_container')}>
                    <div className={cx('header_left')}>
                        <div className={cx('container_logo')}>BOOK STORE</div>
                        <nav className={cx('nav')}>
                            <ul>
                                <li className={cx('nav_items')}>
                                    <Link to={'/'}>Home</Link>
                                </li>
                                <li className={cx('nav_items')}>
                                    <Link to={''}>About</Link>
                                </li>
                                <li className={cx('nav_items')}>
                                    <Link to={''}>Contact</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className={cx('header_right')}>
                        {isLogging
                            ?
                            <div className={cx('container_info')}>
                                <div className={cx('wrapper')}>
                                    <div className={cx('container_avatar')}>
                                        <img src={user?.avatar} alt={'Ảnh đại diện'}/>
                                    </div>
                                    <ul className={cx('popup')}>
                                        <li onClick={() => logOut()}>Đăng xuất</li>
                                    </ul>
                                </div>
                                <Link to={"/cart"} className={cx('container_cart')}>
                                    {!cart.length < 1 && <span className={cx('popup_quantity')}>{cart.length}</span>}
                                    <FontAwesomeIcon icon={faCartShopping}/>
                                    {!cart.length < 1
                                        ?
                                        <ul className={cx('popup_cart')}>
                                            <li>
                                                <div className={cx('cart_image')}>
                                                    <img
                                                        src={'https://cdn0.fahasa.com/media/catalog/product/d/n/dntttttuntitled.png'}
                                                        alt={'ảnh minh hoạ'}/>
                                                </div>
                                                <div className={cx('wrapper_info')}>
                                                    <div className={cx('cart_title')}>Đắc nhân tâm</div>
                                                    <div className={cx('cart_author')}>
                                                        <span>Tác giả: </span>
                                                        <span>Nguyễn Nhật Ánh</span>
                                                    </div>
                                                </div>
                                                <div className={cx('wrapper_total')}>
                                                    <div className={cx('group_quantity')}>
                                                        <span>x</span>
                                                        <span>2</span>
                                                    </div>
                                                    <div className={cx('total')}>100000đ</div>
                                                </div>
                                            </li>
                                        </ul>
                                        :
                                        <ul className={cx('popup_cart')}>
                                            <div className={cx('no_cart')}>
                                                <img src={'https://shopcohai.com/public/images/empty-cart.png'} alt={'no cart'}/>
                                            </div>
                                        </ul>
                                    }
                                </Link>
                            </div>
                            :
                            <div className={cx('container_btn')}>
                                <Link to={'/login'} className={cx('btn_login')}>Sign In</Link>
                                <Link to={'/register'} className={cx('btn_register')}>Sign Up</Link>
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    )

    function logOut() {
        localStorage.clear();
        window.location.reload(true);
        flag = false;
    }
}

export default Header;