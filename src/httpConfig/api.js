const debug = false;
const rootDir = debug
  ? 'http://localhost'
  : 'http://ec2-13-56-207-140.us-west-1.compute.amazonaws.com';
const portDir = 8080;

const apiUrl = `${rootDir}:${portDir}/v1/`;
export const storageUrl = `${rootDir}:${portDir}`;
export default apiUrl;
