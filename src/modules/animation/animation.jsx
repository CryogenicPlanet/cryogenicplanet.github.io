import React, { Component,Fragment } from 'react';
import {Row,Col} from 'antd';
import './animation.css';
import anime from './anime-master/lib/anime.es.js';

class Animator extends Component {
  state = { pathIndex: 0, screenWidth : this.props.screenWidth, isMobile : this.props.isMobile };
  componentDidUpdate(prevProps){
    if((this.props.screenWidth !== prevProps.screenWidth)||(this.props.isMobile !== prevProps.isMobile)){
      this.setState({
        screenWidth : this.props.screenWidth,
        isMobile : this.props.isMobile
      })
    }
  }
  componentDidMount() {
    if((this.state.screenWidth > 600)&&(this.state.isMobile === false)){
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
}

  render() {
    return (
      <Fragment>
        <div>{this.state.screenWidth > 600 && this.state.isMobile === false ?  
        <Row  type="flex" justify="center" align="middle">
        <Col span={16}>
        <div class="stagger-visualizer"></div>
        </Col>
        </Row>
        : <p></p> }</div>
      </Fragment>
    );
  }
}

class NameDrawer extends Component{
  state = {
    screenWidth : this.props.screenWidth,
    isMobile : this.props.isMobile
  }
  componentDidUpdate(prevProps){
    if((this.props.screenWidth !== prevProps.screenWidth)||(this.props.isMobile !== prevProps.isMobile)){
      this.setState({
        screenWidth : this.props.screenWidth,
        isMobile : this.props.isMobile
      })
    }
  }
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
var textWrapper = document.querySelectorAll('.ml11 .letters');
for(var text of textWrapper){
text.innerHTML = text.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");
}
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
    translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 20],
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
              <div>
              {this.state.screenWidth > 600 && this.state.isMobile === false ? 
              
            <h1 class="ml11">
            <span class="text-wrapper">
              <span class="line line1"></span>
              <span class="letters" style={{color : "#fff",textAlign: 'center' }}>Hello, I'm Rahul Tarak</span>
            </span>
            </h1>  
            :
            <Row  type="flex" align="middle">
            <Col span={16}>
            <h1 class="ml11" style={{fontSize:"9vw"}}>
            <span class="text-wrapper">
              <span class="line line1"></span>
              <Row  type="flex" justify="center" align="middle">
              <span class="letters" style={{color : "#fff" }}>Hello, I'm </span>
              </Row>
              <Row  type="flex" justify="center" align="middle">
              <span class="letters" style={{color : "#fff" }}>Rahul Tarak</span>
              </Row>
            </span>
            </h1>
            </Col>
            </Row>  
    }
</div>
</Fragment>                  
    )}

}

class Typewriter extends Component {
  state = {
    screenWidth : this.props.screenWidth,
    isMobile : this.props.isMobile
  }
  setupTypewriter(t) {
    var HTML = t.innerHTML;
 
    t.innerHTML = "";
 
    var cursorPosition = 0,
     tag = "",
     writingTag = false,
     tagOpen = false,
     typeSpeed = 100,
     tempTypeSpeed = 0;
 
    var type = function() {
 
     if (writingTag === true) {
      tag += HTML[cursorPosition];
     }
 
     if (HTML[cursorPosition] === "<") {
      tempTypeSpeed = 0;
      if (tagOpen) {
       tagOpen = false;
       writingTag = true;
      }
      else {
       tag = "";
       tagOpen = true;
       writingTag = true;
       tag += HTML[cursorPosition];
      }
     }
     if (!writingTag && tagOpen) {
      tag.innerHTML += HTML[cursorPosition];
     }
     if (!writingTag && !tagOpen) {
      if (HTML[cursorPosition] === " ") {
       tempTypeSpeed = 0;
      }
      else {
       tempTypeSpeed = (Math.random() * typeSpeed) + 50;
      }
      t.innerHTML += HTML[cursorPosition];
     }
     if (writingTag === true && HTML[cursorPosition] === ">") {
      tempTypeSpeed = (Math.random() * typeSpeed) + 50;
      writingTag = false;
      if (tagOpen) {
       var newSpan = document.createElement("span");
       t.appendChild(newSpan);
       newSpan.innerHTML = tag;
       tag = newSpan.firstChild;
      }
     }
 
     cursorPosition += 1;
     if (cursorPosition < HTML.length - 1) {
      setTimeout(type, tempTypeSpeed);
     }
 
    };
 
    return {
     type: type
    };
   }
   sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  componentDidMount(){
    var n = 6 ;
    for (var i = 1; i < n+1; i++){
      let typewriter = document.getElementById('typewriter' + i)
      console.log(typewriter)
      typewriter = this.setupTypewriter(typewriter);
      typewriter.type()
      this.sleep(250)
    }
    
    
   // var typewriter = document.getElementById('typewriter1');
   // var Construction = document.getElementById('typewriter2')
    
   // Construction = this.setupTypewriter(Construction)
    
   // Construction.type()
  }
  componentDidUpdate(prevProps){
    if((this.props.screenWidth !== prevProps.screenWidth)||(this.props.isMobile !== prevProps.isMobile)){
      this.setState({
        screenWidth : this.props.screenWidth,
        isMobile : this.props.isMobile
      })
    }
  }
  render(){

    if(this.state.screenWidth < 600 ) {
      var newSize = "5vw"
      var comment = document.getElementsByClassName("comment-highlight");
      comment.fontSize = newSize
      var varHighlight = document.getElementsByClassName("var-highlight");
      varHighlight.fontSize = newSize
      var string = document.getElementsByClassName("string-highlight");
      var normal = document.getElementsByClassName("normal-highlight");
      normal.fontSize = newSize
      string.fontSize = newSize
      console.log("Changing Size")
    }
    return (
      <Fragment>
<pre id="typewriter1" class="typewriter" style={{overflowX: 'hidden;'}}>
<span class="comment-highlight">class</span><span class="var-highlight"> RahulTarak</span><span class="comment-highlight">  implements SoftwareEngineer, Filmmaker </span>&#123;;
</pre>
<pre id="typewriter2" class="typewriter" style={{overflowX: 'hidden;'}}>
<span class="comment-highlight">private String</span><span class="var-highlight"> programmingExperience </span>=<span class="string-highlight"> "7 years";</span>
</pre>
<pre id="typewriter3" class="typewriter" style={{overflowX: 'hidden;'}}>
<span class="comment-highlight">private String</span><span class="var-highlight"> education </span>= <span class="string-highlight"> "University of Toronto"</span>;;
</pre>
<pre id="typewriter4" class="typewriter" style={{overflowX: 'hidden;'}}>
<span class="comment-highlight">private String</span><span class="var-highlight"> degree </span>= <span class="string-highlight"> "Honors Computer Science"</span>;;
</pre>
<pre id="typewriter5" class="typewriter" style={{overflowX: 'hidden;'}}>
<span class="comment-highlight">private int</span><span class="var-highlight"> graduation </span>= <span class="string-highlight"> 2023</span>;
<span class="normal-highlight">{" }"};</span>
</pre>
<pre id="typewriter6" class="typewriter" style={{overflowX: 'hidden;'}}>
<span class="comment-highlight">Object</span><span class="var-highlight"> website </span>= <span class="string-highlight"> 'Under Construction'</span>;;
</pre>
</Fragment>
    )
  }
}

export {NameDrawer, Animator, Typewriter};


