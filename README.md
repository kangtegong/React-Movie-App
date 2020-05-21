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

## 14. Presenter Structure

- Proptypes : https://reactjs.org/docs/typechecking-with-proptypes.html

- create section (e.g. title, upcoming movie, popular moviews...)
- `/src/Components/Section.js`

```
const Section = ({title, children}) // children == reserved react prop

// copy-paste
Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
```

## 15. HomePresenter and Section Components

```
<Container>
  <Title></Title>
  <Grid>
    <Container>
      <Section>nowPlaying</Section>
      <Section>Upcoming</Section>
      <Section>Popular</Section>
    </Container>
  </Grid>
</Container>
```

- Components/Section.js

```
const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 50px;
  }
`;
```

```
// children: reserved react prop 
const Section = ({ title, children }) => (
  <Container>
    <Title>{title}</Title>
    <Grid>{children}</Grid>
  </Container>
);
```

- HomePresenter.js

```
const HomePresenter = ({ nowPlaying, popular, upcoming, loading, error }) =>
  loading ? null : (
    <Container>
      
      {nowPlaying && nowPlaying.length > 0 && (
        <Section title="Now Playing">
          {nowPlaying.map(movie => movie.title)}
        </Section>
      )}
      
      {upcoming && upcoming.length > 0 && (
        <Section title="Upcoming Movies">
          {upcoming.map(movie => movie.title)}
        </Section>
      )}
      
      {popular && popular.length > 0 && (
        <Section title="Popular Movies">
          {popular.map(movie => movie.title)}
        </Section>
      )}
    
    </Container>
  );
```

## 16. TVPresenter and Loader Components

- Components/Loader.js

Loader is just another component! (Surrounded by \<Container\>)

## 16-2. Applying Loader Component into Presenter

`loading ? <Loader> : <Container>Toprated, Popular, Airing</Container>`

```
const Presenter = ({ topRated, popular, airingToday, loading, error }) =>
  loading ? (
    // render this if loading
    <Loader />
  ) : (
    // render these if not loading
    <Container>
      toprated
      popular
      airing
    </Container>
  );
```

## 17-1. SearchPresenter Component : prevent event (submit)

```
<Container>
  <Form onSubmit={handleSubmit}>
    <Input placeholder = "Search Movies or TV shows..." value={SearchTerm} />
  </Form>
</Container>;
```

- value를 통해 입력값을 javascript로 handle하기
- enter 누르면 제출이 되어 새로고침 되어 state를 잃어버리는 현상 방지
- 제출이 되는 이벤트 방지하기

## 17-2. SearchPresenter Component : `Update Term`

```
  updateTerm = event => {
    // get value (=what we typed in) from event object 
    const {
      target: { value }
    } = event;
    // console.log(event);
    // console.log(event.target.value);
    
    // Change the state to the value
    this.setState({
      searchTerm: value
    });
  };

```

## 17-3. Applying Loader into SearchPresenter.js

```
  <Container>
    <Form>

    {loading ? (
      <Loader />
    ) : (
      
      // <> ~ </> : Return two Sections
      <>
        "movieResults"
        "tvResults"
      </>
    )}
  </Container>
);
```

## 18. Error and 404 message

(Error, 404) Message is also a component

error
```
{error && <Message color="#e74c3c" text={error} />}
```

notfound
```
{tvResults &&
 movieResults &&
 tvResults.length === 0 &&
 movieResults.length === 0 && (
  <Message text="Nothing found" color="#95a5a6" />
 )
}
```

- test : `throw Error();`

## 19. Making Poster Component

```
// id, imageUrl, title, rating, year, isMovie props로 받고 isMovie는 디폴트로 false 
const Poster = ({ id, imageUrl, title, rating, year, isMovie = false }) => (
  // 이 컴포넌트 전체에 link 걸어둠 : 클릭시 넘어가는 url 설계
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>  
    <Container>
      <ImageContainer>
        <Image bgUrl={imageUrl} />    // 이미지
        <Rating>                      // 평점
          <span role="img" aria-label="rating">
            ⭐️
          </span>{" "}
          {rating}/10
        </Rating>
      </ImageContainer>
      <Title>{title}</Title>          // 제목
      <Year>{year}</Year>             // 년도
    </Container>
  </Link>
);
```

## 20. Rendering Post Component

**HomeContainer.js, SearchContainer.js, TVPresenter.js**

- tvapi에서 받아온 poster_path, original_name, vote_average, first_air_date
- 직접 확인해보기, 어떤 흐름으로 움직이는지 파악
- 여기서 Component의 key란?
- 문자열.substring

```
<Section title="Airing Today">
  {airingToday.map((show) => (
    <Poster
      key={show.id}
      id={show.id}
      imageUrl={show.poster_path}
      title={show.original_name}
      rating={show.vote_average}
      year={show.first_air_date.substring(0, 4)}
    />
  ))}
</Section>;

```

- movie api에서 받아온 객체의 id, poster_path, original_title, vote_average, release_date
- 직접 확인해보기, 어떤 흐름으로 움직이는지 파악
- 여기서 Component의 key란?

```
<Section title="Now Playing">
  {nowPlaying.map((movie) => (
    <Poster
      key={movie.id}
      id={movie.id}
      imageUrl={movie.poster_path}
      title={movie.original_title}
      rating={movie.vote_average}
      year={movie.release_date.substring(0, 4)}
      isMovie={true}
    />
  ))}
</Section>;

```

## 21. Styling Poster Component

- order of styled component : (ReferenceError: Cannot access 'Component' before initialization)

- Image

```
const Image = styled.div`
  background-image: url(${props =>
    `https://image.tmdb.org/t/p/w300${props.bgUrl}`});
  transition: opacity 0.1s ease-in-out;
`;
```

- ImageContainer

> opacity, hide&hover

```
const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover{
    ${Image}{
      opacity: 0.3
    }
    ${Rating}{
      opacity: 1
    }
  }
`;
```

## 21-2. Add Default Image & Trim Title length

- /src/assets/NoPoster.jpg

if url exists bgUrl={ImageUrl} or require("../assets/noPosterSmall.png")

```
<Image
  bgUrl={
    imageUrl
      ? `https://image.tmdb.org/t/p/w300${imageUrl}`
      : require("../assets/noPosterSmall.png")
  }
/>;
```
> requrie() ??

```
<Title>{title.length > 18 ? `${title.substring(0, 18)}...` : title}</Title>;
```

## 22. DetailPresenter - Add backdrop image

- give backdrop image as props to style component

```
<Backdrop
  bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
/>;
```

```
const Backdrop = styled.div`
  ...
  background-image: url(${props => props.bgImage});
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;
```

- z-index

## 22-2. DetailPresenter - Add Cover Image

> CSS Hell gate..

- without `width: 100%` & `height: 100%` ?

```
<Content>
  <Cover
    bgImage={
      result.poster_path
        ? `https://image.tmdb.org/t/p/original${result.poster_path}`
        : require("../../assets/NoImage.png")
    }
  />
</Content>;
```
