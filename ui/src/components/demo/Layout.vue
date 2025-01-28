<template>
    <EmptyTemplate>
        <img :src="image.source" :alt="image.alt" class="img">
        <div class="message-block">
            <div class="enterprise-tag">
                {{ $t('demos.enterprise_edition') }}
            </div>
            <h2>{{ title }}</h2>
            <p><slot name="message" /></p>
            <slot name="buttons" />
        </div>
    </EmptyTemplate>
</template>

<script lang="ts" setup>
    import {onMounted, nextTick} from "vue";
    import {useStore} from "vuex";
    import EmptyTemplate from "../layout/EmptyTemplate.vue";

    const store = useStore();

    onMounted(() => {
        store.commit("doc/setDocPath", "<reset>")
        nextTick(() => {
            store.commit("doc/setDocPath", "")
            store.commit("misc/setContextInfoBarOpenTab", "docs")
        })
    });

    defineProps<{
        title: string;
        image: {
            source: string;
            alt: string;
        };
    }>();
</script>

<style lang="scss" scoped>
    @import "@kestra-io/ui-libs/src/scss/color-palette.scss";

    .img {
        width: 400px;
    }

    .message-block{
        text-align: left;
        width: 400px;
        margin: 0 auto;
        position: relative;
        // add flare effect in dark mode
        html.dark &::before{
            display: block;
            position: absolute;
            content: "";
            height: 2rem;
            width: 2rem;
            z-index: 12;
            top: -1rem;
            left: 8.5rem;
            background-image:
                // vertical flare
                linear-gradient(180deg, rgba($base-gray-200, 0) 0%, $base-gray-200 50%, rgba($base-gray-200, 0) 100%),
                // horizontal flare
                linear-gradient(90deg, rgba($base-gray-200, 0) 0%, $base-gray-200 50%, rgba($base-gray-200, 0) 100%),
                // flare effect
                radial-gradient(circle, $base-gray-200 0%, rgba($base-gray-200, .3) 40%,rgba($base-gray-200, 0) 70%);
            background-size:  1px 100%, 100% 1px, 40% 40%;
            background-repeat: no-repeat;
            background-position: center, center, center;
            transform:rotate(-10deg)
        }

        .enterprise-tag::before,
        .enterprise-tag::after{
            content: "";
            display: block;
            position: absolute;
            border-radius: 1rem;

        }

        .enterprise-tag::before{
            z-index: -2;
            background-image: linear-gradient(138.8deg, #CCE8FE 5.7%, #CDA0FF 27.03%, #8489F5 41.02%, #CDF1FF 68.68%, #B591E9 94%);
            top: -2px;
            bottom: -2px;
            left: -2px;
            right: -2px;
        }

        .enterprise-tag::after{
            z-index: -1;
            background: $base-gray-200;
            top: -1px;
            left: -1px;
            bottom: -1px;
            right: -1px;
            html.dark & {
                background: $base-gray-400;
            }
        }

        .enterprise-tag{
            position: relative;
            background: $base-gray-200;
            border: 1px solid transparent;
            padding: 0 1rem;
            border-radius: 1rem;
            display: inline-block;
            z-index: 2;
            html.dark &{
                background: #FBFBFB26;
                border-color: #FFFFFF;
            }
        }


        h2 {
            margin-top: 1rem;
            line-height: 30px;
            font-size: 20px;
            font-weight: 600;
        }

        p {
            line-height: 22px;
            font-size: 14px;
        }
    }

</style>