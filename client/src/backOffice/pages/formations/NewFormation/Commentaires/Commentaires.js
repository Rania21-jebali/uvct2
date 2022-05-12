import React ,{useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchFormation, dispatchGetFormation} from '../../../../../redux/actions/formationsAction'
import { useParams } from 'react-router-dom';

function Commentaires() {
  const token = useSelector(state => state.token)
  const formations = useSelector(state => state.formations)
    const [callback, setCallback] = useState(false)
    const dispatch = useDispatch()
    const {titre1} = useParams();

        useEffect(() => {
          fetchFormation(token,titre1).then(res =>{
                dispatch(dispatchGetFormation(res))
            })
          },[token,titre1, dispatch, callback])
          console.log(formations._id)
          

  return (
    <div>Commentaires</div>
  )
}

export default Commentaires