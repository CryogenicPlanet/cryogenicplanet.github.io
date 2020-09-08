// @ts-nocheck
import React, { Component, Fragment } from 'react';


class Typewriter extends Component<{ screenWidth: number, isMobile: boolean }> {
  state = {
    screenWidth: this.props.screenWidth,
    isMobile: this.props.isMobile,
  };
  setupTypewriter(t) {
    var HTML = t.innerHTML;

    t.innerHTML = "";

    var cursorPosition = 0,
      tag = "",
      writingTag = false,
      tagOpen = false,
      typeSpeed = 100,
      tempTypeSpeed = 0;

    var type = function () {
      if (writingTag === true) {
        tag += HTML[cursorPosition];
      }

      if (HTML[cursorPosition] === "<") {
        tempTypeSpeed = 0;
        if (tagOpen) {
          tagOpen = false;
          writingTag = true;
        } else {
          tag = "";
          tagOpen = true;
          writingTag = true;
          tag += HTML[cursorPosition];
        }
      }
      if (!writingTag && tagOpen) {
        // @ts-ignore
        tag.innerHTML += HTML[cursorPosition];
      }
      if (!writingTag && !tagOpen) {
        if (HTML[cursorPosition] === " ") {
          tempTypeSpeed = 0;
        } else {
          tempTypeSpeed = Math.random() * typeSpeed + 50;
        }
        t.innerHTML += HTML[cursorPosition];
      }
      if (writingTag === true && HTML[cursorPosition] === ">") {
        tempTypeSpeed = Math.random() * typeSpeed + 50;
        writingTag = false;
        if (tagOpen) {
          var newSpan = document.createElement("span");
          t.appendChild(newSpan);
          newSpan.innerHTML = tag;
          // @ts-ignore
          tag = newSpan.firstChild;
        }
      }

      cursorPosition += 1;
      if (cursorPosition < HTML.length - 1) {
        setTimeout(type, tempTypeSpeed);
      }
    };

    return {
      type: type,
    };
  }
  sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  componentDidMount() {
    var n = 5;
    for (var i = 1; i < n + 1; i++) {
      let typewriter = document.getElementById("typewriter" + i);
      console.log(typewriter);
      // @ts-ignore
      typewriter = this.setupTypewriter(typewriter);
      // @ts-ignore
      typewriter.type();
      this.sleep(250);
    }

  }
  componentDidUpdate(prevProps) {
    if (
      this.props.screenWidth !== prevProps.screenWidth ||
      this.props.isMobile !== prevProps.isMobile
    ) {
      this.setState({
        screenWidth: this.props.screenWidth,
        isMobile: this.props.isMobile,
      });
    }
  }
  render() {
    if (this.state.screenWidth < 600) {
      var newSize = "5vw";
      var comment = document.getElementsByClassName("comment-highlight");
      comment.fontSize = newSize;
      var varHighlight = document.getElementsByClassName("var-highlight");
      varHighlight.fontSize = newSize;
      var string = document.getElementsByClassName("string-highlight");
      var normal = document.getElementsByClassName("normal-highlight");
      normal.fontSize = newSize;
      string.fontSize = newSize;
      console.log("Changing Size");
    }
    return (
      <Fragment>
        <pre
          id="typewriter1"
          className="typewriter"
          style={{ overflowX: "hidden;" }}
        >
          <span className="comment-highlight">class</span>
          <span className="var-highlight"> RahulTarak</span>
          <span className="comment-highlight">
            {" "}
            implements SoftwareEngineer, Filmmaker{" "}
          </span>
          &#123;;
        </pre>
        <pre
          id="typewriter2"
          className="typewriter"
          style={{ overflowX: "hidden;" }}
        >
          <span className="comment-highlight">private String</span>
          <span className="var-highlight"> programmingExperience </span>=
          <span className="string-highlight"> "7 years";</span>
        </pre>
        <pre
          id="typewriter3"
          className="typewriter"
          style={{ overflowX: "hidden;" }}
        >
          <span className="comment-highlight">private String</span>
          <span className="var-highlight"> location </span>={" "}
          <span className="string-highlight"> ["Toronto", "Bangalore"]</span>;;
        </pre>
        <pre
          id="typewriter4"
          className="typewriter"
          style={{ overflowX: "hidden;" }}
        >
          <span className="comment-highlight">private String</span>
          <span className="var-highlight"> currentProject </span>={" "}
          <span className="string-highlight"> videotranscode.space </span>;;
        </pre>
        <pre
          id="typewriter5"
          className="typewriter"
          style={{ overflowX: "hidden;" }}
        >
          <span className="comment-highlight">Object</span>
          <span className="var-highlight"> website </span>={" "}
          <span className="string-highlight"> 'Under Construction'</span>;;
        </pre>
      </Fragment>
    );
  }
}

export default Typewriter