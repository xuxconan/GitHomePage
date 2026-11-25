<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";

// 延迟式loading（防闪显方案）：
// show()后先静默计时，超过delay或用户点击屏幕才显示——快速加载不闪显，长时间/用户点击时给反馈防"假死"感
// 显示与隐藏均为透明度缓动；hide()在静默期调用则完全不显示
const props = withDefaults(
  defineProps<{
    // 静默时长（ms），超过才显示
    delay?: number;
    // 挂载的父节点（Teleport目标）
    teleportTo?: string;
    // 是否显示遮罩
    mask?: boolean;
    // 定位方式：全屏用fixed；挂到局部容器内用absolute（容器需为定位元素）
    position?: "fixed" | "absolute";
  }>(),
  { delay: 1000, teleportTo: "body", mask: true, position: "fixed" }
);

// pending: 静默计时中（不显示）；visible: 显示中
const pending = ref(false);
const visible = ref(false);

let timer: ReturnType<typeof setTimeout> | null = null;

// 静默期内用户点击屏幕：立即显示，避免误以为卡住
const onUserActivate = () => {
  if (pending.value) display();
};

function display() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  pending.value = false;
  document.removeEventListener("pointerdown", onUserActivate);
  visible.value = true;
}

function show() {
  if (visible.value || pending.value) return;
  pending.value = true;
  document.addEventListener("pointerdown", onUserActivate);
  timer = setTimeout(display, props.delay);
}

function hide() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  pending.value = false;
  document.removeEventListener("pointerdown", onUserActivate);
  visible.value = false;
}

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
  document.removeEventListener("pointerdown", onUserActivate);
});

defineExpose({ show, hide });
</script>

<template>
  <Teleport :to="teleportTo">
    <div
      class="loading"
      :class="[`loading--${position}`, { 'loading--mask': mask, 'loading--visible': visible }]"
      role="status"
    >
      <div class="loading__content">
        <!-- 默认旋转内容，可通过默认插槽覆盖 -->
        <slot>
          <span class="loading__spinner" aria-hidden="true" />
          <span class="loading__text">加载中…</span>
        </slot>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
@import url("./styles/index@default.scss");
</style>
