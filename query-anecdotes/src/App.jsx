import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/anecdotes'

const App = () => {
  const { anecdotes, isPending, error, isError, voteUp } = useAnecdotes()

  const handleVote = (anecdote) => {
    voteUp(anecdote)
    console.log('vote anecdote', anecdote.id)
  }

  if (isPending) {
    return <div>fetching anecdotes...</div>
  }

  if (isError) {
    return <div>something going wrong! {error.message}</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App