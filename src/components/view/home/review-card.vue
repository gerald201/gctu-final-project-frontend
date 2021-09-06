<template>
  <div class="wabisque-view-home-review-card">
    <div class="card">
      <div class="title">
        <slot name="title"/>
      </div>
      <div class="text">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum aliquid esse eligendi hic assumenda, ad accusamus maxime molestiae.
      </div>
      <div class="details">
        <div class="avatar">
          <slot name="avatar"/>
        </div>
        <div class="text">
          <div class="name">
            <slot name="name"/>
          </div>
          <div class="role">
            <slot name="role"/>
          </div>
        </div>
        <svg
          class="stars"
          height="11"
          width="69"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M62.53-.004l1.89 3.572 4.107.628-2.94 2.835.65 3.96-3.706-1.819-3.706 1.82.65-3.96-2.94-2.836 4.107-.628zm-14 0l1.89 3.572 4.107.628-2.94 2.835.65 3.96-3.706-1.819-3.706 1.82.65-3.96-2.94-2.836 4.107-.628zm-14 0l1.89 3.572 4.107.628-2.94 2.835.65 3.96-3.706-1.819-3.706 1.82.65-3.96-2.94-2.836 4.107-.628zm-14 0l1.89 3.572 4.107.628-2.94 2.835.65 3.96-3.706-1.819-3.706 1.82.65-3.96-2.94-2.836 4.107-.628zm-14 0l1.89 3.572 4.107.628-2.94 2.835.65 3.96L6.53 9.172l-3.706 1.82.65-3.96-2.94-2.836 4.107-.628z"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {name: 'WabisqueViewHomeReviewCard'}
</script>

<style lang="scss" scoped>
.wabisque-view-home-review-card {
  padding: 0.5rem;

  & > .card {
    border: 1px solid rgba(var(--w-color-mute), 1);
    border-radius: 5px;
    padding: 1rem;
    transition-property: border;
    width: 100%;

    & > .title {
      font-size: 1.2rem;
      font-weight: bold;
      padding-bottom: 1rem;
    }
    & > .details {
      align-items: center;
      display: flex;
      padding-top: 1rem;

      & > .text {
        padding: 0px 0.5rem;

        & > .name {
          font-weight: bold;
        }
        & > .role {
          color: rgba(var(--w-color-mute), 1);
          font-size: 0.9rem;
        }
      }
      & > .stars > * {
        fill: rgba(var(--w-color-primary), 1);
        stroke: rgba(var(--w-color-primary), 1);
        transition-property: fill, strokes;
      }
    }    
  }
}
</style>