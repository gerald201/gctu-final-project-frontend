<template>
  <div class="wabisque-view-home-statistics-item">
    <div class="content-wrapper">
      <div class="number">
        <slot name="number"/>
      </div>
      <div class="icon">
        <slot name="icon"/>
      </div>
      <div class="title">
        <slot name="title"/>
      </div>
      <div class="text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, perferendis?
      </div>
    </div>
  </div>
</template>

<script>
export default {name: 'WabisqueViewHomeStatisticsItem'}
</script>

<style lang="scss" scoped>
.wabisque-view-home-statistics-item {
  overflow: hidden;
  width: 100%;

  & > .content-wrapper {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: 3fr 2fr;
    margin: 0px auto;
    max-width: 22rem;
    width: 100%;

    & > .number {
      align-items: center;
      color: rgba(var(--w-color-primary), 1);
      display: flex;
      font-size: 3.5rem;
      font-weight: bold;
      justify-content: center;
    }
    & > .icon {
      width: 100%;

      & > :deep(svg) {
        height: 100%;
        max-width: 5rem;
        object-fit: contain;
        object-position: center;
        width: 100%;

        & * {
          fill: rgba(var(--w-color-white), 1);
          stroke: rgba(var(--w-color-white), 1);
          transition-property: fill, stroke;
        }
      }
    }
    & > .title {
      color: rgba(var(--w-color-white), 1);
      font-size: 1.2rem;
      font-weight: bold;
      grid-column: 1 / -1;
    }
    & > .text {
      color: rgba(var(--w-color-gray-level1), 1);
      grid-column: 1 / -1;
    }
  }
}
</style>