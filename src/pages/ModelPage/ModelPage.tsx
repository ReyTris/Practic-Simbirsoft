import { useAppDispatch } from '@/hooks/useDispatch'
import { updateModel } from '@/store/OrderSlice'
import { useEffect } from 'react'

export const ModelPage = () => {
    const dispatch = useAppDispatch()
    dispatch(updateModel({model: '', status: false}))

    useEffect(() => {
    })
  return (
    <div>ModelPage</div>
  )
}
