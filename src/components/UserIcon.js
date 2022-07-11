const UserIcon = ({ name }) => {
  let firstAlpha = (name.toUpperCase().match(/[a-zA-Z]/) || []).pop();
  const rgbColors = {
    A: '#7CB5D2',
    B: '#89C4C2',
    C: '#957DAD',
    D: '#9EC8D2',
    E: '#B4D7A2',
    F: '#B5E0DF',
    G: '#B9EAED',
    H: '#BC789E',
    I: '#D0EBC5',
    J: '#D291BC',
    K: '#DCF2EE',
    L: '#E0BBE4',
    M: '#E2EEC2',
    N: '#F1C470',
    O: '#F3F7C1',
    P: '#F3FAF1',
    Q: '#F5A2A2',
    R: '#F7EF64',
    S: '#F9D494',
    T: '#F9D4A4',
    U: '#FBD7BB',
    V: '#FCEEC5',
    W: '#FDD3E3',
    X: '#FEC8D8',
    Y: '#FFDFD3',
    Z: '#FFE5B4'
  };

  return (
    <div
      className="user-icon"
      style={{
        background: `${rgbColors[firstAlpha]}`,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'inline-block',
        textAlign: 'center',
        lineHeight: '40px',
        margin: '5px'
      }}
    >
      {firstAlpha}
    </div>
  );
};

export default UserIcon;
