# Welcome to burst-generate-files.

This is a library for generating files and folders based on templates that the user creates.

## How to install

### Using npm:

```sh
npm i burst-generate-files -D
```

## Fast instructions for use
Below are the steps we will take to build our first generation together.

### Create your first template
Template is folder with any scructure. In our case, we create simple example of `React` component.

Create the folder `componentTemplate`, then create file with name `index.tsx`, but also you can use another name `__exampleComponentName__(pascalCase).tsx`, in second variant we have dynamic file name with different replace modes. More information about variables in file names and replace modes you can find deeper in this docs.

```typescript
// ./componentTemplate/__exampleComponentName__(pascalCase).tsx

import React from "react";

const __exampleComponentName__(pascalCase) = () => {
    return (
        <div>
            This is component: __exampleComponentName__
        </div>
     );
};
```
### Create config file

Lets create `generate.config.ts` in root of your project.

First of all you need to add import of `burst-generate-files`, and get `generateTemplateFiles` function. 

That function require two parameters, root path of your application and array of settings.

**Note:** for easy way, to get root path of your application, you can use [app-root-path](https://www.npmjs.com/package/app-root-path). Try that: `npm i app-root-path -D`.

```typescript
// ./generate.config.ts

import { generateTemplateFiles } from "burst-generate-files";
import { path as ROOT_PATH_OF_YOUR_APPLICATION } from 'app-root-path';

generateTemplateFiles(ROOT_PATH_OF_YOUR_APPLICATION, [
    {
        name:            "Generate new React component",
        stringReplacers: "__exampleComponentName__",
        pathTemplate:    "./componentTemplate",
        outputPath:      "./components/__exampleComponentName__(pascalCase)",
        onComplete: () => {
            console.log("Example component created!");
        },
    },
]);
```

#### If you happy with TypeScript
To start generating files, you need run `generate.config.ts`, the best way to do this use `ts-node` package.

[Install](https://www.npmjs.com/package/ts-node) `npm i ts-node -D`.

In terminal you need just type next comand and magic begin... 
```sh
ts-node "./generate.config.ts"
```

#### If you must use JavaScript

For JavaScript all easier, in your terminal run next comand: 
```sh
node "./generate.config.js"
```

### Comand Line Interface 
After running `generate.config.js`, advaced CLI started in your terminal. Next you have to choose that you want to generate, for example it will be `Component`. Press `Enter` to submit your choice, and continue.

![image](https://user-images.githubusercontent.com/33392042/189484692-10ec33ee-2ced-4f1c-90d9-9060b51ebd86.png)

On next step we need to type the name of entity what we generating. All strings inside templates what you use, and looks likes this: `__entityName__`, will replace with your name of entity.

For example name of entity will be `wrapper`. Finaly, press `Enter` button to complete generation.

![image](https://user-images.githubusercontent.com/33392042/189484722-cb9e117d-9fe7-4149-8a07-9ee4ba5dcb3b.png)

Then the message `Example component created!` will appear in your terminal and example React component file scructure will be created.

![image](https://user-images.githubusercontent.com/33392042/189498473-cfa10c1e-8e95-482d-bf5f-26682859899d.png)
![image](https://user-images.githubusercontent.com/33392042/189492836-c0ee2732-3aee-4db9-bca7-807f454fa175.png)

### Add new line
If you want to insert new line for external file, you can use `addRowFiles`. For example, we insert export for `React` component.
```typescript
// ./generate.config.ts

import { generateTemplateFiles } from "burst-generate-files";
import { path as ROOT_PATH_OF_YOUR_APPLICATION } from 'app-root-path';

generateTemplateFiles(ROOT_PATH_OF_YOUR_APPLICATION, [
    {
        name:            "Component: ./src/components/__exampleComponentName__",
        stringReplacers: "__exampleComponentName__",
        pathTemplate:    "./template",
        outputPath:      "./src/components/__exampleComponentName__(pascalCase)",
        
        addRowFiles: [
            {
                pathFromOutputPath: '../index.ts',
                marker:             '// Re-export',
                whereInsertRow:     'after marker',
                generationRow:      'export * from \"./__exampleComponentName__(pascalCase)/__exampleComponentName__(pascalCase)\";',
            },
        ],
        
        onComplete: () => {
            console.log("Example component created!");
        },
    },
]);
```

Then, in directory `./src/component` you have to create file `index.ts` and paste next code.

❗️`// Re-export` is marker for generate your line, if this line different than `addRowFiles.marker`, new line will not create.
```typescript
// ./src/component/index.ts

// Re-export
```

After generate, you can see that new line successfully generated.

![image](https://user-images.githubusercontent.com/33392042/189493125-b253618b-a863-45bb-b4d9-3ecf4461b7fc.png)

## Settings
### `name`
This is the name that will be displayed in the interface.

![Image interface](https://user-images.githubusercontent.com/33392042/189359666-be15cce3-133a-444d-a57d-33fb16033f78.png)

### `stringReplacers`
This is the string which will replace.
#### Types of string replacements
```sh
__componentName__(noCase) === lorem Lorem loremam
__componentName__(pascalCase) === LoremLorem
__componentName__(constantCase) === LOREM_LOREM
__componentName__(kebabCase) === lorem-lorem
__componentName__ === loremLorem
```

### `pathTemplate`
This is the path for your template that will create.

### `outputPath`
This is the path for output files.

### `addRowFiles` *optional*
This is the array to create lines into files.
- #### `pathFromOutputPath`
This is the path to the file to insert the line.

- #### `marker`
This is the marker for insert line.

- #### `regExp` *optional*
    If you have a complex or specific marker, you can use `new RegExp(value, flags)`.
    - ##### `value`
    The value for RegExp.
    - ##### `flags`
    The flags for RegExp.

- #### `whereInsertRow` *optional*
This is the option tells the program where to insert the line. Insert line after marker or before marker.

**Note:** if not exists, then default value `after maker`.

- #### `generationRow`
This is the string which will be inserted into file.

- #### `onceInsertRow`
This is the boolean. If it is true, the row will only be inserted once, when you insert again you will catch the warning.
**Note:** if you want to paste again, you need edit file `config.generate.files.json`

### `onComplete` *optional*
this is the function that will be executed after generation
