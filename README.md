## Movie App

### 1. Base Settings

 - npx install : `yarn global add npx`, `npx creae-react-app .`
 - .env 
 - prop-types install : `yarn add prop-types`

### 2. Routes Settings-1

https://react-router.vlpt.us/

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

### 8. Get Movie Data (API from themoviedb.org)

  // https://developers.themoviedb.org/3/getting-started/introduction

  what we wanna get

```
- Now playing (Movie)
- Upcoming (Movie)
- Top Rated (TV, Movie)
- Popular (TV, Movie)
- Airing Today (TV)
```

- yarn add axios [link](https://github.com/axios/axios)

> good thing about axios: we can configure(set) the instance of axios

```
// Send a POST request
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});

// GET request for remote image in node.js
axios({
  method: 'get',
  url: 'http://bit.ly/2mTM3nY',
  responseType: 'stream'
})
  .then(function (response) {
    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  });
```

> stay on the version 0.18.0 of Axios `yarn add axios@0.18.0` 

### 8-2, 8-3 Apply API into project

- [x] Now playing (Movie)
- [x] Upcoming (Movie)
- [x] Top Rated (TV)
- [x] Popular (TV, X)
- [x] Airing Today (TV)
- [x] TV Show Detail
- [x] Movie Detail
- [x] Search (Movie, TV)

```
export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  
  movieDetail: id =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos"
      }
    }),

  search: term =>
    api.get("search/movie", {
      params: {
        query: encodeURIComponent(term)
      }
    })
};
```

### 9. Container

React Componenet Codeing 

**container - presenter paattern**

- container : [Data] data state get api logic
- presenter : [styles] show those data state(X) class(X) api(X)
 
```
componenet_directory/
  component_container.js
  component_presenter.js
  index.js (for container export)
```

## 10. render api info into container 

```
  async componentDidMount() {
    try {
      
      const {
        data: { results: topRated }
      } = await tvApi.topRated();
      
      const {
        data: { results: popular }
      } = await tvApi.popular();
      
      const {
        data: { results: airingToday }
      } = await tvApi.airingToday();
      
      this.setState({ topRated, popular, airingToday });
    
    } 
    
    catch {
      this.setState({
        error: "Can't find TV information."
      });
    } 
    
    finally {
      this.setState({ loading: false });
    }
  }
```

### 11. Search Container

Search Container - logics

 - type form -> enter -> handleSubmit()
 - handleSubmit : if Term not empty -> searchbyTerm()
 - searchbyTerm : get api data based on terms

 > issue : search api not working

## 12. Create Detail Routes

 `<Route path="/movie/:id" component={Detail} />`

## 13-1. DetailContainer

`src/Compoenet/Header.js`를 꾸밀 때는 `withRouter`를 이욯애서 현재의 위치를 알려주었다. 하지만
이런 작업들을 Detail에 해 줄 필요는 없다. 왜냐하면 디폴트로 react-router가 모든 정보를 Route에게 주기 때문이다.

Header는 `Route`가 아니기 때문에 Router에서 location 정보를 받을 수 없다.
그래서 `withRouter`를 사용해서 location 정보를 받는 것이다.

하지만 나머지 Search, TV, movie Detail..은 `Route`이다.
디폴트로 Router는 모든 Route들에게 props를 전달해준다.

> 애초에 라우터 컴포넌트가 아닌 컴포넌트에게 라우팅 정보를 주고 싶을 때 withRouter를 쓰는 것이다.

테스트해보자.

DetailContainer.js/
```
  render() {
    console.log(this.props); // 여기서 실제로 Routing props를 받는다는 걸 알 수 있다.
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
```
그러면 header가 받은 props와 동일한 props들을 받는다

`{match: {...}, location: {...}, history: {...}, staticContext: undefined}`

1. 우리가 /movie에 있는지, /show에 있는지 알아내야 한다
2. 어떤 숫자가 url id에 있는지 알아내야 함 : 
```
  - match: 
      params: {id: "121212"}
``` 

3. 잘못된 url 방지 : id에 부여된 값이 숫자인지 아닌지 판단해야 함

router props로부터 push, match.params.id 받아와서
```
const {
  match: {
    params: { id }
  },
  history: { push }
} = this.props;
```

url의 id값이 숫지인지 문자인지 판단 후 숫자가 아니라면 /로 이동
```
const parsedId = parseInt(id);
if (isNaN(parsedId)) {
  return push("/"); // home으로 url 바로 이동

```

## 13-2. Detail Container

- `this.isMovie = pathname.includes("/movie/");` : url을 검사하여 "/movie"가 포함되어있는지 여부 체크
- 만일 영화라면 movieDetail에 id값 넣어 호출, 영화가 아니라면 showDetail에 id값 넣어 호출

```
    let result = null;
    try{
      if (this.isMovie) {
        const request = await moviesApi.movieDetail(parsedId);
        result = request.data;
      } else {
        const request = await tvApi.showDetail(parsedId);
        result = request.data;
      }
```