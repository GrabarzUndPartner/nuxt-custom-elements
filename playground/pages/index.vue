<template>
  <div>
    <github-corner :url="$config.public.githubRepoUrl" />
    <div class="logo">
      <img src="@/assets/logo.svg" alt="Nuxt Custom-Elements" />
    </div>
    <div class="container">
      <client-only>
        <custom-element-example title="Custom Title">
          Custom Slot Content<br />
          <a href="./nuxt-custom-elements/example/">Go to Real Example</a>
        </custom-element-example>
      </client-only>
    </div>
  </div>
</template>

<script setup>
import { useCustomElements } from '#imports';

const { registerEntry } = useCustomElements();

registerEntry('example');
</script>

<style lang="postcss">
.logo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 300px;
  padding: 15px;
  background: rgb(255 255 255 / 60%);
}

.logo img {
  display: block;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px 15px;
  margin: 0 auto;
  text-align: center;
}

html {
  box-sizing: border-box;
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

fieldset,
.container > fieldset {
  width: 100%;
  max-width: 640px;
  padding: 30px;
  padding-top: 0;
  color: #3b8070;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAChJREFUeNpi/P//PwM6OHv2HIYgEwORYAAVsmBzuLGxEeNQ9AxAgAEAG1wKejjL7dsAAAAASUVORK5CYII=');
  border: 1px solid #3b8070;
  border-radius: 4px;
}

fieldset legend {
  padding: 5px 15px;
  margin-bottom: 30px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  background: #3b8070;
  border: 1px solid #3b8070;
  border-radius: 4px;
}
</style>
