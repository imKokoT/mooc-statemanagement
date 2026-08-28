import { useContext } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/anecdotes'
import NotificationContext from './contexts/NotificationContext'

const App = () => {
  const { anecdotes, isPending, isError, voteUp } = useAnecdotes()
  const { setNotification } = useContext(NotificationContext)

  const handleVote = (anecdote) => {
    voteUp(anecdote)
    console.log('vote anecdote', anecdote.id)
    setNotification({message: `anecdote '${anecdote.content}' voted`, timeout: 5})
  }

  if (isPending) {
    return <div>fetching anecdotes...</div>
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
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