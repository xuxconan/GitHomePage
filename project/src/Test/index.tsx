import { defineComponent, h } from "vue";
import "./styles/index@default.sass";

export default defineComponent(
  (props) => {
    console.log(props.test);
    return () => {
      return h("div", props.test);
    };
  },
  {
    props: ["test"],
  }
);
