<template>
    <el-collapse v-model="isOpen" class="collapse">
        <el-collapse-item
            :title="props.label"
            name="concurrency"
            class="mt-1 mb-3 wrapper"
        >
            <TaskBasic
                :model-value="props.modelValue"
                @update:model-value="(v) => emits('update:modelValue', v)"
                :schema
            />
        </el-collapse-item>
    </el-collapse>
</template>

<script setup lang="ts">
    import {ref, onMounted} from "vue";

    import TaskBasic from "../../../flows/tasks/TaskBasic.vue";

    const emits = defineEmits(["update:modelValue"]);

    const props = defineProps({
        modelValue: {type: Object, default: undefined},
        label: {type: String, default: undefined},
    });

    const isOpen = ref<string[]>([]);
    onMounted(() => {
        if (props.modelValue?.limit) isOpen.value = ["concurrency"];
    });

    const schema = {
        type: "object",
        properties: {
            behavior: {
                type: "string",
                enum: ["QUEUE", "CANCEL", "FAIL"],
                default: "QUEUE",
                markdownDescription: "Default value is : `QUEUE`",
            },
            limit: {type: "integer", exclusiveMinimum: 0},
        },
        required: ["limit"],
    };
</script>

<style scoped lang="scss">
@import "../../styles/code.scss";
</style>
