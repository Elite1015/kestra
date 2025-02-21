import Editor from "../../../../../src/components/code/segments/Editor.vue";

export default {
  title: "Components/NoCode/Editor",
  component: Editor,
}

const Template = (args) => ({
  components: {Editor},
  setup() {
    return () => <Editor {...args}/>
  }
});

export const Default = Template.bind({});
Default.args = {
  creation: false,
  // some yaml tasks
  flow: `
id: flow1
namespace: namespace1
tasks:
    - id: task1
    type: taskType
    `.trim(),
  metadata: {
    id: "example-id",
    namespace: "example-namespace",
    description: "Example description",
    retry: "",
    labels: {},
    inputs: [],
    outputs: "",
    variables: {},
    concurrency: {},
    pluginDefaults: "",
    disabled: false,
  },
};
