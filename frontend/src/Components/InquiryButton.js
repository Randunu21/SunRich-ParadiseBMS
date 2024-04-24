import React, { useState, useCallback } from "react";
import { Link, useNavigate} from "react-router-dom";


import "./inquiryButton.css";
import "./popup.css"; // Import CSS file for the popup styles


function ChatButton() {
    const [isDragging, setIsDragging] = useState(false); // State to track if the button is being dragged
    const [position, setPosition] = useState({ x: 20, y: 20 }); // Initial position
    const [offset, setOffset] = useState({ x: 0, y: 0 }); // Offset for mouse position relative to the button
    const [clickCount, setClickCount] = useState(0); // State to track the number of clicks
    const navigate = useNavigate();
   

    const handleMouseDown = (event) => {
        setIsDragging(true);
        const offsetX = event.clientX - position.x;
        const offsetY = event.clientY - position.y;
        setOffset({ x: offsetX, y: offsetY });
    };
    
    const handleNextClick = () => {
        navigate("/AddInquiry"); // Use navigate function to redirect
    };

    const handleMouseMove = useCallback((event) => {
        if (isDragging) {
            const newX = event.clientX - offset.x;
            const newY = event.clientY - offset.y;
            setPosition({ x: newX, y: newY });
        }
    }, [isDragging, offset]); // Include isDragging and offset in the dependency array

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []); // No dependencies, so the function will remain stable

    const handleButtonClick = () => {
        setClickCount((prevCount) => prevCount + 1);
    };

  
    React.useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    const buttonStyle = {
        position: "fixed",
        left: `${position.x}px`, // Change to "left" instead of "right"
        top: `${position.y}px`, // Use "top" instead of "bottom"
        cursor: isDragging ? "grabbing" : "grab", // Change cursor style when dragging
    };

    return (
        <>
            <Link
                to="/"
                className="chat-button"
                style={buttonStyle}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onClick={handleButtonClick}
            >
                <div className="question-mark">?</div>
            </Link>
            {(clickCount % 2 === 1) && (
                <div className="popup">
                    <p>Hello! If you have questions,doubts on what you are looking for,click next.</p>
                    <button onClick={handleNextClick}>Next</button>


                </div>
            )}
        </>
    );
}

export default ChatButton;