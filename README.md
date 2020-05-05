## Movie App

### 1. Base Settings

 - npx install : `yarn global add npx`, `npx creae-react-app .`
 - .env 
 - prop-types install : `yarn add prop-types`

### 2. Routes Settings-1

```
src/
    Components/
    Routes/
        Home.js
        Search.js
        TV.js
        Detail.js
```

 - install react-router-dom : `yarn add react-router-dom`
 - App.js
 - Router.js
 - Home.js, TV.js, Detail.js, Search.js

### 3. Routes Settings-2

- make Header component
- redirect (default URL setting)
- switch (redner only one Route component)

### 4. Component Styling-1 : CSS Modules

- put APPNAME.js APPNAME.module.css in same dir
- APPNAME.module.css (APPNAME.module.scss)

```
.navList {
    display: flex;
}
```

- APPNAME.js

```
import styles from "./APPNAME.module.css"

<tag className={styles.navList}>
```