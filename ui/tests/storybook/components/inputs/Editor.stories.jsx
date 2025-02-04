import {vueRouter} from "storybook-vue3-router";
import Editor from "../../../../src/components/inputs/Editor.vue";

export default {
  title: "Components/Editor",
  component: Editor,
  decorators:[
    vueRouter([
        {
            path: "/",
            name: "home",
            component: {template: "div>home</div>"}
        }
    ])
  ]
};

const Template = (args) => ({
  setup() {
    return () => <div style="height: 90vh;">
        <Editor
            input
            {...args}
        />
    </div>
  }
});

export const Default = Template.bind({});
Default.args = {
  modelValue: "console.log(\"Hello, world!\");",
  lang: "javascript",
};

export const PythonEditor = Template.bind({});
PythonEditor.args = {
  modelValue: "print(\"Hello, world!\")",
  lang: "python",
};

export const LargeContent = Template.bind({});
LargeContent.args = {
  modelValue: `
id: archive
namespace: sanitycheck.plugin.plugin-compress

tasks:
  - id: download
    type: io.kestra.plugin.core.http.Download
    uri: https://sample-files.com/downloads/compressed/zip/basic-text.zip

  - id: decompress
    type: io.kestra.plugin.compress.ArchiveDecompress
    from: "{{ outputs.download.uri }}"
    algorithm: ZIP

  - id: assertFiles
    type: io.kestra.plugin.core.execution.Fail
    condition: "{{ outputs.decompress.files | length != 6}}"

  - id: compress
    type: io.kestra.plugin.compress.ArchiveCompress
    from: "{{ outputs.decompress.files }}"
    algorithm: JAR

  - id: decompress2
    type: io.kestra.plugin.compress.ArchiveDecompress
    from: "{{ outputs.compress.uri }}"
    algorithm: JAR

  - id: assertContent
    type: io.kestra.plugin.core.execution.Fail
    condition: '{{ read(outputs.decompress2.files["readme.txt"]) != "This sample ZIP file is provided by Sample-Files.com. Visit us for more sample files and resources."}}'`.trim(),
  lang: "yaml",
};