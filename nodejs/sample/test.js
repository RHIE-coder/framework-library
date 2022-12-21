const Module = require('module');

const originalResolveFilename = Module._resolveFilename

const getBasePathFromFilePath = filepath => filepath.replace(/^(.+)[\\/]node_modules$/, '$1')

const getModifiedRequest = ({
	alias,
	parentModule,
	requestedFilePath,
}) => {
	const parentFilePath = parentModule
		.paths
		.find(filePath => moduleAliases[getBasePathFromFilePath(filePath)])

	if (!parentFilePath) {
		throw new Error(
			`The file at '${requestedFilePath}' does not exist.`
				.concat('\n\n')
				.concat('Verify these paths:')
				.concat('\n')
				.concat(
					JSON
						.stringify(
							moduleAliases,
							null,
							2,
						)
				)
		)
	}

	const basePath = (
		getBasePathFromFilePath(
			parentFilePath
		)
	)

	const aliasTarget = (
		moduleAliases[basePath][alias]
	)

	return (
		requestedFilePath
			.replace(
				alias,
				aliasTarget,
			)
	)
}

Module._resolveFilename = function(requestedFilePath, parentModule, isMain) {
    console.log(requestedFilePath);
    console.log(parentModule);
    console.log(isMain);
    console.log('||||||||||||||============')
    console.log('||||||||||||||============')
    console.log('||||||||||||||============')
    console.log('||||||||||||||============')
    console.log('||||||||||||||============')
    console.log(this);
    console.log('||||||||||||||============')
    console.log('||||||||||||||============')
    console.log('||||||||||||||============')
    console.log('||||||||||||||============')
    console.log('||||||||||||||============')
    return originalResolveFilename.call(this, requestedFilePath, parentModule, isMain)
}

console.log(require('crypto'))
console.log(require('@/utils/memory'))