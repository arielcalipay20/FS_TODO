import React from 'react'
import { Outlet, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RouteData } from './RouteData'

const Layout = () => {
    const location = useLocation();

    return (
        <>
            <header>
                <nav>

                    <ul>
                        <h1>Todo List</h1>
                        {RouteData.map((val, key) => {
                            const path = location.pathname
                            return (
                                <li id={path === val.link ? "el-active" : ""} key={key}>
                                    <FontAwesomeIcon icon={val.icon} />
                                    <Link id={path === val.link ? "link-active" : ""} className='link' to={val.link}>{val.title}</Link>
                                </li>
                            );
                        })}
                    </ul>
                    <div className='outlet'>
                        <Outlet />
                    </div>
                </nav>
            </header>

        </>
    )
}

export default Layout
