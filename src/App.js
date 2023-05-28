import React, { useState, createContext, useRef, useEffect } from 'react';
import './App.css';
import Tile from './Tile';
import data from './data.json';
import itachiImage from './pfp.jpg';
import { Sun, Moon } from 'react-feather';

const ThemeContext = createContext();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const titleRef = useRef(null);
  //const [imageSize, setImageSize] = useState(0); // why are you updating the state of an image? this is not needed.
  const [areTilesVisible, setAreTilesVisible] = useState(true);
  const [tileColors, setTileColors] = useState([]);
  const [tileSizes, setTileSizes] = useState({});

  // useEffect(() => {
  //   if (titleRef.current) {
  //     const titleHeight = titleRef.current.offsetHeight;
  //     setImageSize(titleHeight);
  //   }
  // }, []); // useEffect here was unnecessary

  useEffect(() => {
    setTileSizes(generateTileSizes());
  }, [areTilesVisible]);

  const generateTileSizes = () => {
    const minSize = 50;
    const maxSize = 200;
    const sizes = {};
    data.tiles.forEach((tile, index) => {
      const size = Math.floor(Math.random() * (maxSize - minSize + 1) + minSize);
      sizes[index] = `${size}px`;
    });
    return sizes;
  };

  const handleTitleClick = () => {
    setAreTilesVisible(!areTilesVisible); // Toggle the visibility of tiles
  };

  const shuffleColors = () => {
    const shuffledColors = data.tiles.map(() => getRandomColor());
    setTileColors(shuffledColors);
  };
  
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  // const imageStyle = {
  //   height: `${imageSize}px`,
  //   width: `${imageSize}px`,
  //   marginRight: '10px', // Add margin to create space between image and text
  // }; // All the styles should always separately be in styles folder

  return (
    <ThemeContext.Provider value={isDarkMode}>
      <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
        <header className="header">
          <div className="title">
            <img style={{height: '40px', width: '40px'}} className="portrait" src={itachiImage} alt="Portrait" />
            <span style={{marginLeft: '20px'}} ref={titleRef} onClick={handleTitleClick}>
              Tejas Kothari
            </span>
            {/* Wrap Tejas Kothari in a span */}
          </div>
          <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <Moon size='30px' color="#D3D3D3" /> : <Sun size='30px' color="#E8A317" />}
          </button>
        </header>
        <div className="tile-container">
          {areTilesVisible &&
            data.tiles.map((tile, index) => (
              <Tile
                key={index}
                tileName={tile.tileName}
                content={tile.content}
                isSquare={tile.isSquare}
                color={tileColors[index] || tile.color} // Use the shuffled color if available
                shuffleColors={shuffleColors} // Pass the shuffleColors function
                tileSize={tileSizes[index]}
              />
            ))}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
export { ThemeContext };
