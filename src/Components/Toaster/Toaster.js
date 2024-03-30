import React, { useEffect, useState } from 'react'
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import "./toaster.scss";

export const Toaster = ({ message, type, duration = 4000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setIsVisible(false), duration);
    return () => clearTimeout(timer);


  }, [duration])

  return (
    <div className={`toaster ${type} ${isVisible ? "visible" : ""}`}>
      {message} {type === "success" ? <FaCheckCircle /> : <FaExclamationTriangle />}
    </div>
  )
}
