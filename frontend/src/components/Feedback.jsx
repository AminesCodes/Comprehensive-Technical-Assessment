import React from 'react'

export default function Feedback (props) {
    let text = <p>Sorry, something went wrong <br/>Please try again</p>
    // HAS props.err

    return(
        <div className='w-75 mx-auto mt-5 p-2 text-center feedbackContainer'>
            <div className='text-right m-2'>
                <button className='btn-sm btn-danger' onClick={props.hideFeedbackDiv}>X</button>
            </div>
            <div>
                {text}
            </div>
        </div>
    )
}