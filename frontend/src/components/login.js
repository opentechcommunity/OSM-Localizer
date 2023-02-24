import React, { useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';

import { fetchLocalJSONAPI } from '../utills/fetch';
import { setItem, removeItem } from '../utills/localStorage';
import { useDispatch, useSelector } from 'react-redux';
import {authActions} from '../store/store';


const createPopup = (title = "Authentication", location) => {
    const width = 600;
    const height = 600;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);
    const popup = window.open(
        location,
        title,
        `width=${width}, height=${height}, top=${top}, left=${left}`
    );
    if (window.focus) popup.focus();
    return popup;
}

const setUserToStore = (response) => {
    const user = response.user;
    setItem("osm_token", response.osm_token);
    setItem("jwt_token", response.jwt_token);
    setItem("username", user.username);
    setItem("user_id", user.user_id);
    setItem("role", user.role)
    setItem("picture_url", user.picture_url)
    window.location.reload();
}

const removeUserFromStore = () => {
    removeItem("osm_token");
    removeItem("jwt_token");
    removeItem("username");
    removeItem("user_id");
    removeItem("role");
    removeItem("picture_url");
    // window.location.reload();
}

const createLoginWindow = (dispatch) => {
    const popup = createPopup("Login", "");
    const url = "/auth/url/";
    fetchLocalJSONAPI(url, "GET")
        .then((response) => {
            popup.location = response.url;

            window.authComplete = (code, state) => {
                if (response.state === state) {
                    popup.close();
                    const url = "/auth/token/?code=" + code;
                    fetchLocalJSONAPI(url, "GET")
                        .then((response) => {
                            setUserToStore(response);
                            dispatch(authActions.login(response));
                        }
                        );
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

const UserMenu = ({ username, dispatch }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const onClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }
    const ref = useDetectClickOutside({ onTriggered: () => setIsDropdownOpen(false) });
    return (
        isDropdownOpen ? (
            <div className="dropdown" ref={ref}>
                <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    onClick={() => onClick()}
                >
                    {username}
                </button>
                <ul className="dropdown-menu d-flex flex-column">
                    {/* <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li> */}
                    <li>
                        <span
                            className="dropdown-item"
                            onClick={() => {
                                removeUserFromStore();
                                dispatch(authActions.logout());
                            }}
                        >
                            Logout
                        </span>
                    </li>
                </ul>
            </div>
        ) : (
            <div className="dropdown">
                <button
                    className="btn btn-secondary dropdown-toggle"
                    onClick={onClick}
                >
                    {username}
                </button>
            </div>
        )
    );
}



const Login = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    return (
        <div>
            {user ? (
                < UserMenu username={user.username} dispatch={dispatch} />
            ) : (
                <button
                    className='btn btn-primary'
                    onClick={() => {
                        createLoginWindow(dispatch);
                    }}
                >
                    Login
                </button>
            )}

        </div>
    );
}

export default Login
