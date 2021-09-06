<template>
  <div
    :class="[
      ...$store.getters['SYSTEM/GLOBAL/activeResponsiveBreakPoints']
        .map(function(breakState) {
          return `break-state:${breakState}`;
        })
    ]"
    id="w-core-module-authentication"
    :style="{
      '--primary-contrast-color': primaryContrastColor,
      '--primary-reverse-color': primaryReverseColor
    }"
  >
    <div
      class="panel-wrapper"
      v-scrollbar-directive:y
    >
      <div class="form">
        <div class="title">
          Sign In
        </div>
        <form
          class="form"
          @input="
            formChangeStates[$event.target.name] = true;
            validateForm();
          "
          @submit.prevent="submitForm();"
        >
          <InputTextComponent
            name="index"
            placeholder="Index"
            :validation="
              formErrors
                .some(function(formError) {
                  return formError.field == 'index';
                }) ? 'danger' : ''
            "
            v-model="form.index"
          >
            <template #validation-message>
              <div
                :key="`${error.field}-${error.type}`"
                v-for="
                  error in formErrors
                    .filter(function(formError) {
                      return formError.field == 'index';
                    })
                "
              >
                <b v-text="error.type"/>:
                {{error.message}}
              </div>
            </template>
          </InputTextComponent>
          <InputTextComponent
            name="password"
            password
            placeholder="Password"
            :validation="
              formErrors
                .some(function(formError) {
                  return formError.field == 'password';
                }) ? 'danger' : ''
            "
            v-model="form.password"
          >
            <template #validation-message>
              <div
                :key="`${error.field}-${error.type}`"
                v-for="
                  error in formErrors
                    .filter(function(err) {
                      return err.field == 'password';
                    })
                "
              >
                <b v-text="error.type"/>:
                {{error.message}}
              </div>
            </template>
          </InputTextComponent>
          <ButtonActionComponent>
            Sign In
            <IconComponent name="log-in"/>
          </ButtonActionComponent>
        </form>
      </div>
    </div>
    <div
      class="other-wrapper"
      v-scrollbar-directive:y="{color: primaryContrastColor}"
    >
      <div class="button-wrapper">
        <ButtonActionComponent
          appearance="flat"
          class="button"
          evened
          size="small"
          :theme-color="primaryContrastColor"
          @click="$store.commit('SYSTEM/APPLICATION/SET_ACTIVE_MODULE', 'base');"
        >
          <IconComponent name="arrow-left"/>
        </ButtonActionComponent>
      </div>
      <div class="content-wrapper">
        <div class="logo-wrapper">
          <div class="logo">
            <svg class="logo-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 254.3">
              <g class="folds">
                <polygon class="dark fold-1" points="149.67 31 117.67 95 10.34 95 42.34 31 149.67 31"/>
                <polygon class="light fold-2" points="245.67 223 138.34 223 42.34 31 149.67 31 245.67 223"/>
                <polygon class="dark fold-3" points="341.67 31 245.67 223 138.34 223 234.34 31 341.67 31"/>
                <polygon class="light fold-4" points="437.67 223 330.34 223 234.34 31 341.67 31 437.67 223"/>
                <polygon class="dark fold-5" points="501.67 95 437.67 223 330.34 223 394.34 95 501.67 95"/>
              </g>
            </svg>
          </div>
        </div>
        <div class="title">
          Hi, there!
        </div>
        <div class="text">
          Sign in and let's start building
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onActivated, onDeactivated, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import ButtonActionComponent from '@/components/button/action.vue';
import IconComponent from '@/components/icon.vue';
import InputTextComponent from '@/components/input/text.vue';
import ScrollbarDirective from '@/directives/scrollbar';
import { contrast } from '@/services/color';
import validator from '@/services/fastest-validator';

