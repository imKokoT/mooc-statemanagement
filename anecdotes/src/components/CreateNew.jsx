import { useAnecdoteActions, useAnecdotes } from "../states/anecdotes"
import { useNotificationActions } from "../states/notification"

function CreateNew() {
  const anecdotes = useAnecdotes()
  const { addNew } = useAnecdoteActions()
  const { showInfo } = useNotificationActions()
  
  function onSubmit(event) {
    event.preventDefault()

    const anecdote = event.target.anecdote.value

    if (!anecdote) {
      console.error('empty anecdote')
      return
    }
    if (anecdotes.some(item => item.content === anecdote)) {
      console.error('anecdote already exists')
      return
    }

    addNew(anecdote)
    console.log(`added new anecdote "${event.target.anecdote.value}"`)
    showInfo('anecdote added successfully!')

    // reset
    event.target.anecdote.value = ''
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input name='anecdote'/>
        </div>
        <button type='submit'>create</button>
      </form>            
    </div>
  )
}

export default CreateNew
