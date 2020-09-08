import React, { Component, Fragment } from "react";
import ReactTerminal, {
  ReactTerminalStateless,
} from "react-terminal-component";
import {
  EmulatorState,
  History,
  Outputs,
  OutputFactory,
  FileSystem,
  CommandMapping,
  defaultCommandMapping,
} from "javascript-terminal";
import { Col, Row } from "antd";

const filesystem = require("./fileStructure.json");

// const history = [
//   { value: "Welcome to the terminal!" },
//   {
//     value:
//       "This filesystem contains all my projects, feel free to explore them!",
//   },
//   { value: "Type `help` to begin" },
// ];

// const extensions = {
//   sudo: {
//     exec: ({ structure, history, cwd }) => {
//       return {
//         structure,
//         cwd,
//         history: history.concat({ value: "Nice try... (ಠ(ಠ(ಠ_ಠ)ಠ)ಠ)" }),
//       };
//     },
//   },
//   test: {
//     exec: ({ structure, history, cwd }, command) => {
//       console.log(cwd, history, command);
//       return {
//         structure,
//         cwd,
//         history: history.concat({
//           value: `Test : ${history[history.length - 1].value}`,
//         }),
//       };
//     },
//   },
// };
// const structure = {
//   ".hidden": {
//     file1: {
//       content: "The is the content for file1 in the <.hidden> directory.",
//     },
//     file2: {
//       content: "The is the content for file2 in the <.hidden> directory.",
//     },
//     dir2: {
//       file: {
//         content: "The is the content for <file> in the <.hidden> directory.",
//       },
//     },
//     ".secrets": { content: "I'm still afraid of the dark..." },
//   },
//   public: {
//     file1: {
//       content: "The is the content for file1 in the <public> directory.",
//     },
//     file2: {
//       content: "The is the content for file2 in the <public> directory.",
//     },
//     file3: {
//       content: "The is the content for file3 in the <public> directory.",
//     },
//   },
//   "README.md": {
//     content:
//       "✌⊂(✰‿✰)つ✌ Thanks for checking out the tool! There is a lot that you can do with react-bash and I'm excited to see all of the fun commands and projects build on top of it!",
//   },
// };

class ProjectTerminal extends Component {
  constructor() {
    super();
    const defaultState = EmulatorState.create({
      fs: FileSystem.create(),
      commandMapping: CommandMapping.create({
        ...defaultCommandMapping,
        print: {
          function: (state, opts) => {
            const input = opts.join(" ");

            return {
              output: OutputFactory.makeTextOutput(input),
            };
          },
          optDef: {},
        },
        sudo: {
          function: (state, opts) => {
            //const input = opts.join(" ");
            return {
              output: OutputFactory.makeTextOutput("Nice try xD"),
            };
          },
          optDef: {},
        },
        help: {
          function: (state, opts) => {
            //const input = opts.join(" ");
            const mapping = defaultCommandMapping;
            let keys = [];
            try {
              keys = Object.keys(mapping);
              console.log(keys);
            } catch (err) {
              console.log("Errors in keys", err);
            }
            // const keys = mapping.keys();
            // console.log(keys);
            return {
              output: OutputFactory.makeTextOutput(keys.join("\n")),
            };
          },
          optDef: {},
        },
      }),
    });
    const defaultOutputs = defaultState.getOutputs();

    const newOutputs = Outputs.addRecord(
      defaultOutputs,
      OutputFactory.makeTextOutput(
        `Welcome to the terminal! 
This filesystem contains all my projects, feel free to explore them!`
      )
    );
    const emulatorState = defaultState.setOutputs(newOutputs);
    this.state = {
      emulatorState: emulatorState,
      inputStr: `help`,
    };
  }
  render() {
    return (
      <Fragment>
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ paddingTop: "5%" }}
        >
          <Col span={12}>
            <div style={{ height: "60vh" }}>
              <ReactTerminalStateless
                emulatorState={this.state.emulatorState}
                inputStr={this.state.inputStr}
                onInputChange={(inputStr) => this.setState({ inputStr })}
                onStateChange={(emulatorState) =>
                  this.setState({ emulatorState, inputStr: "" })
                }
              />
            </div>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default ProjectTerminal;
