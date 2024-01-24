import classNames from "classnames/bind";
import style from "./Cart.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

const cx = classNames.bind(style);

function Cart() {
    const cartInfo = JSON.parse(localStorage.getItem('cart'));
    const cart = cartInfo?.cartDetails;

    return (
        <div className={'grid wide'}>
            {!cart.length < 1
                ?
                <div className={cx('container')}>
                    <div className={'row'}>
                        <div className={'col l-7'}>
                            <div className={cx('wrapper')}>
                                <table className={cx('table')}>
                                    <thead>
                                    <tr>
                                        <th scope={"col"}></th>
                                        <th scope={"col"} className="h5">Shopping Bag</th>
                                        <th scope={"col"}>Quantity</th>
                                        <th scope={"col"}>Price</th>
                                        <th scope={"col"}></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <div className={cx('container_checkbox')}>
                                                <input type={"checkbox"}/>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={cx('wrapper_head')}>
                                                <div className={cx('container_image')}>
                                                    <img
                                                        src={'https://cdn0.fahasa.com/media/catalog/product/d/n/dntttttuntitled.png'}
                                                        alt={'ảnh minh hoạ'}/>
                                                </div>
                                                <div className={cx('container_info')}>
                                                    <div className={cx('title')}>
                                                        Đắc nhân tâm
                                                    </div>

                                                    <div className={cx('container_author')}>
                                                        <span>Tác giả: </span>
                                                        <span>Dale Carnegie</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={cx('container_quantity')}>
                                                <button>
                                                    <FontAwesomeIcon icon={faMinus}/>
                                                </button>
                                                <input type={"number"}/>
                                                <button>
                                                    <FontAwesomeIcon icon={faPlus}/>
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={cx('container_price')}>
                                                <span>100000</span>
                                                <span>đ</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={cx('container_remove')}>
                                                <FontAwesomeIcon icon={faXmark}/>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className={'col l-5'}>
                            <div className={cx('wrapper')}>
                                <h1>Checkout</h1>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className={cx('container')}>
                    <div className={'row'}>
                        <div className={'col l-12'}>
                            <div className={cx('no_cart')}>
                                <img src={'https://shopcohai.com/public/images/empty-cart.png'} alt={'no cart'}/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Cart;