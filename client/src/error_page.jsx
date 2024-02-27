import React from 'react'
import './error_page.css';

const error_page = () => {
    return (
        <div>
            <br />
            <div className="error-page text-center">
                <h1>404!</h1>
                <img className="vibrate-1" alt="404" src="/404.jpeg"/>
                <br />
                <br />
                <a className="navbar-brand" href="/">Back to Home</a>
                <br />
                <br />
            </div>  
        </div>
    )
}

export default error_page
