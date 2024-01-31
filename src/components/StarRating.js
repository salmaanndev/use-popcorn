import React, { useState } from 'react'
import Star from './Star'
import PropTypes from 'prop-types'

const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
}

const startContainerStyle = {
    display: "flex",
    alignItems: "center",
}



const StarRating = ({ maxRating = 5, color = '#fcc419', size=48, onSetRating}) => {

    const [rating, setRating] = useState(1);
    const [temprating, setTemprating] = useState(0);

    const handleRating = (rating) => {
        setRating(rating);
        onSetRating(rating);
    }

    const textStyle = {
        lineHeight: "1",
        margin: "0",
        color: color,
        fontSize: `${size / 1.5}px`
    }

    return (
        <div style={containerStyle}>
            <div style={startContainerStyle}>
                {Array.from({ length: maxRating }, (_, i) =>
                    <Star key={i} color={color} size={size}  onRate={() => handleRating(i + 1)} full={temprating ?  temprating >= i+1 : rating >= i +1} onHoverIn={()=> setTemprating(i+1)} onHoverOut={()=>setTemprating(0)} />
                )}
            </div>
            <p style={textStyle}>{temprating || rating || ""}</p>
        </div>
    )
}

StarRating.propTypes = {
    maxRating: PropTypes.number,
}

export default StarRating
