<template>
  <div id="gn-authentication-view">
        <div class="info">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus eius laboriosam sit dignissimos perferendis iure quisquam exercitationem, vel voluptas amet dolorum. Repellat perspiciatis delectus quas qui ad eaque rerum in, cumque, architecto aliquam minima velit laboriosam porro, nemo sequi voluptatum autem. Voluptate tenetur ex reprehenderit odio totam necessitatibus beatae voluptatibus voluptatum, architecto, quam atque. Sunt quasi obcaecati possimus recusandae nostrum enim totam vel id, nulla in voluptatum debitis itaque culpa, molestias iusto a tempora maiores magnam? Sed, ipsa veritatis. Doloribus dolorum sapiente iusto quia tempore nihil vero repellendus magnam animi excepturi, corporis similique architecto rerum accusantium qui dignissimos eos iure est quos omnis. Dignissimos non autem illum? Earum atque, et repudiandae nesciunt suscipit exercitationem dolorem quam neque deleniti natus recusandae quos ut reprehenderit nulla qui perspiciatis labore nam obcaecati. Provident, in culpa dicta impedit neque atque quam necessitatibus. A sunt fugit culpa unde expedita! Iusto, tenetur rerum vero amet id sed quaerat quae saepe? Facilis accusamus ab voluptates labore commodi amet natus alias dolore, harum nostrum tempora qui corrupti excepturi rem obcaecati quod fuga quaerat id. Ipsum eum unde enim iusto itaque necessitatibus, magni omnis explicabo hic debitis labore laboriosam molestiae error est sequi modi nam eveniet commodi ratione! Sed!
        </div>
        <div class="body">
            <div class="logo">
                <img src="@/assets/images/logo.png" alt="GCTU logo">
            </div>
            <h1 class="title">
                Sign In
            </h1>
            <form
                class="form"
                @submit.prevent
            >
                <InputTextComponent
                    class="form-control"
                    label="Index No."
                    name="index"
                    v-model="form.index"
                ></InputTextComponent>
                <InputTextComponent
                    class="form-control"
                    is-password
                    label="Password"
                    name="password"
                    v-model="form.password"
                ></InputTextComponent>
                <ButtonActionComponent
                    class="form-control"
                    type="submit"
                >
                    Sign In
                </ButtonActionComponent>
            </form>
            <div class="forgot">
                Forgotten your password?
                <a href="#">click here</a>.
            </div>
            <div class="footer">
                <div class="content-wrapper">
                    &copy; GCTU. All Right Reserved
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import ButtonActionComponent from '@/components/button/action';
import InputTextComponent from '@/components/input/text';

export default {
    name: 'GnAuthenticationView',
    components: {
        ButtonActionComponent,
        InputTextComponent
    },
    setup() {
        const refs = reactive({
            form: {
                index: '',
                password: ''
            }
        });

        return {
            ...toRefs(refs),
        };
    }
}
</script>

<style lang="scss" scoped>
#gn-authentication-view {
    height: 100vh;
    width: 100%;

    & > .info {
        background-blend-mode: overlay;
        background-color: rgba(var(--gn-color-primary), 0.75);
        background-image: url(~@/assets/images/sign-in-cover.jpg);
        background-position: left center;
        background-size: cover;
        color: white;
        height: 100vh;
        left: 0px;
        position: fixed;
        top: 0px;
        width: calc(100% - 30rem);
        z-index: 1;
    }
    & > .body {
        padding: 0px 2rem;
        position: absolute;
        width: 30rem;
        right: 0px;
        z-index: 2;

        & > .logo {
            height: 22rem;
            padding: 2rem 0px;

            & > img {
                height: 100%;
                object-fit: contain;
                object-position: center;
                width: 100%;
            }
        }
        & > .title {
            text-align: center;
        }
        & > .form {
            width: 100%;

            & > .form-control {
                padding-left: 0px;
                padding-right: 0px;
                width: 100%;
            }
        }
        & > .forgot {
            padding: 0.5rem 0px;
            text-align: center;
        }
        & > .footer {
            padding: 2rem 0px;

            & > .content-wrapper {
                padding: 1rem;
                text-align: center;
                border-top: 2px solid rgba(var(--gn-color-primary), 1);
            }
        }
    }
}
</style>