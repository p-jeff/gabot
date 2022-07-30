import { useState } from 'react';
import './App.css';
import EAT from './text/eat';
import SWIM from './text/swim';
import { Typewriter } from 'react-typewriting-effect'
import 'react-typewriting-effect/dist/index.css'
//https://github.com/tanmaylaud/react-typewriting-effect
import { ArrowNavigation, useArrowNavigation } from 'react-arrow-navigation'
//https://www.npmjs.com/package/react-arrow-navigation

function Text(props) {
  return (<a className='text'> <Typewriter string={props.text} delay={80} cursor='' /> </a>)
}

const NavigationChild = ({ xIndex, yIndex }) => {
  const { selected, active } = useArrowNavigation(xIndex, yIndex)
  return (
    <div className={selected && active ? 'selectionButton selected' : 'selectionButton'}>
      {`Index [${xIndex}, ${yIndex}]`}
    </div>
  )
}

function App() {
  const [menu, setMenu] = useState(EAT);
  const [property, setProperty] = useState('eat')

  const [eat, setEat] = useState("");
  const [eatRender, setEatRender] = useState(false)

  const [swim, setSwim] = useState("");
  const [swimRender, setSwimRender] = useState(false)

  function clickHander(next) {
    console.log('click')
    if (property === 'eat') {
      setEat(next)
      setEatRender(true)
      setMenu(SWIM)
      setProperty('swim')
    }

    else if (property === 'swim') {
      setSwim(next)
      setSwimRender(true)
    }

    else { console.log('error') }
  }

  return (
    <>
      <div>
        <div className="video-wrapper">
          <img src='img.png' className='video' />
        </div>
        <div className='backdropFade' />
      </div>

      <div className='container'>
        <ArrowNavigation className="nav">
          <NavigationChild xIndex={0} yIndex={0} onKeyPressed={() => clickHander(menu[0][1])} />
          <NavigationChild xIndex={0} yIndex={1} />
          <NavigationChild xIndex={0} yIndex={2} />
        </ArrowNavigation>

        <div className='glass'>
          <Text text={"I am a Gabonionta, I "} />
          {eatRender ? <Text text={eat + ". I Move"} /> : <div />}
          {swimRender ? <Text text={swim} /> : <div />}
        </div>
      </div >
    </>
  )
}

export default App;


/*<ArrowNavigation className='selectionBox' >
          <NavigationChild xIndex={0} yIndex={0} />
          <NavButton tag={menu[0][0]} onClick={() => clickHander(menu[0][1])} xIndex='0' yIndex='0' />
          <NavButton tag={menu[0][0]} onClick={() => clickHander(menu[0][1])} xIndex='1' yIndex='0' />
          <NavButton tag={menu[0][0]} onClick={() => clickHander(menu[0][1])} xIndex='0' yIndex='1' />
        </ArrowNavigation> */