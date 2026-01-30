// src/Components/UI/Card.jsx
import React from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../index";
export default function Card({ title, description, image,to, children }) {
  const navigate = useNavigate();
  return (
    <div className="card-component">
      <img src={image} alt={title} className="card-image" />

 
      <h3 className="card-floating-title title-sm">{title}</h3>


      <div className="card-hover">
        <p className="card-hover-description body-sm">{description}</p>

        <Button variant="navbar-filled-light" className="" onClick={() => navigate(to)}>
          Learn more
        </Button>
      </div>
    </div>
  );
}