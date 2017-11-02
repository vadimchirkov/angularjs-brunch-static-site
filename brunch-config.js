exports.config = {
    files: {
        javascripts: {
            joinTo: {
                'js/app.js': [/^(?!app)/, /^app/]
            }
        },
        stylesheets: { joinTo: 'css/app.css' }
    },
    plugins: {
        jade: {
            prety: true
        },
        postcss: {
            processors: [
                require('autoprefixer')(['last 8 versions']),
            ]
        },
    },
}