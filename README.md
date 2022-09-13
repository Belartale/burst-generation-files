# Welcome to burst-generate-files.

<image align="right" width="160px" alt="HTML5" src="https://lh3.googleusercontent.com/pw/AL9nZEXF_kAh3tezMRxnT4GGR3YHoKo5CpSkWtRBD9_HsJ7K_KNqcpjELcsJ1OKdji9fJNIa9GKHXjeuLLshj5t-Y0QJuMn3IVxRCT1iXtm0AeSjD8s2cR1VJOpqRHEXLLZVZRgmJcw59HXUwCb2_dw1L17A=s432-no?authuser=0"/>

This is a library for generating files and folders based on templates that the user creates.

## How to install

### Using npm:

```sh
npm i burst-generate-files
```

## Fast instructions for use
Below are the steps we will take to build our first generation together.

### Create your first template
Template is folder with any scructure. In our case, we create simple example of `React` component.

Create the folder `componentTemplate`, then create file with name `index.tsx`, but also you can use another name `__exampleComponentName__(pascalCase).tsx`, in second variant we have dynamic file name with different replace modes. More information about variables in file names and replace modes you can find deeper in this docs.

```typescript
// ./componentTemplate/index.tsx

import React from "react";

export const __exampleComponentName__(pascalCase) = () => {
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

**Note:** for easy way, to get root path of your application, you can use [app-root-path](https://www.npmjs.com/package/app-root-path).

```typescript
// ./generate.config.ts

import { generateTemplateFiles } from "burst-generate-files";
import { path as ROOT_PATH_OF_YOUR_APPLICATION } from 'app-root-path';

generateTemplateFiles(ROOT_PATH_OF_YOUR_APPLICATION, [
    {
        name:            "Generate new React component",
        stringsReplacers: "__exampleComponentName__",
        pathTemplate:    "./componentTemplate",
        outputPath:      "./components/__exampleComponentName__(pascalCase)",
    },
]);
```

#### If you happy with TypeScript
To start generating files, you need run `generate.config.ts`, the best way to do this install [ts-node](https://www.npmjs.com/package/ts-node) package globaly.

In terminal you need just type next comand and magic begin... 
```sh
ts-node "./generate.config.ts"
```

**Note:** also you can add new script in your `package.json`, for example 
```json
"scripts": {
    "gen": "ts-node ./generate.config.ts"
},
```

#### If you must use JavaScript

For JavaScript all easier, in your terminal run next comand: 
```sh
node "./generate.config.js"
```

### Comand Line Interface 
After running `generate.config.js`, advaced CLI started in your terminal. Next you have to choose that you want to generate, for example it will be `Component`. Press `Enter` to submit your choice, and continue.

![image](https://user-images.githubusercontent.com/33392042/189500538-5bc4e95e-9b05-4b49-bde2-fde162e3a1e5.png)

On next step we need to type the name of entity what we generating. All strings inside templates what you use, and looks likes this: `__entityName__`, will replace with your name of entity.

For example name of entity will be `wrapper`. Lets press `Enter` button to complete generation.

![image](https://user-images.githubusercontent.com/33392042/189500561-3bf47a86-6902-479f-9cab-49446033106f.png)

Finaly, example React component file scructure will be successfully created.

![image](https://user-images.githubusercontent.com/33392042/189501072-308de453-8519-4667-824e-74a79f922db1.png)

Congratulations, we make our first generation together!

## Advanced use

Next, we will get acquainted with the main features of the library.

### Variables in file or folder names

The library supports the syntax of variables in the names of files or folders that are contained in templates.

For example, we can rename `index.tsx` file in previous examle to `__exampleComponentName__(pascalCase).__exampleExtension__`.
In that case name and extension of file will be replaced, by variables what are configured in config file. 
Lets add new variable to `generate.config.ts` file:
```typescript
    // ./generate.config.ts
    {
        // ...
        stringReplacers: [  // <= Open new array
            "__exampleComponentName__",
            "__exampleExtension__", // <= New variable here
        ], 
        // ...
    }
```

Run `generate.config.ts` with new changes.
In CLI add value `wrapper` to `__exampleComponentName__`, and add value `tsx` to `__exampleExtension__`, and get result with custom file name, and custom extesion.

`Screenshot of two different inputs in CLI`

![image](https://user-images.githubusercontent.com/25966000/189736262-c0b179b1-739b-4332-84c0-1d667a6a41a4.png)

### Extend template

Size of file scructure no matter for burst generation. You can create any template, with any files and folder inside.
For example, lets add new file in `componentTemplate`, and it will be `styles.__exampleStyleExtension__`. 
```typescript
    // ./generate.config.ts
    {
        // ...
        stringReplacers: [ 
            "__exampleComponentName__",
            "__exampleExtension__",
            "__exampleStyleExtension__" // <= New variable again here
        ], 
        // ...
    }
```
As result we get new generated file structure based on extended template.

![image](https://user-images.githubusercontent.com/25966000/189738692-03c3c6f3-3185-4302-b133-25cabd01ba11.png)

### Extend config with new template

The library can supports unlimited templates at the same time.
For extend your config with new template, you need create new `template` folder with some stuff inside, and add new `settings` object to `generate.config.ts`.

```typescript
// ./generate.config.ts

generateTemplateFiles(ROOT_PATH_OF_YOUR_APPLICATION, [
    {
        name:            "Generate new React component",
        stringReplacers: "__exampleComponentName__",
        pathTemplate:    "./componentTemplate",
        outputPath:      "./components/__exampleComponentName__(pascalCase)",
    },
    {                                // <= Page generation config
        name:            "New page",
        stringReplacers: "__pageName__",
        pathTemplate:    "./pageTemplate",
        outputPath:      "./page/__pageName__(pascalCase)",
    },
]);
```
```json
Screnshot of two template options in CLI
```

## Settings
### `name`
This is the name that will be displayed in the interface.

![Image interface](https://user-images.githubusercontent.com/33392042/189359666-be15cce3-133a-444d-a57d-33fb16033f78.png)

### `stringsReplacers`
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
