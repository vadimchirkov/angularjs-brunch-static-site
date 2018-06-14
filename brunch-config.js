exports.config = {
    plugins: {
        jade: {
            prety: true
        },
        postcss: {
            processors: [
                require('autoprefixer')(['last 8 versions']),
                require('postcss-csso')(),

            ]
        }
    },
    files: {
        javascripts: {
            joinTo: {
                'js/app.js': [/^(?!app)/, /^app/]
            }
        },
        stylesheets: { joinTo: 'css/app.css' }
    }
}