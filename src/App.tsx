import "./App.css";
import React from "react";
import Stack from "react-bootstrap/Stack";
import { Sidebar } from "./components/SideBar/Sidebar";
import { Switch } from "./components/Switch/Switch";
import { CalculatorWrapper } from "./components/CalculatorWrapper/CalculatorWrapper";

function App() {
  return (
    <Stack className="vh-100 user-select-none" direction="horizontal">
      <Stack bsPrefix="sidebar">
        <Sidebar />
      </Stack>
      <Stack bsPrefix="canvas">
        <Switch />
        <CalculatorWrapper />
      </Stack>
    </Stack>
  );
}

export default App;
