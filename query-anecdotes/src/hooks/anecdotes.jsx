import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdotesService from '../services/anecdotes'

export const useAnecdotes = () => {
  const queryClient = useQueryClient()

  const anecdotes = useQuery({
    queryKey: ['anecdotes'],
    queryFn: AnecdotesService.getAll
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: AnecdotesService.createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: AnecdotesService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const deleteAnecdoteMutation = useMutation({
    mutationFn: AnecdotesService.deleteOne,
    onSuccess: (anecdote) => {
      queryClient.setQueryData(['anecdotes'], anecdotes.filter(x => x.id !== anecdote.id))
    }
  })

  return {
    anecdotes: anecdotes.data,
    isPending: anecdotes.isPending,
    error: anecdotes.error,
    isError: anecdotes.isError,

    addNew: (content) => {
      newAnecdoteMutation.mutate({ content, votes: 0 })
    },
    voteUp: (anecdote) => updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }),
    deleteOne: (anecdote) => deleteAnecdoteMutation.mutate(anecdote)
  }
} 
