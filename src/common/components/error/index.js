import React from "react";

export default function CustomError(props) {
  return (
    <div style={{ color: "red" }}>
      {props.error ? props.error.message : "Something went wrong"}
    </div>
  );
}
