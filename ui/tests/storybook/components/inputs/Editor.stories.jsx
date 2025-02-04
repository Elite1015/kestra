import Editor from "../../../../src/components/inputs/Editor.vue";

export default {
  title: "Components/Editor",
  component: Editor,
};

const Template = (args) => ({
  setup() {
    return () => <Editor {...args} />;
  }
});

export const Default = Template.bind({});
Default.args = {
  theme: "vs-dark",
  value: "console.log(\"Hello, world!\");",
  language: "javascript",
  options: {},
  label: "JavaScript Editor",
  placeholder: "Start typing...",
};

export const PythonEditor = Template.bind({});
PythonEditor.args = {
  theme: "vs-dark",
  value: "print(\"Hello, world!\")",
  language: "python",
  options: {},
  label: "Python Editor",
  placeholder: "Start typing...",
};

export const LargeContent = Template.bind({});
LargeContent.args = {
  theme: "vs-dark",
  value: "console.log(\"Hello, world!\");\n".repeat(100),
  language: "javascript",
  options: {},
  label: "Large Content Editor",
  placeholder: "Start typing...",
};

export const CustomContainer = Template.bind({});
CustomContainer.args = {
  theme: "vs-dark",
  value: "console.log(\"Hello, world!\");",
  language: "javascript",
  options: {},
  label: "Custom Container Editor",
  placeholder: "Start typing...",
  containerClass: "custom-container-class",
};