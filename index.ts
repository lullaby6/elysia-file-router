import path from 'path';
import { Glob } from "bun";
import { Elysia } from "elysia";

export default async function fileRouter(routesPath: string, log: boolean = true) {
  if (!routesPath) throw new Error('routesPath is required');
  if (!routesPath.endsWith('/')) routesPath += '/';

  const app = new Elysia()

  const glob = new Glob(`${routesPath}/**/*.ts`);

  for await (let file of glob.scan('.')) {
    file = path.relative(routesPath, file);

    const filePath = path.join(routesPath, file);
    const fileName = path.parse(filePath).name;
    const dirPath = path.relative(routesPath, path.dirname(filePath));
    let routeDir = dirPath === '' ? '/' : `/${dirPath}/`;
    routeDir = routeDir.replace(/\[(.*?)\]/g, ':$1').replaceAll('\\', '/');

    const { default: controller } = await import(`${routesPath}${file}`);

    if (log) console.log(fileName.toUpperCase(), routeDir);

    app[fileName](routeDir, controller);
  }

  return app
}