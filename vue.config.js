const before = require('./build/middleware')

module.exports = {
	lintOnSave: true,
	runtimeCompiler: true,
	devServer: {
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
		port: 81,
        before,
        open: 'Google Chrome'
	}

}
