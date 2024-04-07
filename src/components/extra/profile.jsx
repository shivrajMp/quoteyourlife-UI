import React from 'react';
function generateProfileDesign(name) {
  // Generate a deterministic seed based on the name
  let seed = 0;
  for (let i = 0; i < name.length; i++) {
    seed = name.charCodeAt(i) + ((seed << 5) - seed);
  }

  // Use the seed to generate random properties for the profile design
  const rand = function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };

  // Generate random properties for the profile design
  const backgroundColor = '#' + Math.floor(rand() * 16777215).toString(16); // Random background color
  const foregroundColor = '#' + Math.floor(rand() * 16777215).toString(16); // Random foreground color
  const pattern = Math.floor(rand() * 5); // Random pattern type

  // Return the generated profile design properties
  return {
    backgroundColor,
    foregroundColor,
    pattern
    // Add more properties as needed
  };
}


function ProfileImage({ name ,w=30,h=30}) {
  const profileDesign = generateProfileDesign(name);

  // Generate pattern based on pattern type
  let patternContent = null;
  switch (profileDesign.pattern) {
    case 0:
      patternContent = <rect width="50%" height="50%" fill={profileDesign.foregroundColor} />;
      break;
    case 1:
      patternContent = <circle cx="25%" cy="25%" r="15%" fill={profileDesign.foregroundColor} />;
      break;
    case 2:
      patternContent = (
        <>
          <circle cx="25%" cy="25%" r="15%" fill={profileDesign.foregroundColor} />
          <rect x="50%" y="50%" width="50%" height="50%" fill={profileDesign.foregroundColor} />
        </>
      );
      break;
    case 3:
      patternContent = (
        <>
          <rect width="40%" height="40%" fill={profileDesign.foregroundColor} />
          <rect x="60%" y="60%" width="40%" height="40%" fill={profileDesign.foregroundColor} />
        </>
      );
      break;
    case 4:
      patternContent = (
        <>
          <circle cx="50%" cy="50%" r="40%" fill={profileDesign.foregroundColor} />
        </>
      );
      break;
    default:
      patternContent = null;
  }

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        backgroundColor: profileDesign.backgroundColor,
        borderRadius: '50%'
      }}
    >
      {patternContent}
    </svg>
  );
}

export default ProfileImage;
