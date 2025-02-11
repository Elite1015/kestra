import {computed} from "vue";
import {useTheme} from "./utils"
import {cssVariable} from "@kestra-io/ui-libs";

function getSchemes() {
    const EXECUTIONS = {
        CANCELLED: cssVariable("--ks-chart-cancelled"),
        CREATED: cssVariable("--ks-chart-created"),
        FAILED: cssVariable("--ks-chart-failed"),
        KILLED: cssVariable("--ks-chart-killed"),
        KILLING: cssVariable("--ks-chart-killing"),
        PAUSED: cssVariable("--ks-chart-paused"),
        QUEUED: cssVariable("--ks-chart-queued"),
        RESTARTED: cssVariable("--ks-chart-restarted"),
        RETRIED: cssVariable("--ks-chart-retried"),
        RETRYING: cssVariable("--ks-chart-retrying"),
        RUNNING: cssVariable("--ks-chart-running"),
        SKIPPED: cssVariable("--ks-chart-skipped"),
        SUCCESS: cssVariable("--ks-chart-success"),
        WARNING: cssVariable("--ks-chart-warning"),
    };

    const LOGS = {
        DEBUG: cssVariable("--ks-chart-debug"),
        ERROR: cssVariable("--ks-chart-error"),
        INFO: cssVariable("--ks-chart-info"),
        TRACE: cssVariable("--ks-chart-trace"),
        WARN: cssVariable("--ks-chart-warn"),
    };

    const TYPES = {
        executions: EXECUTIONS,
        logs: LOGS,
    };

    return TYPES
}

export const getSchemeValue = (state, type = "executions") => {
    return getSchemes()[type][state];
};



/**
 *
 * @param {"executions" | "logs"} type
 * @returns
 */
export const useScheme = (type = "executions") => {
    const theme = useTheme();
    return computed(() => {
        const TYPES = getSchemes();
        // force recalculation of css variables on theme change
        if(theme.value !== undefined) {
            return TYPES[type]
        }else {
            return {}
        }
    });
}