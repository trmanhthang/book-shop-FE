import classNames from "classnames/bind";
import style from "./Loading.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style);
function Loading() {
    return (
        <div className={cx('loading')}>
            <FontAwesomeIcon icon={faSpinner} className={cx('icon_loading')}/>
        </div>
    )
}

export default Loading;