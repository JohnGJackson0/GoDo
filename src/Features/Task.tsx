import React from "react";
import { Theme } from "../Theme";

const Task = (props: any) => {
  return (
    <Theme.themedContainer>
      <Theme.themedTextHighEmpasis>{props.task}</Theme.themedTextHighEmpasis>
    </Theme.themedContainer>
  );
};

export default Task;
