import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: '../API/src/schema/*.graphql',
	documents: './queries/*.graphql',
	generates: {
		'./src/graphql.ts': {
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
			config: {
				typesPrefix: 'GQL',
			},
		},
	},
};

export default config;
