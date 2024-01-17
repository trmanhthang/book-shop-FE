import classNames from "classnames/bind";
import style from './Login.module.scss';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {ErrorMessage, FastField, Form, Formik} from "formik";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {toastSuccess, toastWarning} from "../../components/Alert";

const cx = classNames.bind(style);
function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexString = /^[^!@#$%^&*()_+=?/|\\,{[\]}:'"`~]+$/;
    const navigate = useNavigate();

    const initialValue = {
        password: "",
        email: "",
    }

    const createSchema = Yup.object().shape({
        password: Yup.string()
            .required("Không được để trống!")
            .matches(regexString, {
                message: "Không được chứa ký tự đặc biệt",
                excludeEmptyString: true
            }),
        email: Yup.string()
            .required("Không được để trống")
            .email("Không đúng định dạng!")
            .matches(regexEmail, {
                message: "Không đúng định dạng!",
                excludeEmptyString: true
            }),
    })

    return (<div className={cx('main')}>
        <Formik
            initialValues={initialValue}
            onSubmit={(values) => {
                loginUser(values);
            }}
            validationSchema={createSchema}
        >
            <div className={cx('container')}>
                <Form className={cx('form')}>
                    <div className={cx('header_form')}>
                        <h1 className={cx("form_title")}>Đăng nhập</h1>
                    </div>

                    <div className={cx('wrapper')}>
                        <div className={cx('wrap_items')}>
                            <div className={cx("container_input")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none">
                                    <path
                                        d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
                                        fill="#B1B1B1"/>
                                </svg>
                                <label>
                                    <FastField
                                        id={"email"}
                                        name={"email"}
                                        className={cx("input_text")}
                                        type={"text"}
                                        placeholder={"Email"}
                                    />
                                </label>
                            </div>
                            <ErrorMessage name={"email"} render={(message) => errorMessage(message)}/>
                        </div>
                        <div className={cx('wrap_items')}>
                            <div className={cx("container_input")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none">
                                    <path
                                        d="M12 17C11.4696 17 10.9609 16.7893 10.5858 16.4142C10.2107 16.0391 10 15.5304 10 15C10 13.89 10.89 13 12 13C12.5304 13 13.0391 13.2107 13.4142 13.5858C13.7893 13.9609 14 14.4696 14 15C14 15.5304 13.7893 16.0391 13.4142 16.4142C13.0391 16.7893 12.5304 17 12 17ZM18 20V10H6V20H18ZM18 8C18.5304 8 19.0391 8.21071 19.4142 8.58579C19.7893 8.96086 20 9.46957 20 10V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V10C4 8.89 4.89 8 6 8H7V6C7 4.67392 7.52678 3.40215 8.46447 2.46447C9.40215 1.52678 10.6739 1 12 1C12.6566 1 13.3068 1.12933 13.9134 1.3806C14.52 1.63188 15.0712 2.00017 15.5355 2.46447C15.9998 2.92876 16.3681 3.47995 16.6194 4.08658C16.8707 4.69321 17 5.34339 17 6V8H18ZM12 3C11.2044 3 10.4413 3.31607 9.87868 3.87868C9.31607 4.44129 9 5.20435 9 6V8H15V6C15 5.20435 14.6839 4.44129 14.1213 3.87868C13.5587 3.31607 12.7956 3 12 3Z"
                                        fill="#B1B1B1"/>
                                </svg>
                                <label>
                                    <FastField
                                        id={"password"}
                                        name={"password"}
                                        className={cx('input_text')}
                                        type={"password"}
                                        placeholder={"Mật khẩu"}
                                    />
                                </label>
                                <span className={cx('icon_check_password')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none">
                                    <path
                                        d="M2 5.27L3.28 4L20 20.72L18.73 22L15.65 18.92C14.5 19.3 13.28 19.5 12 19.5C7 19.5 2.73 16.39 1 12C1.69 10.24 2.79 8.69 4.19 7.46L2 5.27ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15.0005 12.3406 14.943 12.6787 14.83 13L11 9.17C11.3213 9.05698 11.6594 8.99949 12 9ZM12 4.5C17 4.5 21.27 7.61 23 12C22.1839 14.0732 20.7969 15.8727 19 17.19L17.58 15.76C18.9629 14.8034 20.0782 13.5091 20.82 12C20.0116 10.3499 18.7564 8.95977 17.1973 7.9875C15.6381 7.01524 13.8375 6.49988 12 6.5C10.91 6.5 9.84 6.68 8.84 7L7.3 5.47C8.74 4.85 10.33 4.5 12 4.5ZM3.18 12C3.98844 13.6501 5.24357 15.0402 6.80273 16.0125C8.36189 16.9848 10.1625 17.5001 12 17.5C12.69 17.5 13.37 17.43 14 17.29L11.72 15C11.0242 14.9254 10.3748 14.6149 9.87997 14.12C9.38512 13.6252 9.07458 12.9758 9 12.28L5.6 8.87C4.61 9.72 3.78 10.78 3.18 12Z"
                                        fill="#169C89"/>
                                </svg>
                                </span>
                            </div>
                            <ErrorMessage name={"password"} render={(message) => errorMessage(message)}/>
                        </div>
                    </div>

                    <div className={cx('container_btn')}>
                        {!isLoading ?
                            <button className={cx('btn_submit')} type={"submit"} disabled={isLoading}
                                    style={{cursor: isLoading ? "unset" : "pointer"}}>Đăng nhập
                            </button>
                            :
                            <div className={cx('loading')}>
                                <FontAwesomeIcon icon={faSpinner} className={cx('icon_loading')}/>
                            </div>
                        }
                    </div>
                    <div className={cx('text')}>Or connect</div>
                    <div className={cx("container_social")}>
                        <div className={cx("btn_social")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                 fill="none">
                                <g clipPath="url(#clip0_7_166)">
                                    <path
                                        d="M19.9894 10.1871C19.9894 9.36773 19.9214 8.76979 19.7741 8.14972H10.1992V11.848H15.8195C15.7062 12.7671 15.0943 14.1512 13.7345 15.0813L13.7155 15.2051L16.7429 17.497L16.9526 17.5174C18.8789 15.7789 19.9894 13.2211 19.9894 10.1871Z"
                                        fill="#4285F4"/>
                                    <path
                                        d="M10.1992 19.9313C12.9527 19.9313 15.2642 19.0454 16.9526 17.5174L13.7345 15.0813C12.8734 15.6682 11.7175 16.0779 10.1992 16.0779C7.50236 16.0779 5.21346 14.3395 4.39753 11.9366L4.27793 11.9466L1.12997 14.3273L1.08881 14.4391C2.76582 17.6945 6.21054 19.9313 10.1992 19.9313Z"
                                        fill="#34A853"/>
                                    <path
                                        d="M4.39753 11.9366C4.18224 11.3166 4.05764 10.6521 4.05764 9.96565C4.05764 9.27908 4.18224 8.61473 4.3862 7.99466L4.3805 7.8626L1.19309 5.44366L1.08881 5.49214C0.39763 6.84305 0.00102997 8.36008 0.00102997 9.96565C0.00102997 11.5712 0.39763 13.0882 1.08881 14.4391L4.39753 11.9366Z"
                                        fill="#FBBC05"/>
                                    <path
                                        d="M10.1992 3.85336C12.1142 3.85336 13.4059 4.66168 14.1425 5.33717L17.0206 2.59107C15.253 0.985496 12.9527 0 10.1992 0C6.21055 0 2.76582 2.23672 1.08881 5.49214L4.3862 7.99465C5.21346 5.59183 7.50237 3.85336 10.1992 3.85336Z"
                                        fill="#EB4335"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_7_166">
                                        <rect width="20" height="20" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className={cx("btn_social")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20"
                                 fill="none">
                                <path
                                    d="M10.5 20C16.0228 20 20.5 15.5228 20.5 9.99999C20.5 4.47715 16.0228 0 10.5 0C4.97715 0 0.5 4.47715 0.5 9.99999C0.5 15.5228 4.97715 20 10.5 20Z"
                                    fill="#1977F3"/>
                                <path
                                    d="M14.3925 12.8913L14.8355 9.99999H12.0624V8.12403C12.0624 7.3337 12.4491 6.56166 13.6922 6.56166H14.9536V4.10068C14.9536 4.10068 13.8089 3.90521 12.7149 3.90521C10.4311 3.90521 8.93763 5.28898 8.93763 7.79636V9.99999H6.39791V12.8913H8.93763V19.879C9.4467 19.9592 9.96843 20 10.5 20C11.0316 20 11.5533 19.9578 12.0624 19.879V12.8913H14.3925Z"
                                    fill="white"/>
                            </svg>
                        </div>
                    </div>
                </Form>
            </div>
        </Formik>
    </div>)


    function loginUser (value) {
        const user = {
            email: value.email,
            password: value.password,
        }
        setIsLoading(true);
        axios.post("http://localhost:4000/auth/login", user).then(async (res) => {
            await toastSuccess(res.data.message);
            setIsLoading(false);
            navigate('/login')
        }).catch((err) => {
            toastWarning(err.response.data.message)
            setIsLoading(false);
        })
    }

    function errorMessage (message) {
        return <div className={cx('text_message_error')}>{message}</div>
    }
}

export default Login;