require('dotenv').config({
    path: '.env.test'
});

jest.mock('./src/helpers/getEnvVarables.js', () => ({
    getEnvVariables: () => ({ ...process.env })
}));