export default {
  components: {
    ButtonActionComponent,
    IconComponent,
    InputTextComponent
  },
  directives: {ScrollbarDirective},
  name: 'WCoreModuleAuthentication',
  setup() {
    const $router = useRouter();
    const $store = useStore();

    const form = reactive({
      index: '',
      password: ''
    });
    const formChangeStates = reactive({
      index: false,
      password: false
    });
    const formErrors = ref([]);
    const windowScrollY = ref(0);

    const formSchema = {
      $$strict: 'remove',
      index: {
        type: 'string',
        empty: false
      },
      password: {
        type: 'string',
        empty: false
      }
    };

    const primaryContrastColor = computed(function() {
      return contrast('primary', 2);
    });
    const primaryReverseColor = computed(function() {
      return contrast(primaryContrastColor.value, 2);
    });

    async function submitForm() {
      for(const key in formChangeStates) {
        formChangeStates[key] = true;
      }

      if(!validateForm()) return;

      try {
        await $store.dispatch('AUTHENTICATION/signIn', form);
        
        for(const key in formChangeStates) {
          formChangeStates[key] = false;
        }

        for(const key in form) {
          form[key] = '';
        }
      } catch(error) {
        for(const key in formChangeStates) {
          formChangeStates[key] = true;
        }
      }

      if($store.getters['AUTHENTICATION/isAuthenticated']) await $router.push({name: 'App'});
    }

    function validateForm() {
      const validated = validator.validate(form, formSchema);

      formErrors.value = validated === true ? [] : validated
        .filter(function(error) {
          return formChangeStates[error.field] === true;
        });

      return validated === true;
    }

    onActivated(function() {      
      scrollTo({
        behavior: 'smooth',
        top: windowScrollY.value});
    });
    onDeactivated(function() {
      windowScrollY.value = scrollY;
    });

    return {
      form,
      formChangeStates,
      formErrors,
      primaryContrastColor,
      primaryReverseColor,
      submitForm,
      validateForm,
      windowScrollY
    };
  }
}
</script>

<style lang="scss" scoped>
  #w-core-module-authentication {
    --self__flex-direction: column;
    --self__height: auto;
    --self__min-height: 100vh;
    --panel-wrapper__height: auto;
    --panel-wrapper__order: 2;
    --other-wrapper__order: 1;
    --other-wrapper__width: auto;

    &:where(.break-state\:lg) {
      --self__flex-direction: flex;
      --self__height: 100vh;
      --self__min-height: auto;
      --panel-wrapper__height: 100%;
      --panel-wrapper__order: 1;
      --other-wrapper__order: 2;
      --other-wrapper__width: 50rem;
    }
  }
  #w-core-module-authentication {
    align-items: stretch;
    background-color: rgba(var(--w-color-foreground), 1);
    display: flex;
    flex-direction: var(--self__flex-direction);
    height: var(--self__height);
    min-height: var(--self__min-height);
    width: 100%;

    & > .panel-wrapper {
      align-items: center;
      display: flex;
      flex: 1 1 auto;
      height: var(--panel-wrapper__height);
      order: var(--panel-wrapper__order);
      padding: 1rem;
      transition-property: height;
      width: 100%;

      & > .form {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        width: 100%;
        z-index: 1;

        & > .title {
          font-size: 1.5rem;
          font-weight: bold;
          padding: 1rem 0.5rem;
          text-align: center;
          width: 100%;
        }
        & > .form {
          align-items: stretch;
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 30rem;
          padding: 1rem 0px;
          width: 100%;
        }
      }
    }
    & > .other-wrapper {
      display: flex;
      flex: 0 0 auto;
      flex-direction: column;
      background-color: rgba(var(--w-color-primary), 1);
      order: var(--other-wrapper__order);
      transition-property: background-color, color, width;
      width: var(--other-wrapper__width);

      & > .button-wrapper {
        align-items: center;
        display: flex;
        flex: 0 0 auto;
        padding: 0.5rem;
        width: 100%;

        & > .button {
          padding: 0px;
        }
      }
      & > .content-wrapper {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        padding: 1rem;
        width: 100%;

        & > .logo-wrapper {
          align-items: center;
          display: flex;
          justify-content: center;
          padding-bottom: 1rem;
          width: 100%;

          & > .logo {
            align-items: center;
            background-color: rgba(var(--primary-contrast-color), 1);
            border-radius: 50%;
            display: flex;
            flex: 0 0 auto;
            height: 4rem;
            justify-content: center;
            transition-property: width;
            width: 4rem;

            & > .logo-image {
              height: 3rem;
              width: 3rem;

              & > .folds {
                & > .dark {
                  fill: rgba(var(--primary-reverse-color), 1);
                  transition-property: fill;
                }
                & > .light {
                  fill: rgba(var(--w-color-primary), 1);
                  transition-property: fill;
                }
              }
            }
          }
        }
        & > .title {
          color: rgba(var(--primary-contrast-color), 1);
          font-size: 1.75rem;
          font-weight: bold;
          padding-bottom: 0.5rem;
          text-align: center;
          width: 100%;
        }
        & > .text {
          color: rgba(var(--primary-contrast-color), 1);
          text-align: center;
          width: 100%;
        }
      }
    }
  }
</style>