// Core
import { CLIGen, markersGen } from '../../src';

const folderForTesting = 'test'; // if folder changed, change it in package.json too (npm scripts) and in tsconfig.generate.json
const pathToTemplate = `./${folderForTesting}/generate/templates`;

CLIGen(
    [
        {
            name: 'Component: ./src/view/components/__componentName__',
            templates: [
                {
                    stringsReplacers: '__componentName__',
                    pathToTemplate: `${pathToTemplate}/component`,
                    outputPath: `./${folderForTesting}/src/components/__componentName__(pascalCase)`,
                    selectDirectory: true, //! todo
                    markers: [
                        {
                            pattern: '// MarkerGen re-export1', //! todo
                            markerTemplate: `${pathToTemplate}/component/.genignore/export.ts`,
                            pathToMarker: `./${folderForTesting}/src/components/index.ts`,
                        },
                    ],
                },
            ],
        },
        {
            name: 'Generate new React component',
            templates: [
                {
                    stringsReplacers: ['__exampleComponentName__', '__exampleExtension__', '__exampleStyleExtension__'],
                    pathToTemplate: `${pathToTemplate}/componentTemplate`,
                    outputPath: `./${folderForTesting}/src/components/__exampleComponentName__(pascalCase)`,
                    selectDirectory: true,
                    markers: [
                        {
                            pattern: '// MarkerGen re-export',
                            pathToMarker: `./${folderForTesting}/src/components/index.ts`,
                            markerTemplate: `${pathToTemplate}/componentTemplate/.genignore/import.ts`,
                        },
                    ],
                },
            ],
        },
    ],
    {
        rootPath: './',
        showFullError: true,
    },
);

// markersGen(
//     {
//         selectedNames: {
//             replaceVar: '__componentName__',
//             value: 'lorem1 lorem2 lorem3',
//         },
//         markers: [
//             {
//                 pattern: '// MarkerGen re-export',
//                 markerTemplate: `${pathToTemplate}/component/.genignore/export.ts`,
//                 pathToMarker: `./${folderForTesting}/src/components/index.ts`,
//             },
//         ],
//     },
//     {
//         rootPath: 1,
//     },
// );
