import {computed} from "vue";
import {useTheme} from "./utils"
import {cssVariable} from "@kestra-io/ui-libs";

const executionStates = [
    "CANCELLED", 
    "CREATED", 
    "FAILED",
    "KILLED",
    "KILLING",
    "PAUSED",
    "QUEUED",
    "RESTARTED",
    "RETRIED",
    "RETRYING",
    "RUNNING",
    "SKIPPED",
    "SUCCESS",
    "WARNING"
]

const logLevels = [
    "DEBUG", 
    "ERROR", 
    "INFO", 
    "TRACE", 
    "WARN"
]

function getSchemes() {
    const executions = {}
    for(const state of executionStates) {
        executions[state] = cssVariable(`--ks-chart-${state.toLowerCase()}`)
    }

    const logs = {}
    for(const level of logLevels) {
        logs[level] = cssVariable(`--ks-chart-${level.toLowerCase()}`)
    }

    return {
        executions,
        logs,
    }
}

export const getSchemeValue = (state, type = "executions") => {
    return getSchemes()[type][state];
};



/**
 *
 * @param {"executions" | "logs"} type - what th chart needed will display
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