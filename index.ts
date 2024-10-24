import path from 'path';
import { Glob } from "bun";
import { Elysia } from "elysia";

export default async function fileRouter(routesPath: string = './routes/', log: boolean = true) {
  const app = new Elysia()

  const absoluteRoutesPath = path.join(__dirname, routesPath);

  const glob = new Glob(`${absoluteRoutesPath}/**/*.ts`);

  for await (let file of glob.scan('.')) {
    file = path.relative(absoluteRoutesPath, file);

    const filePath = path.join(absoluteRoutesPath, file);
    const fileName = path.parse(filePath).name;
    const dirPath = path.relative(absoluteRoutesPath, path.dirname(filePath));
    let routeDir = dirPath === '' ? '/' : `/${dirPath}/`;
    routeDir = routeDir.replace(/\[(.*?)\]/g, ':$1').replaceAll('\\', '/');

    const { default: controller } = await import(`${routesPath}${file}`);

    if (log) console.log(fileName.toUpperCase(), routeDir);

    app[fileName](routeDir, controller);
  }

  return app
}