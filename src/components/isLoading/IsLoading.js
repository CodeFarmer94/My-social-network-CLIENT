import './isLoading.css'

import { Spinner } from "react-bootstrap";

export default function IsLoading() {

    return (
        <div className="IsLoading">
            <div className='spinner-container'>
                <Spinner/><h1>IsLoading</h1>
            </div>
        </div>
    );
    }