<template>
    <el-collapse v-model="isOpen" class="collapse">
        <el-collapse-item
            :title="props.label"
            name="sla"
            class="mt-1 mb-3 wrapper"
        >
            <el-button @click="ss" />
            <!-- <OneOfContent
                :model-value="props.modelValue"
                @update:model-value="(v) => emits('update:modelValue', v)"
                :schema
                :definitions
            /> -->
        </el-collapse-item>
    </el-collapse>
</template>

<script setup lang="ts">
    import {h, ref, onMounted} from "vue";

    import OneOfContent from "../../../flows/tasks/OneOfContent.vue";

    const emits = defineEmits(["update:modelValue"]);

    const props = defineProps({
        modelValue: {type: Object, default: undefined},
        label: {type: String, default: undefined},
    });

    const isOpen = ref<string[]>([]);
    onMounted(() => {
        if (props.modelValue?.limit) isOpen.value = ["sla"];
    });

    const schema = {
        oneOf: [
            {
                $ref: "#/definitions/io.kestra.core.models.flows.sla.types.MaxDurationSLA-1",
            },
            {
                $ref: "#/definitions/io.kestra.core.models.flows.sla.types.ExecutionAssertionSLA-1",
            },
        ],
    };
    const definitions = {
        "io.kestra.core.models.flows.sla.types.ExecutionAssertionSLA-1": {
            type: "object",
            properties: {
                assert: {
                    type: "string",
                    minLength: 1,
                },
                behavior: {
                    type: "string",
                    enum: ["FAIL", "CANCEL", "NONE"],
                },
                id: {
                    type: "string",
                    minLength: 1,
                },
                labels: {
                    oneOf: [
                        {
                            type: "array",
                            items: {},
                        },
                        {
                            type: "object",
                        },
                    ],
                },
                type: {
                    type: "string",
                    enum: ["MAX_DURATION", "EXECUTION_ASSERTION"],
                },
            },
            required: ["assert", "behavior", "id", "type"],
        },
        "io.kestra.core.models.flows.sla.types.MaxDurationSLA-1": {
            type: "object",
            properties: {
                behavior: {
                    type: "string",
                    enum: ["FAIL", "CANCEL", "NONE"],
                },
                duration: {
                    type: "string",
                    format: "duration",
                },
                id: {
                    type: "string",
                    minLength: 1,
                },
                labels: {
                    oneOf: [
                        {
                            type: "array",
                            items: {},
                        },
                        {
                            type: "object",
                        },
                    ],
                },
                type: {
                    type: "string",
                    enum: ["MAX_DURATION", "EXECUTION_ASSERTION"],
                },
            },
            required: ["behavior", "duration", "id", "type"],
        },
    };

    import {useStore} from "vuex";
    const store = useStore();

    const ss = () => {
        store.commit("code/setPanel", {
            breadcrumb: {
                label: props.label,
                to: {
                    name: "flows/list",
                },
            },
            panel: h(OneOfContent, {
                modelValue: props.modelValue,
                label: props.label,
                schema,
                definitions,
                "onUpdate:modelValue": emits("update:modelValue"),
            }),
        });
    };
</script>

<style scoped lang="scss">
@import "../../styles/code.scss";
</style>
