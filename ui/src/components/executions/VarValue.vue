<template>
    <el-button-group v-if="isFileValid(value)">
        <a class="el-button el-button--small el-button--primary" :href="itemUrl(value)" target="_blank">
            <Download />
            {{ $t('download') }}
        </a>
        <FilePreview v-if="value?.toString().startsWith('kestra:///')" :value="value" :execution-id="execution?.id" />
        <el-button disabled size="small" type="primary" v-if="humanSize">
            ({{ humanSize }})
        </el-button>
    </el-button-group>

    <el-button-group v-else-if="isURI(value)">
        <a class="el-button el-button--small el-button--primary" :href="value?.toString()" target="_blank">
            <OpenInNew /> &nbsp;
            {{ $t('open') }}
        </a>
    </el-button-group>

    <span v-else-if="value === null">
        <em>null</em>
    </span>
    <span v-else>
        {{ value }}
    </span>
</template>

<script setup lang="ts">
    import {onMounted, ref, watch} from "vue";
    import {useStore} from "vuex";
    import Download from "vue-material-design-icons/Download.vue";
    import OpenInNew from "vue-material-design-icons/OpenInNew.vue";
    // @ts-expect-error missing types for editor > file-preview
    import FilePreview from "./FilePreview.vue";
    import {apiUrl} from "override/utils/route";
    import Utils from "../../utils/utils";
    import {useAxios} from "../../utils/axios";

    const store = useStore()

    const $http = useAxios()

    const props = defineProps<{
        value: string | object | boolean | number | null
        execution?: {
            id: string
        }
    }>()

    const humanSize = ref<string>("")

    watch(() => props.value, (newValue) => {
        if(newValue) getFileSize()
    })

    onMounted(() => {
        getFileSize()
    })


    function isFile(value: any): value is string {
        return typeof value === "string" && value.startsWith("kestra:///")
    }

    function isFileValid(value: any) {
        // we don't want to display the file if it's not a file or if the size is 0
        return isFile(value) && humanSize.value && humanSize.value !== "0B"
    }

    function isURI(value: any) {
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    }

    function itemUrl(value:any) {
        return `${apiUrl(store)}/executions/${props.execution?.id}/file?path=${encodeURI(value)}`;
    }

    function getFileSize(){
        if (isFile(props.value)) {
            $http(`${apiUrl(store)}/executions/${props.execution?.id}/file/metas?path=${props.value}`, {
                validateStatus: (status: number) => status === 200 || status === 404 || status === 422
            }).then((r: {data:any}) => humanSize.value = Utils.humanFileSize(r.data.size))
        }
    }
</script>
