# loadable-module-federation-react-ssr

This project was created to demonstrate the incompatibility with the `loadable-components` library and the react + SSR + Module Federation.

🐛 Check out the [issue](https://github.com/gregberge/loadable-components/issues/926) for more details.

It cointains two sample projects:

- loadable-react-16
- loadable-react-18

Both projects are using the `loadable-components` library to load a component shared using Module Federation asynchronously.

## loadable-react-16

This project uses `react` version `16.x.x` and `loadable-components` version `5.13.2`. The project is a yarn workspace and contains two apps:

- app1: a React SSR app that uses `loadable-components` to load a federated component from `app2`
- app2: a React SSR app that exposes a component with Module Federation

### How to run

To run the project, you need to run the following commands:

```bash
cd samples/loadable-react-16
yarn install
yarn start
```

The apps will be available at the following URLs:

- app1: http://localhost:3000
- app2: http://localhost:3001

## Workarounds and hack's

Looking at the `app1` project, you can see that the `loadable-components` library is used to consume a component from the app2 using the dynamic import, but it can only works using the workaround snippet that enforces the preloading of the component.

```js
// samples/loadable-react-16/app1/src/client/components/App.tsx

const LoadableContent = loadable(() => import('app2/Content'), {
  fallback: <div>loading content...</div>,
});

if (typeof window === 'undefined') {
  require('app2/Content');
}
```

There are more workarounds being used to make SSR work, for example in the `samples/loadable-react-16/app1/src/server/renderAndExtractContext.tsx` file, we have to embrace the `App` component with the `ChunkExtractorManager` context provider component to make sure that our instance of the `ChunkExtractor` is being passed to the `InnerLoadable` component.

Another workaround is the forced preloading of the module federated components using script tags, which is being done in the `samples/loadable-react-16/app1/src/server/renderAndExtractContext.tsx` that capture all loadable chunks that are being imported from remotes and injects them as script tags in the HTML using functions from `samples/loadable-react-16/app1/src/server/mfFunctions.ts` file.

The parts which contains the workarounds are marked with the `// ================ WORKAROUND ================` comment.

## loadable-react-18

This project uses `react` version `18.2.0` and `loadable-components` version `5.13.2`. The project is a yarn workspace and contains two apps:

- app1: a React SSR app that uses `loadable-components` to load a federated component from `app2`
- app2: a React SSR app that exposes a component with Module Federation

The same workarounds are being used in this project as in the `loadable-react-16` project, but here we can see that SSR doesn't work, you can test it by disabling the javascript in the browser and refreshing the page.

### How to run

To run the project, you need to run the following commands:

```bash
cd samples/loadable-react-18
yarn install
yarn start
```

The apps will be available at the following URLs:

- app1: http://localhost:3000
- app2: http://localhost:3001
