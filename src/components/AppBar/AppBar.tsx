import React from "react";
import { CommandBar, ICommandBarItemProps } from "@fluentui/react";

const AppBar: React.FC = () => {
  const items: ICommandBarItemProps[] = [
    { key: "file", text: "File" },
    { key: "edit", text: "Edit" },
    { key: "view", text: "View" },
    { key: "help", text: "Help" },
  ];

  return (
    <div style={{ borderBottom: "1px solid #ccc" }}>
      <CommandBar items={items} />
    </div>
  );
};

export default AppBar;
