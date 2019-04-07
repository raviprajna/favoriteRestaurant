import React from "react";
import Error from "../";
import { getComponentTree } from "../../../util/testUtil.js";

describe("<Error /> Component Test", () => {
  it("renders <Error /> no props component", () => {
    expect(getComponentTree(<Error />)).toMatchSnapshot();
  });

  it("renders <Error /> component with error object as props ", () => {
    expect(
      getComponentTree(<Error error={{ message: "Error !!" }} />)
    ).toMatchSnapshot();
  });
});
