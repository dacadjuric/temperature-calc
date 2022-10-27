import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import styled from "styled-components";

const Verdict = styled.p`
  color: red;
  text-align: center;
  font-size: 22px;
  font-weight: 666;
`;

function BoilingVerdict(props) {
 
  if (props.celsius >= 100) {
    return <Verdict>The water would boil.</Verdict>;
  }else if(props.celsius <= 99){
    return <Verdict>The water would not boil.</Verdict>;
  } else if( props.celsius !== Number){
    return <Verdict> Please enter a number.</Verdict>
  }
  return '';
}

const ParentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  background-color: black;
  margin-top:  124px;
`;

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.state = { temperature: "", scale: "c" };

    console.log(this);
  }

  handleCelsiusChange(temperature) {
    this.setState({ scale: "c", temperature });
    console.log(this);
  }

  handleFahrenheitChange = (temperature) => {
    this.setState({ scale: "f", temperature });
    console.log(this);
  };

  render() {
    const temperature = this.state.temperature;
    const scale = this.state.scale;

    // console.log(temperature + "calc");
    const celsius =
      scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit =
      scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }

  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

const scaleName = {
  c: "Celsius",
  f: "Fahrenheit",
};

const FieldBorder = styled.fieldset`
  border-color: red;
  margin-top: 22px;
  color: yellow;
`;

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
    console.log(this.props);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;

    console.log(temperature);
    return (
      <FieldBorder>
        <legend>Enter temperature in {scaleName[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </FieldBorder>
    );
  }
}

function FancyBorder(props)
{
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog(){
  return(
    <FancyBorder color="red">
      <h1 className="Dialog-title">Welcome</h1>
      <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
    </FancyBorder>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ParentDiv> <Calculator /> </ParentDiv>);
// root.render(<WelcomeDialog />);
