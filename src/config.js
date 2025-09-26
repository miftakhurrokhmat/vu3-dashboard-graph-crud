const env = import.meta.env.VITE_ENV || "dev";

const configMap = {
    dev: {
        appName: import.meta.env.VITE_NAME_DEV,
        apiEndpoint: import.meta.env.VITE_API_ENDPOINT_DEV,
    },
    prod: {
        appName: import.meta.env.VITE_NAME_PROD,
        apiEndpoint: import.meta.env.VITE_API_ENDPOINT_PROD,
    },
};

const config = {
    ...configMap[env],
    developYear: import.meta.env.VITE_YEAR,
    currentEnv: env,
};

export default config;
