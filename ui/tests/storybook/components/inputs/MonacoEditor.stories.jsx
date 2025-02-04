import {vueRouter} from "storybook-vue3-router";
import MonacoEditor from "../../../../src/components/inputs/MonacoEditor.vue";

export default {
    title: "Components/MonacoEditor",
    component: MonacoEditor,
    decorators:[
        vueRouter([
            {
                path: "/",
                name: "home",
                component: {template: "<div>home</div>"}
            }
        ])
    ]
};

const Template = (args) => ({
    setup() {
        return () => <MonacoEditor input {...args} />;
    },
});

export const Default = Template.bind({});
Default.args = {
    value: "console.log(\"Hello, world!\");",
    language: "javascript",
};

export const PythonEditor = Template.bind({});
PythonEditor.args = {
    value: "print(\"Hello, world!\")",
    language: "python",
};

export const LargeContent = Template.bind({});
LargeContent.args = {
    value: "console.log(\"Hello, world!\");\n".repeat(100),
    language: "javascript",
    theme: "vs-dark",
};

export const JSONEditor = Template.bind({});
JSONEditor.args = {
    value: JSON.stringify({hello: "world"}, null, 2),
    language: "json",
};