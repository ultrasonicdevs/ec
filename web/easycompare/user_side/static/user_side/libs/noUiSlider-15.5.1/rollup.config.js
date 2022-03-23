import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'src/nouislider.ts',
    output: [
        {
            file: 'dista/nouislider.js',
            format: 'umd',
            name: 'noUiSlider',
            exports: 'named'
        },
    ],
    plugins: [typescript()],
};
