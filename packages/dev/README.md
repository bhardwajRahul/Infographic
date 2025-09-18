## 使用说明

### SSR 生成模版

```bash
pnpm build:ssr
```

上述命令会执行 `src/ssr.tsx` 并在 `dist` 目录下生成 `infographic.svg` 文件。

### 手动渲染模版

```bash
pnpm dev
```

上述命令会启动服务，并渲染 `src/renderer.ts` 文件。
