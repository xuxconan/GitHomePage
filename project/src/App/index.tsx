import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import "./styles/index@default.sass";

export default defineComponent(
  (props) => {
    return () => {
      return <RouterView />;
    };
  },
  {
    props: [],
  }
);
