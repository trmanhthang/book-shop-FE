import classNames from "classnames/bind";
import style from "./Home.module.scss";
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const cx = classNames.bind(style);

function Home() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllBook();
    }, [])

    return (
        <div className={cx('main')}>
            <div className={'grid wide'}>
                <div className={'row'}>
                    {
                        books?.map((book) =>
                            <div key={book.id} className={'col l-3'} onClick={() => detailBook(book.id)}>
                                <div className={cx('container')}>
                                    <div className={cx('container_image')}>
                                        <img src={book?.image} alt={'ảnh minh hoạ'}/>
                                    </div>
                                    <div className={cx('container_content')}>
                                        <h2 className={cx('title')}>
                                            {book?.title}
                                        </h2>

                                        <div className={cx('genre')}>{book?.genres.map((genre) => genre.name,)}</div>
                                        <div className={cx('author')}>{book?.author.fullName}</div>
                                        <div className={cx('price')}>{book?.price}đ</div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )

    function getAllBook() {
        axios.get('http://localhost:4000/book/all').then((res) => {
            setBooks(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    function detailBook(id) {
        navigate(`/detail/${id}`);
    }
}

export default Home;