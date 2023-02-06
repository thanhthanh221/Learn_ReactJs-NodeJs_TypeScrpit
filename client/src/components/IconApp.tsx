import React from "react";

interface Props {
  icon: string;
}
const IconApp = ({ icon }: Props) => {
  return (
    <img
      style={{
        width: 30,
        height: 30,
        marginLeft: 10,
        marginRight: 10,    
      }}
      src={icon}
    />
  );
};

export default IconApp;
