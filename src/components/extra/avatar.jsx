import React from 'react';

function UserProfileIcon({ size = 100 }) {
  // Function to generate a random color in hexadecimal format
  const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  // Generate an array of 9 random colors for the blocks
  const colors = Array.from({ length: 9 }, () => getRandomColor());

  // Style for each block
  const blockStyle = {
    width: `${size / 3}px`,
    height: `${size / 3}px`,
    backgroundColor: 'currentColor',
    borderRadius: '50%',
  };

  // Style for the circular container
  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
  };

  return (
    <div style={containerStyle}>
      {/* Map through the colors array and render a block for each color */}
      {colors.map((color, index) => (
        <div key={index} style={{ ...blockStyle, backgroundColor: color }} />
      ))}
    </div>
  );
}

export default UserProfileIcon;
