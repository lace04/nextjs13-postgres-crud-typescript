// import million from 'million/compiler';
const million = require('million/compiler');

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

// export default million.next(nextConfig, { auto: { rsc: true } });
module.exports = million.next(nextConfig, { auto: { rsc: true } });
