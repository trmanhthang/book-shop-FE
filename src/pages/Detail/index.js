import classNames from "classnames/bind";
import style from './Detail.module.scss';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus, faPaperPlane, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FastField, Form, Formik} from "formik";
import {toastError, toastSuccess} from "../../components/Alert";

const cx = classNames.bind(style);

function Detail() {
    const param = useParams();
    const idBook = parseInt(param.id);
    let user = JSON.parse(localStorage.getItem('user'));

    const [book, setBook] = useState({});
    const [genres, setGenres] = useState([]);
    const [reviews, setReviews] = useState([]);
    let [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();

    const arg = {
        comment: "",
        datePost: Date.now().toString(),
        book: {
            id: idBook
        },
        user: {
            id: user?.id
        }
    }

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
                                    <span className={cx('sub_items')}>{genres.map((genre) => <span
                                        className={cx('genre_items')}>{genre?.genreName}</span>)}</span>
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
                                <Formik
                                    initialValues={{

                                    }}
                                    onSubmit={(value) => setCart(value)}
                                >
                                    <Form className={cx('form')}>
                                        <div className={cx('wrapper_quantity')}>
                                            <button className={cx('btn_sign')} onClick={() => reduceQuantity()}>-
                                            </button>
                                            <FastField type={'text'} value={quantity} readOnly={true}/>
                                            <button className={cx('btn_sign')} onClick={() => increaseQuantity()}>+
                                            </button>
                                        </div>
                                        <div className={cx('container_btn')}>
                                            <button className={cx('btn')} type={"submit"}>
                                                <FontAwesomeIcon icon={faCartPlus}/>
                                                Đặt hàng
                                            </button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('container_review')}>
                <div className={cx('container_review_title')}>Đánh giá</div>
                <div className={cx('container_comment')}>
                    {reviews?.map((review) =>
                        <div key={review.id} className={cx('wrapper_comment_items')}>
                            <div className={cx('comment_info')}>
                                <div className={cx('info_avatar')}>
                                    <img src={review.user.avatar} alt={'ảnh đại diện'}/>
                                </div>
                                <div className={cx('info_name')}>
                                    {review.user.username}
                                </div>
                            </div>
                            <div className={cx('comment_text')}>
                                {review.comment}
                            </div>

                            {review.user?.id === user?.id &&
                                <div className={cx('wrapper_btn_action')}>
                                <span className={cx('btn_action')} onClick={() => removeComment(review.id)}>
                                    <FontAwesomeIcon icon={faXmark}/>
                                </span>
                                </div>
                            }
                        </div>
                    )}
                </div>
                <Formik
                    initialValues={arg}
                    onSubmit={(value) => postComment(value)}
                >
                    <Form className={cx('wrapper_post')}>
                        <FastField className={cx('input_text')} type={'text'} name={'comment'}/>
                        <button type={"submit"}>
                            <FontAwesomeIcon icon={faPaperPlane}/>
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    )

    function getInfoBook(id) {
        axios.get(`http://localhost:4000/book/${id}`).then((res) => {
            setBook(res.data);
            setGenres(res.data.genres);
            setReviews(res.data.reviews);
        }).catch((err) => {
            console.log(err);
        })
    }

    function increaseQuantity() {
        if (quantity < book.quantity) {
            setQuantity(++quantity);
        }
    }

    function reduceQuantity() {
        if (quantity > 1) {
            setQuantity(--quantity);
        }
    }

    function postComment(value) {
        if (user) {
            axios.post('http://localhost:4000/review/post', value)
                .then((res) => {
                    setReviews(res.data);
                })
        } else {
            toastError("Bạn chưa đăng nhập!")
            navigate('/login');
        }
    }

    async function removeComment(idComment) {
        const arg = {
            review: idComment,
            book: idBook,
            user: user?.id,
        }
        console.log(arg);
        axios.delete('http://localhost:4000/review/delete', {
            params: arg,
        })
            .then((res) => {
                const value = res.data
                setReviews(value.data);
                toastSuccess(value.message);
            })
            .catch((err) => {
                toastError('Đã xảy ra lỗi!');
                console.log(err)
            })
    }

    function setCart(value) {

    }
}

export default Detail;