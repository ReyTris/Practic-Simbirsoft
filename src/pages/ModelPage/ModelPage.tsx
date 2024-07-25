import { useAppDispatch } from '@/hooks/useDispatch'
import { updateModel } from '@/store/OrderSlice'
import { useEffect } from 'react'

export const ModelPage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
      
    dispatch(updateModel({}))
    }, [dispatch])
  return (
    <div>ModelPage</div>
  )
}
