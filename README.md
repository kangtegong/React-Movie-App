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

### 5. Component Styling-2 : Styled Components

- install styled components : `yarn add styled-components`
- define "Styled Components"

```
const SCName = styled.TAG`

    // styling

`;
```

```
const Header = styled.header``;

const List = styled.ul`
  display: flex;
  &:hover {
    background-color: blue;
  }
`;

const Item = styled.li``;
```

[+] https://velog.io/@velopert/react-component-styling#styled-components  
[+] https://velopert.com/1712  
[+] https://poiemaweb.com/sass-script  
[+] https://www.sassmeister.com/

- import { Link } from "react-router-dom";  
- styled(Link)

![](https://user-images.githubusercontent.com/47781146/81042231-a16d2e80-8eea-11ea-874f-1d9b77ddd384.png)

### 6. Make Global Style

styled component : Local  
styled-reset : Reset CSS for styled-components

- installation : `yarn add styled-reset`
- GlobalStyles.js : createGlobalStyles (from styled-components) & reset CSS (from styled-reset)

### 7. Location Aware Header

- give props `current` to Header.js <Item> component
- Item Component

```
const Item = styled.li`
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 3px solid
    ${props => (props.current ? "#3498db" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
`;
```

- give `props.current` current location with `withRouter`

```
// withRouter : component which wraps other component and give some information about Router

Header.js

// what we export === withRouter component which wraps Header component

export default withRouter(({ location: { pathname } }) => (
  <Header>
    <List>
      <Item current={pathname === "/"}>
        <SLink to="/">Movies</SLink>
      </Item>
      <Item current={pathname === "/tv"}>
        <SLink to="/tv">TV</SLink>
      </Item>
      <Item current={pathname === "/search"}>
        <SLink to="/search">Search</SLink>
      </Item>
    </List>
  </Header>
));


or 

const HeaderComponent = (props) => (
  
  // props : history, location, match ...
  // current URL === props.location.pathname

  <Header>
    <List>
      <Item current={props.location.pathname === "/"}>
        <SLink to="/">Movies</SLink>
      </Item>
      <Item current={props.location.pathname === "/tv"}>
        <SLink to="/tv">TV</SLink>
      </Item>
      <Item current={props.location.pathname === "/search"}>
        <SLink to="/search">Search</SLink>
      </Item>
    </List>
  </Header>
));

export default withRouter(HeaderCompoent)


// use spread operator 


const HeaderComponent = ({location: {pathname}}) => (
  
  // props : history, location, match ...
  // current URL === props.location.pathname

  <Header>
    <List>
      <Item current={pathname === "/"}>
        <SLink to="/">Movies</SLink>
      </Item>
      <Item current={pathname === "/tv"}>
        <SLink to="/tv">TV</SLink>
      </Item>
      <Item current={pathname === "/search"}>
        <SLink to="/search">Search</SLink>
      </Item>
    </List>
  </Header>
));

export default withRouter(HeaderCompoent)


```