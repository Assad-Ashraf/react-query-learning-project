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

- So depending upon the primary state of the query either data and error fields can have vlaues in it or isFetching can be true.

#### Example

- For most queries, it's usually sufficient to check for the isLoading state, then the isError state, then finally, assume that the data is available and render the successful state:

```bash
 function Todos() {
   const { isLoading, isError, data, error } = useQuery('todos', fetchTodoList)

   if (isLoading) {
     return <span>Loading...</span>
   }

   if (isError) {
     return <span>Error: {error.message}</span>
   }

   // We can assume by this point that `isSuccess === true`
   return (
     <ul>
       {data.map(todo => (
         <li key={todo.id}>{todo.title}</li>
       ))}
     </ul>
   )
 }
```

- An alternate way if you dnt wanna use booleans is status thing:

```bash
 function Todos() {
   const { status, data, error } = useQuery('todos', fetchTodoList)

   if (status === 'loading') {
     return <span>Loading...</span>
   }

   if (status === 'error') {
     return <span>Error: {error.message}</span>
   }

   // also status === 'success', but "else" logic works, too
   return (
     <ul>
       {data.map(todo => (
         <li key={todo.id}>{todo.title}</li>
       ))}
     </ul>
   )
 }
```

- So there are 2 ways to think about rQ, one is with error, sucesss,and loading status fields and other is isError, isLoading and isSuccess

---

## Mutations (the second core concept of rQ)

- Unlike queries, rQ uses mutations to create,update and delete data or do any server side-effects, which are done by using useMutation hook

```bash
function App() {
   const mutation = useMutation(newTodo => {
     return axios.post('/todos', newTodo)
   })

   return (
     <div>
       {mutation.isLoading ? (
         'Adding todo...'
       ) : (
         <>
           {mutation.isError ? (
             <div>An error occurred: {mutation.error.message}</div>
           ) : null}

           {mutation.isSuccess ? <div>Todo added!</div> : null}

           <button
             onClick={() => {
               mutation.mutate({ id: new Date(), title: 'Do Laundry' })
             }}
           >
             Create Todo
           </button>
         </>
       )}
     </div>
   )
 }
```

- We can clearly see that in addition of isLoading, isError, and isSuccess we have mutate in the object being returned by the useMutate Hook.

- Same as in case of query, there is error and data fields being populated once the mutation has been resolved, also, here we also have status field too.

- a mutation can be called by calling mutationName.mutate that is a async function that can aceept a variable or object too!
- React event pooling is a thing we will see later becuase mutate is a async function

```bash
Read these when time is here
Even with just variables, mutations aren't all that special, but when used with the onSuccess option, the Query Client's invalidateQueries method and the Query Client's setQueryData method, mutations become a very powerful tool.

IMPORTANT: The mutate function is an asynchronous function, which means you cannot use it directly in an event callback in React 16 and earlier. If you need to access the event in onSubmit you need to wrap mutate in another function. This is due to React event pooling.
```

## Resetting a Mutation

- It's sometimes the case that you need to clear the error or data of a mutation request. To do this, you can use the reset function to handle.

## Mutation Side Effects

- Invalidating and refreshing the queries after Mutations
- Optimistic Updates

```bash
The Abbove two concepts are very vast right now and rememver we are just talking about over view of 3 building blocks of rQ right now
```

- Mutation has onSuccess, onSettled, onError callbacks in it

# Query Invalidation (Third major part of rQ)

- Waiting for queries to become stale before they are fetched again doesn't always work, especially when you know for a fact that a query's data is out of date because of something the user has done. For that purpose, the QueryClient has an invalidateQueries method that lets you intelligently mark queries as stale and potentially refetch them too!

# This completed the overview of the main things in rQ

---

---

# Dev Tools
