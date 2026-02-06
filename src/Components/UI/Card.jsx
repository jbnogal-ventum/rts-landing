// src/Components/UI/Card.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "../index";

export default function Card({ title, description, image, to, children }) {
  const navigate = useNavigate();
  
  return (
    <div className="
      relative
      max-w-[409px]
      w-[85vw]
      h-[50vh]
      rounded-xs
      overflow-hidden
      cursor-pointer
      flex flex-col justify-between p-4
    " style={{
      backgroundImage: `url(${image})`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
    >
    
   {/* Título flotante (siempre visible) */}
      <Typography variant="title-small" className="z-10">
        {title}
      </Typography>
      {/* Overlay de hover */}
      <div className="
        absolute
        inset-0
        p-4
        bg-black/60
        //backdrop-blur
        opacity-0
        flex
        flex-col
        justify-end
        gap-5
        transition-opacity
        duration-350
        ease-out
        hover:opacity-100
      ">
   

        {/* Descripción */}
        <Typography className="mr-7 pr-2">
          {description}
        </Typography>

        {/* Botón */}
        <Button 
          variant="navbar-filled-light" 
         
          onClick={() => navigate(to)}
        >
          Learn more
        </Button>
      </div>
    </div>
  );
}