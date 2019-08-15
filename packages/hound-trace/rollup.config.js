import babel from 'rollup-plugin-babel';

export default {
    input: 'src/index.js',
    output: {
        name: 'houndTrace',
        file: 'dist/index.js',
        format: 'umd'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        })
    ]
};