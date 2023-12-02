import Navbar from './Navbar'
import Article from './Article'
import Footer from './Footer'
import './HistoryHandler'
import { useState, createContext } from 'react';

export const ContentContext = createContext();

function App() {
  const [ContentState = {Content: null, ContentTitle: null, 'theme': '', 'UpdateImgLightArray': new Array}, setContent] = useState();

  return (
    <ContentContext.Provider value={{ ContentState, setContent }}>
    <Navbar/>
    <Article/>
    <Footer>Made with TroyWare</Footer>
    </ContentContext.Provider>
  )
}
export default App
