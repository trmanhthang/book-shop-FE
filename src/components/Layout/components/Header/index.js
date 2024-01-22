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
    const [categories, setCategories] = useState([]);
    const isLogging = localStorage.getItem("isLogin");
    const user = JSON.parse(localStorage.getItem("user"));

    console.log(user);
    useEffect(() => {
        getAllGenre();
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
                                    <Link to={''}>Category</Link>
                                    <ul className={cx('nav_sub')}>
                                        {categories.map((category) =>
                                            <li key={category.id}
                                                className={cx('nav_sub_items')}>{category?.genreName}</li>
                                        )}
                                    </ul>
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
                                <div className={cx('container_cart')}>
                                    <FontAwesomeIcon icon={faCartShopping}/>
                                </div>
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

    function getAllGenre() {
        axios.get('http://localhost:4000/genre/category').then((res) => {
            setCategories(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    function logOut() {
        localStorage.clear();
        window.location.reload(true);
        flag = false;
    }
}

export default Header;