const UserIcon = ({ name }) => {
  let firstAlpha = (name.toUpperCase().match(/[a-zA-Z]/) || []).pop();
  // Different UserIcon background colors
  const rgbColors = {
    0: '#7CB5D2',
    1: '#89C4C2',
    2: '#957DAD',
    3: '#9EC8D2',
    4: '#B4D7A2',
    5: '#B5E0DF',
    6: '#B9EAED',
    7: '#BC789E',
    8: '#D0EBC5',
    9: '#D291BC',
    10: '#DCF2EE',
    11: '#E0BBE4',
    12: '#E2EEC2',
    13: '#F1C470',
    14: '#F3F7C1',
    15: '#F3FAF1',
    16: '#F5A2A2',
    17: '#F7EF64',
    18: '#F9D494',
    19: '#F9D4A4',
    20: '#FBD7BB',
    21: '#FCEEC5',
    22: '#FDD3E3',
    23: '#FEC8D8',
    24: '#FFDFD3',
    25: '#FFE5B4'
  };
  // Get random background color for users
  const randomNum = firstAlpha
    ? (firstAlpha.charCodeAt(0) + name.length) % Object.keys(rgbColors).length
    : 0;

  return (
    <div
      className="user-icon"
      style={{
        background: `${rgbColors[randomNum]}`,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'inline-block',
        textAlign: 'center',
        lineHeight: '40px',
        margin: '0px 5px'
      }}
    >
      {firstAlpha ? firstAlpha : name[0]}
    </div>
  );
};

export default UserIcon;
