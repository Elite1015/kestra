import {describe, it, expect} from "vitest"
// @ts-expect-error no types on yamlUtils yet
import * as YamlUtils from "../../../src/utils/yamlUtils";
import {flat, flowable, plugins} from "./yamlFictures";

const replace = `
id: replaced
type: io.kestra.plugin.core.log.Log
# comment to add
message: "replaced"
`

const extractMapsSample = `
firstMap:
  populatedField:
  presentField:
  extraField: "firstMap"
secondMap:
  populatedField: "populated"
  presentField:
  extraField: "secondMap"
thirdMap:
  populatedField: "populated"
  extraField: "thirdMap"
`



describe("YamlUtils", () => {
    it("extractMaps with field conditions", () => {
        const extractMaps = YamlUtils.extractMaps(extractMapsSample, {
            populatedField: {
                populated: true
            },
            presentField: {
                present: true
            }
        });

        expect(extractMaps.length).toBe(1);
        const map = extractMaps[0].map;
        expect(map.populatedField).toBe("populated");
        expect(map.presentField).toBe(undefined);
        expect(map.extraField).toBe("secondMap");
        expect(extractMaps[0].range).toStrictEqual([83,153,153]);
    })

    it("extractTask from a flat flow", () => {
        const doc = YamlUtils.extractTask(flat, "1-1", "tasks");

        expect(doc?.toString()).toContain("\"1-1\"");
        expect(doc?.toString()).toContain("# comment to keep");
    })

    it("extractTask from a flowable flow", () => {
        const doc = YamlUtils.extractTask(flowable, "1-2", "tasks");

        expect(doc?.toString()).toContain("\"1-2\"");
    })

    it("extractTask from a plugin flow", () => {
        const doc = YamlUtils.extractTask(plugins, "1-1", "tasks");

        expect(doc?.toString()).toContain("\"1-1\"");
    })

    it("extractTask undefined from a flowable flow", () => {
        const doc = YamlUtils.extractTask(flowable, "X-X", "tasks");

        expect(doc).toBe(undefined);
    })

    it("replace from a flat flow", () => {
        const doc = YamlUtils.replaceTaskInDocument(flat, "1-1", replace, "tasks");

        expect(doc.toString()).toContain("\"replaced\"");
        expect(doc.toString()).toContain("echo \"1-2\"");
        expect(doc.toString()).toContain("# comment to add");
        expect(doc.toString()).not.toContain("# comment to keep");
    })

    it("replace from a flowable flow", () => {
        const doc = YamlUtils.replaceTaskInDocument(flowable, "1-2", replace, "tasks");

        expect(doc.toString()).toContain("\"replaced\"");
        expect(doc.toString()).toContain("echo \"1-1\"");
        expect(doc.toString()).toContain("# comment to add");
    })

    it("replace from a plugin flow", () => {
        const doc = YamlUtils.replaceTaskInDocument(plugins, "1-1", replace, "tasks");

        expect(doc.toString()).toContain("\"replaced\"");
        expect(doc.toString()).toContain("unittest.Example");
        expect(doc.toString()).toContain("# comment to add");
    })

    const sampleYaml = `
    id: sample
    namespace: test
    tasks:
      - id: task1
        type: taskType
      - id: task2
        type: taskType
    `;

    it("should stringify YAML correctly", () => {
        const obj = {id: "sample", namespace: "test", tasks: [{id: "task1", type: "taskType"}, {id: "task2", type: "taskType"}]};
        const result = YamlUtils.stringify(obj);
        expect(result).toContain("id: sample");
        expect(result).toContain("namespace: test");
        expect(result).toContain("tasks:");
    });

    it("should parse YAML correctly", () => {
        const result = YamlUtils.parse(sampleYaml);
        expect(result).toHaveProperty("id", "sample");
        expect(result).toHaveProperty("namespace", "test");
        expect(result.tasks).toHaveLength(2);
    });

    it("should extract task correctly", () => {
        const result = YamlUtils.extractTask(sampleYaml, "task1");
        expect(result).toContain("id: task1");
        expect(result).toContain("type: taskType");
    });

    it("should replace task in document correctly", () => {
        const newTask = `
        id: task1
        type: newTaskType
        `;
        const result = YamlUtils.replaceTaskInDocument(sampleYaml, "task1", newTask);
        expect(result).toContain("id: task1");
        expect(result).toContain("type: newTaskType");
    });

    it("should insert task correctly", () => {
        const newTask = `
        id: task3
        type: taskType
        `;
        const result = YamlUtils.insertTask(sampleYaml, "task1", newTask, "after");
        expect(result).toContain("id: task3");
    });

    it("should delete task correctly", () => {
        const result = YamlUtils.deleteTask(sampleYaml, "task1", "tasks".toUpperCase());
        expect(result).not.toContain("id: task1");
    });

    it("should get first task correctly", () => {
        const result = YamlUtils.getFirstTask(sampleYaml);
        expect(result).toBe("task1");
    });

    it("should get last task correctly", () => {
        const result = YamlUtils.getLastTask(sampleYaml);
        expect(result).toBe("task2");
    });

    it("should check if task already exists correctly", () => {
        const taskYaml = `
        id: task1
        type: taskType
        `;
        const result = YamlUtils.checkTaskAlreadyExist(sampleYaml, taskYaml);
        expect(result).toBe("task1");
    });

    it("should get metadata correctly", () => {
        const result = YamlUtils.getMetadata(sampleYaml);
        expect(result).toHaveProperty("id", "sample");
        expect(result).toHaveProperty("namespace", "test");
    });

    it("should update metadata correctly", () => {
        const metadata = {description: "sample description"};
        const result = YamlUtils.updateMetadata(sampleYaml, metadata);
        expect(result).toContain("description: sample description");
    });

    it("should delete metadata correctly", () => {
        const result = YamlUtils.deleteMetadata(sampleYaml, "namespace");
        expect(result).not.toContain("namespace: test");
    });

    it("should get chart at position correctly", () => {
        const position = {lineNumber: 3, column: 5};
        const result = YamlUtils.getChartAtPosition(sampleYaml, position);
        expect(result).toBeNull();
    });

    it("should get all charts correctly", () => {
        const result = YamlUtils.getAllCharts(sampleYaml);
        expect(result).toHaveLength(0);
    });
})
