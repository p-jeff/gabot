import { Suspense, useEffect, useState } from 'react';
import React from 'react';
import './App.css';
import { EAT, EXPERIENCE, COMMUNICATE, AM, LOOKLIKE, FEEL, MOVE } from './text/ENGLISH.js';
import { Typewriter } from 'react-typewriting-effect'
import 'react-typewriting-effect/dist/index.css'
//https://github.com/tanmaylaud/react-typewriting-effect
//https://codesandbox.io/s/react-hooks-navigate-list-with-keyboard-eowzo?file=/src/index.js:713-894

let RESTART = [{ id: 1, tag: "", fullText: "error" },
{ id: 2, tag: "Thank You! Restart?", fullText: "error" },
{ id: 3, tag: "", fullText: "error" }
]

function getThreeEntries(OBJECT) {
  OBJECT = OBJECT.sort(() => Math.random() - 0.5);
  OBJECT = OBJECT.slice(0, 3)
  return OBJECT
}

const useKeyPress = function (targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  });

  return keyPressed;
};

let items

const ListItem = ({ item, active, setSelected, setHovered }) => (
  <div
    className={`${active ? "selectionButton focus" : "selectionButton"}`}
    onClick={() => setSelected(item)}
    onMouseEnter={() => setHovered(item)}
    onMouseLeave={() => setHovered(undefined)}
  >
    {item.tag}
  </div>
);

const ListExample = () => {
  const [selected, setSelected] = useState(undefined);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const rPress = useKeyPress("r");
  const nPress = useKeyPress("n")
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState(undefined);

  const [menu, setMenu] = useState(getThreeEntries(EAT));
  const [property, setProperty] = useState('eat');

  const [eat, setEat] = useState("");
  const [eatRender, setEatRender] = useState(false);

  const [swim, setSwim] = useState("");
  const [swimRender, setSwimRender] = useState(false);

  const [experience, setExperience] = useState("");
  const [experienceRender, setExperienceRender] = useState(false);

  const [communicate, setCommunicate] = useState("");
  const [communicateRender, setCommunicateRender] = useState(false);

  const [am, setAm] = useState("");
  const [amRender, setAmRender] = useState(false);

  const [lookLike, setLookLike] = useState("");
  const [lookLikeRender, setLookLikeRender] = useState(false);

  const [feel, setFeel] = useState("");
  const [feelRender, setFeelRender] = useState(false);

  const [current, setCurrent] = useState(EAT)

  items = menu;

  function clickHandler(next) {
    console.log(next)
    if (property === 'eat') {
      setEat(next)
      setEatRender(true)
      setMenu(getThreeEntries(MOVE))
      setCurrent(MOVE)
      setProperty('swim')
    }

    else if (property === 'swim') {
      setSwim(next)
      setSwimRender(true)
      setMenu(getThreeEntries(EXPERIENCE))
      setCurrent(EXPERIENCE);
      setProperty('experience')
    }

    else if (property === 'experience') {
      setExperience(next)
      setExperienceRender(true)
      setMenu(getThreeEntries(COMMUNICATE))
      setCurrent(COMMUNICATE)
      setProperty('communicate')
    }

    else if (property === 'communicate') {
      setCommunicate(next)
      setCommunicateRender(true)
      setCurrent(AM)
      setMenu(getThreeEntries(AM))
      setProperty('am')
    }
    else if (property === 'am') {
      setAm(next)
      setAmRender(true)
      setMenu(getThreeEntries(FEEL))
      setCurrent(FEEL)
      setProperty('feel')
    }
    else if (property === 'feel') {
      setFeel(next)
      setFeelRender(true)
      setMenu(getThreeEntries(LOOKLIKE))
      setCurrent(LOOKLIKE)
      setProperty('looklike')
    }
    else if (property === 'looklike') {
      setLookLike(next)
      setLookLikeRender(true)
      setMenu(RESTART)
      setProperty('restart')
    }

    else if (property === 'restart') {
      window.location.reload();
    }

    else { window.location.reload(); }
  }

  useEffect(() => {
    if (items.length && downPress) {
      setCursor(prevState =>
        prevState < items.length - 1 ? prevState + 1 : prevState
      );
    }
  }, [downPress]);
  useEffect(() => {
    if (items.length && upPress) {
      setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);
  useEffect(() => {
    if (items.length && enterPress) {
      setSelected(items[cursor]);
      clickHandler(items[cursor].fullText);
    }
  }, [cursor, enterPress]); // DO NOT CHANGE; BREAKS CODE
  useEffect(() => {
    if (items.length && hovered) {
      setCursor(items.indexOf(hovered));
    }
  }, [hovered]);
  useEffect(() => {
    if (items.length && rPress) {
      setMenu(getThreeEntries(current));
    }
  }, [rPress]);
  useEffect(() => {
    if (items.length && nPress) {
      window.location.reload();
    }
  }, [nPress]);

  return (
    <div>
      <div className='nav'>
        {items.map((item, i) => (
          <ListItem
            key={item.id}
            active={i === cursor}
            item={item}
            setSelected={setSelected}
            setHovered={setHovered}
          />
        ))}
      </div>

      <div className='glass'>
        <Text text={"I am a Gaboniontum, I eat"} />
        {eatRender ? <Text text={eat + " I Move"} /> : <div />}
        {swimRender ? <Text text={swim + " I experience"} /> : <div />}
        {experienceRender ? <Text text={experience + "I communicate"} /> : <div />}
        {communicateRender ? <Text text={communicate + " I am"} /> : <div />}
        {amRender ? <Text text={am + " I feel"} /> : <div />}
        {feelRender ? <Text text={feel + " I look like"} /> : <div />}
        {lookLikeRender ? <Text text={lookLike} /> : <div />}
      </div>
    </div>
  );
};

function Text(props) {
  return (<a className='text'> <Typewriter string={props.text} delay={30} cursor='' /> </a>)
}

function App() {
  return (
    <div>
      < div >
        <div className="video-wrapper">
          <video src="video.mp4" className='video' autoPlay muted />
        </div>
        <div className='backdropFade' />
      </div >
      <div className='container'>
        < ListExample />
      </div>
    </div>


  )
}

export default App;


/*
  

 <video autoPlay src='Gaboniv3.mp4' className='video' alt='bg' />




        <div className='nav' tabIndex={0} >
          <NavigationChild yIndex={2} tag={menu[0][0]} />
          <NavigationChild yIndex={1} tag={menu[1][0]} />
          <NavigationChild yIndex={0} tag={menu[2][0]} />
        </div>
      </div >
    </div> 
*/



/*<ArrowNavigation className='selectionBox' >
          <NavigationChild xIndex={0} yIndex={0} />
          <NavButton tag={menu[0][0]} onClick={() => clickHander(menu[0][1])} xIndex='0' yIndex='0' />
          <NavButton tag={menu[0][0]} onClick={() => clickHander(menu[0][1])} xIndex='1' yIndex='0' />
          <NavButton tag={menu[0][0]} onClick={() => clickHander(menu[0][1])} xIndex='0' yIndex='1' />
        </ArrowNavigation> */