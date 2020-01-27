
import React, { Component,Fragment } from 'react';
import './animation.css';
import anime from './anime-master/lib/anime.es.js';

class Animator extends Component {
  state = { pathIndex: 0 };
  componentDidMount() {
    const staggerVisualizerEl = document.querySelector('.stagger-visualizer');
    const fragment = document.createDocumentFragment();
    const numberOfElements = 81;
  
    for (let i = 0; i < numberOfElements; i++) {
      fragment.appendChild(document.createElement('div'));
    }
  
    staggerVisualizerEl.appendChild(fragment);
  
    const staggersAnimation = anime.timeline({
      targets: '.stagger-visualizer div',
      easing: 'easeInOutSine',
      delay: anime.stagger(50),
      loop: true,
      autoplay: false,
      duration: 600,
      loopComplete: (a) => console.log('end'),
      //update: () => console.log(staggersAnimation.progress)
    })
    .add({
      scale: anime.stagger([2.5, 1], {from: 'center', grid: [9, 9]}),
      translateX: anime.stagger([-100, 100]),
      rotate: anime.stagger([-45, 45]),
      easing: 'easeInOutCirc',
      delay: anime.stagger(10, {from: 'center'})
    })
    .add({
      scale: anime.stagger([2.5, 1], {from: 'center', easing: 'easeInOutCirc'}),
      translateX: anime.stagger([-200, 200]),
      translateY: anime.stagger([-200, 200]),
      rotate: 0,
      delay: anime.stagger(1, {from: 'last'})
    })
    .add({
      rotate: anime.stagger(2, {from: 'center', direction: 'reverse', easing: 'easeInSine'}),
      translateX: 0,
      translateY: 0,
      delay: anime.stagger(10, {from: 'center'})
    })
    .add({
      scale: anime.stagger([2, 1], {grid: [9, 9], axis: 'y'}),
      translateY: anime.stagger([-100, 200], {grid: [9, 9], axis: 'y'}),
      rotate: 0,
      delay: anime.stagger(1, {from: 'last'})
    })
    .add({
      translateX: () => anime.random(-100, 100),
      translateY: () => anime.random(-100, 100),
      scale: anime.stagger([1.5, .5], {from: 'center'}),
      rotate: anime.stagger([10, -10], {from: 'last'}),
      delay: anime.stagger(50, {from: 'center', grid: [9, 9]}),
    })
    .add({
      translateX: () => anime.random(-100, 100),
      translateY: () => anime.random(-100, 100),
      rotate: anime.stagger([-10, 10], {from: 'last'}),
      scale: 1,
      delay: anime.stagger(50, {from: 'center', grid: [9, 9]}),
    })
    .add({
      translateX: 0,
      translateY: anime.stagger(6, {from: 'center', direction: 'reverse'}),
      rotate: 0,
      delay: anime.stagger(50, {from: 'center', grid: [9, 9]}),
    })
    .add({
      translateX: anime.stagger('1rem', {grid: [9, 9], from: 'center', axis: 'x'}),
      //translateY: anime.stagger('1rem', {grid: [9, 9], from: 'center', axis: 'y'}),
      delay: anime.stagger(200, {grid: [9, 9], from: 'center', direction: 'reverse'})
    })
    .add({
      translateX: anime.stagger([25, -25], {from: 'first'}),
      translateY: 0,
      rotate: anime.stagger([40, -40], {from: 'first'}),
      delay: anime.stagger(10, {from: 'first'}),
    })
    .add({
      translateY: anime.stagger([-240, 240]),
      rotate: () => anime.random(-100, 100),
      scale: anime.stagger([1, 3], {from: 'center'}),
      delay: anime.stagger(10, {from: 0}),
    })
    .add({
      translateX: 0,
      translateY: 0,
      scale: 1,
      rotate: 360,
      duration: 2000,
      delay: 0,
    });
  
    staggersAnimation.play();
  }
  render() {
    return (
      <Fragment>
        <div class="stagger-visualizer"></div>
      </Fragment>
    );
  }
}

class NameDrawer extends Component{
    componentDidMount(){
        console.log("Called nameDrawer")
        const svgPath = document.querySelectorAll('.path');

const svgText = anime({
  targets: svgPath,
  loop: true,
  direction: 'alternate',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 700,
  delay: (el, i) => { return i * 500 }
});
// Wrap every letter in a span
var textWrapper = document.querySelector('.ml11 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml11 .line',
    scaleY: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 700
  })
  .add({
    targets: '.ml11 .line',
    translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
    easing: "easeOutExpo",
    duration: 700,
    delay: 100
  }).add({
    targets: '.ml11 .letter',
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=775',
    delay: (el, i) => 34 * (i+1)
  }).add({
    targets: '.ml11',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 10000
  });
    }
    render(){
        return(
            <Fragment>
            <h1 class="ml11">
  <span class="text-wrapper">
    <span class="line line1"></span>
    <span class="letters" style={{color : "#fff",textAlign: 'center' }}>Hello, I'm Rahul Tarak</span>
  </span>
</h1>  
</Fragment>                  
    )}

}

export {NameDrawer, Animator};


