<template>
  <div class="loader">
    <div class="loader__text">
      Loading...
    </div>
  </div>
</template>

<style lang="css">
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loader:before {
  content: '';
  position: absolute;
  background-color: #ffffff;
  opacity: 0.6;
  z-index: 1;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.loader__text {
  z-index: 1;
  font-size: 32px;
}
</style>
