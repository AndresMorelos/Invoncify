import React from 'react'

const CustomSymbol = function({ size, color, borderWidth, borderColor }){
   return (
        <g>
          <circle
            fill="#fff"
            r={size / 2}
            strokeWidth={borderWidth}
            stroke={borderColor}
          />
          <circle
            r={size / 5}
            strokeWidth={borderWidth}
            stroke={borderColor}
            fill={color}
            fillOpacity={0.35}
          />
        </g>
      )
};

export default CustomSymbol;