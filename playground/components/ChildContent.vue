<template>
  <div class="sub">ChildContent with Styling</div>
</template>

<style lang="postcss" scoped>
.sub {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 16 / 4;
  font-weight: bold;
  color: #fff;
  background: repeating-linear-gradient(
    45deg,
    #35495e,
    #35495e 10px,
    #3b8070 10px,
    #3b8070 20px
  );
}
</style>
