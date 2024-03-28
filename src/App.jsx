import Landing from './assets/Landing.jsx';
import Izbor from './assets/Izbor.jsx';
import Prijem from './assets/Prijem.jsx';
import Lekar from './assets/Lekar.jsx'; 
import Psihijatar from './assets/Psihijatar.jsx';
import React, {useState, useCallback } from 'react';

function App() {

  const [showComponent, setShowComponent] = useState(null);

  const handleLinkClick = useCallback((component) => {
    setShowComponent(component);
  }, [showComponent]);

  const renderComponent = () => {
    console.log(showComponent)
    switch (showComponent) {
      case 'Prijem':
        return <Prijem />;
      case 'Lekar':
        return <Lekar />;
      case 'Psihijatar':
        return <Psihijatar />;
      case 'Izbor':
        return <Izbor onLinkClick={handleLinkClick}/>;
      default:
        return <Landing onLinkClick={handleLinkClick}/>;
    }
  };

  return(
    <>
    {renderComponent()}
    </>
  );
}

export default App
