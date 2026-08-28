import { useAnecdotes } from '../hooks/anecdotes'
import useNotify from '../hooks/notify'

const AnecdoteForm = () => {
  const { setNotification } = useNotify()
  const { addNew } = useAnecdotes()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    addNew(content, error => setNotification({message: `${error}`}))
    
    event.target.reset()
    console.log('new anecdote')
    setNotification({message: `created new anecdote: ${content}`, timeout: 5})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm