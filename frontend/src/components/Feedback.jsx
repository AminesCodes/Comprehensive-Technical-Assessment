import React from 'react'

export default function Feedback (props) {
    let text = <p>Sorry, something went wrong <br/>Please try again</p>
    

    return(
        <div className=''>
            <div>
                <button className='btn-sm btn-danger' onClick={props.hideFeedbackDiv}>X</button>
            </div>
            <div>
                {text}
            </div>
        </div>
    )
}