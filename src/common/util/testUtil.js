import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

export function getComponentTree(component) {
  const wrapper = shallow(component);
  const shallowComponent = wrapper.dive();
  return toJson(shallowComponent);
}
export function getWrapper(component) {
  const wrapper = shallow(component);
  return wrapper;
}
