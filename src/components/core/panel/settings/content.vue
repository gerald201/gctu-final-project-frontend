<template>
  <div
    id="w-core-panel-settings-content"
    :style="{
      '--w-appContent-content-size': `min(calc(100% - (${$store.getters['SYSTEM/GLOBAL/contentGutter']} * 2)), var(--w-system-responsive-break-point-lg))`,
      '--w-appContent-gutter-size': 'calc(0.5 * (100% - var(--w-appContent-content-size)))',
      '--content-gutter': $store.getters['SYSTEM/GLOBAL/contentGutter']
    }"
  >
    <div class="body">
      <div class="content">
        <AccordionComponent class="settings-group">
          <template #label>
            <div class="settings-label">
              Account
            </div>
          </template>
          <div
            class="settings-content email-verification"
          >
            <!-- v-if="!$store.getters['AUTHENTICATION/userEmailIsVerified']" -->
            <div class="title">
              Verify Email
            </div>
            <div class="text">
              Your email has not yet been verified. Click the button below to recieve a verification message.
            </div>
            <ButtonActionComponent class="button">
              Send Verification Message
            </ButtonActionComponent>
          </div>
        </AccordionComponent>
      </div>
    </div>
  </div>
</template>

<script>
import AccordionComponent from '@/components/accordion.vue';
import ButtonActionComponent from '@/components/button/action.vue';

export default {
  components: {
    AccordionComponent,
    ButtonActionComponent
  },
  name: 'WCorePanelSettingsContent',
  setup() {

  }
}
</script>

<style lang="scss" scoped>
#w-core-panel-settings-content {
  position: absolute;
  right: 0px;
  width: 100%;
  z-index: 1;

  & > .body {
    overflow-x: hidden;
    padding: var(--content-gutter) var(--w-appContent-gutter-size);
    position: absolute;
    right: 0px;
    top: 4rem;
    width: 100%;
    z-index: 1;

    & > .content {
      width: 100%;

      & > .settings-group {
        padding-left: 0px;
        padding-right: 0px;
      }
    }
  }

  .settings-label {
    font-weight: bold;
    text-decoration: underline;
  }
  .settings-content {
    padding: 0.75rem 0px;
    width: 100%;

    &.email-verification {
      & > .title {
        font-weight: bold;
      }
      & > .text {
        font-size: 0.9rem;
      }
      & > .button {
        padding: 1rem 0px 0px;
        width: 100%;
      }
    }
  }
}
</style>