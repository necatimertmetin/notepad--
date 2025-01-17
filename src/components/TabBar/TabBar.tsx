import React from "react";
import { Pivot, PivotItem } from "@fluentui/react";

const TabBar: React.FC = () => {
  return (
    <Pivot>
      <PivotItem headerText="Untitled 1" />
      <PivotItem headerText="Untitled 2" />
      <PivotItem headerText="+" />
    </Pivot>
  );
};

export default TabBar;
