import { useAnecdotes } from '../hooks/anecdotes'

const AnecdoteForm = () => {
  const { addNew } = useAnecdotes()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length < 5) {
      return
    }

    event.target.reset()
    addNew(content)
    console.log('new anecdote')
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