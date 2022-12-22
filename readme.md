## Motivation

- Caching... (possibly the hardest thing to do in programming)
- Deduping multiple requests for the same data into a single request
- Updating "out of date" data in the background
- Knowing when data is "out of date"
- Reflecting updates to data as quickly as possible
- Performance optimizations like pagination and lazy loading data
- Managing memory and garbage collection of server state
- Memoizing query results with structural sharing
- Potentially help you save on bandwidth and increase memory performance

## Installation

To install it we will make use of vite
npm create vite@latest
this will make a react app which will be lightening fast and will make best hot reloads
Now install it as yarn install react-query

And Boom!

## Qucik Start

Here are the three core concepts of rQ:

## Query

- Declarative dependency on an asynchronous source of data that is tied to a unique key
- Primarily for fetching the data, if the source changes any data from the sever then the other core part of rQ comes into play (mutations)
- Can be used in any promise based method (including get and post)

```bash
import { useQuery } from 'react-query'

function App() {
 const info = useQuery('todos', fetchTodoList)
}
```

- Proided unique key has 3 main purposes in rQ (refetching, caching, and sharing your queries throughout your application)

---

### Talking about the useQuery hook

```bash
const result = useQuery('todos', fetchTodoList)
```

- The result of the hook has everything that is needed to template the data anywhere in application

#### 1. Primary State of Query

- The result object has a status which determines the state of query at given time, or andother field as status itself? (yet to be confirmed though).Here are 4 variations of a Query:

```bash
isLoading or status === 'loading' --> Query is current;y fetching the data
isError or status === 'error' ---> Query has encountered an error
isSuccess or status === 'success' ---> Query was successful, data is here
isIdle or status === 'idle' --> Wuery is disabled (will look into this sn)
```

#### 2. More Information is given based on these primary states

```bash
error - If the query is in an isError state, the error is available via the error property.
data - If the query is in a success state, the data is available via the data property.
isFetching - In any state, if the query is fetching at any time (including background refetching) isFetching will be true.
```
