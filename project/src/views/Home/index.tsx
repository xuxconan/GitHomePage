import { defineComponent, h } from "vue";

export default defineComponent(
  (props) => {
    return () => {
      return h("div", "Home");
    };
  },
  {
    props: [],
  }
);
