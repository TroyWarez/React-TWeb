import terminalIcon from '/terminal.svg'
import Navbar from './Navbar'
import Article from './Article'
function App() {
  return (
    <>
   
    <h1>Troy's Domain <img src={terminalIcon} alt='terminalIcon'/></h1>
    <Navbar></Navbar>
    <Article></Article>
    </>
  )
}

export default App
