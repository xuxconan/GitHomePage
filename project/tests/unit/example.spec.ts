import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Test from "@/Test";

// VueTestUnit官网 https://test-utils.vuejs.org/
// MochaPack+Chai的Cli说明 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-mocha
// MochaPack官网 https://sysgears.github.io/mochapack/
// Mocha官网 https://mochajs.bootcss.com/
// Chai官网 https://www.chaijs.com/

describe("Test", () => {
  it("renders props.test when passed", () => {
    const test = "Mocha";
    const wrapper = shallowMount(Test, {
      props: { test },
    });
    expect(wrapper.text()).to.include(test);
  });
});
