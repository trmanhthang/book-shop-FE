import classNames from "classnames/bind";
import style from './Detail.module.scss';
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const cx = classNames.bind(style);

function Detail() {
    const param = useParams();
    const idBook = param.id;

    const [book, setBook] = useState({});
    const [genres, setGenres] = useState([]);
    let [quantity, setQuantity] = useState(1)

    useEffect(() => {
        getInfoBook(idBook);
    }, [idBook])

    return (
        <div className={'grid wide'}>
            <div className={cx('container')}>
                <div className={'row'}>
                    <div className={'col l-6'}>
                        <div className={cx('container_image')}>
                            <img src={book?.image} alt={'Ảnh minh hoạ'}/>
                        </div>
                    </div>
                    <div className={'col l-6'}>
                        <div className={cx('container_info')}>
                            <div className={cx('container_header')}>
                                <h1>{book?.title}</h1>
                                <Link to={`/author/${book.author?.id}`}>{book.author?.fullName}</Link>
                            </div>
                            <div className={cx('container_text')}>
                                <div className={cx('container_sub')}>
                                    <span className={cx('appendix')}>Thể loại</span>
                                    <span className={cx('sign')}>:</span>
                                    <span className={cx('sub_items')}>{genres.map((genre) => <span className={cx('genre_items')}>{genre?.genreName}</span>)}</span>
                                </div>
                                <div className={cx('container_sub')}>
                                    <span className={cx('appendix')}>Xuất bản</span>
                                    <span className={cx('sign')}>:</span>
                                    <span className={cx('sub_items')}>{book?.publicationDate}</span>
                                </div>
                                <div className={cx('container_sub')}>
                                    <span className={cx('appendix')}>ISBN </span>
                                    <span className={cx('sign')}>:</span>
                                    <span className={cx('sub_items')}>{book?.ISBN || 'Không có mã sách'}</span>
                                </div>
                                <div className={cx('container_sub')}>
                                    <span className={cx('appendix')}>Số lượng </span>
                                    <span className={cx('sign')}>:</span>
                                    <span className={cx('sub_items')}>{book?.quantity}</span>
                                </div>
                                <div className={cx('container_sub')}>
                                    <span className={cx('appendix')}>Giá</span>
                                    <span className={cx('sign')}>:</span>
                                    <span className={cx('sub_items')}>{book?.price}đ</span>
                                </div>
                                <div className={cx('form')}>
                                    <div className={cx('wrapper_quantity')}>
                                        <button className={cx('btn_sign')} onClick={() => reduceQuantity()}>-</button>
                                        <input type={'text'} value={quantity}/>
                                        <button className={cx('btn_sign')} onClick={() => increaseQuantity()}>+</button>
                                    </div>
                                    <div className={cx('container_btn')}>
                                        <button className={cx('btn')}>Đặt hàng</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    function getInfoBook(id) {
        axios.get(`http://localhost:4000/book/${id}`).then((res) => {
            console.log(res.data);
            setBook(res.data);
            setGenres(res.data.genres);
        }).catch((err) => {
            console.log(err);
        })
    }

    function increaseQuantity () {
        if (quantity < book.quantity) {
            setQuantity(++quantity);
        }
    }

    function reduceQuantity () {
        if (quantity > 1) {
            setQuantity(--quantity);
        }
    }
}

export default Detail;