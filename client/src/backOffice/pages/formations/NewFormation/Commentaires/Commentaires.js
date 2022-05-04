import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import {ShowSuccessMsg, ShowErrMsg} from '../../../../../components/utils/notifications/Nofification'
import {useSelector, useDispatch} from 'react-redux'
import {fetchFormation, dispatchGetFormation} from '../../../../../redux/actions/formationsAction'
import {fetchChapitres, dispatchChapitres} from '../../../../../redux/actions/chapitreAction'
import { useParams } from 'react-router-dom';

function Commentaires() {
  const token = useSelector(state => state.token)
  const formations = useSelector(state => state.formations)
    const [callback, setCallback] = useState(false)
    const dispatch = useDispatch()
    const [callback2, setCallback2] = useState(false)
    const dispatch2 = useDispatch()
    const {titre1} = useParams();
    const chapitres = useSelector(state => state.chapitres)
    var id = formations._id

        useEffect(() => {
          fetchFormation(token,titre1).then(res =>{
                dispatch(dispatchGetFormation(res))
            })
          },[token,titre1, dispatch, callback])
          console.log(formations._id)

          useEffect(() => {
            fetchChapitres(token,id).then(res =>{
                  dispatch2(dispatchChapitres(res))
              })
          },[token, id,dispatch2, callback2])
          console.log(chapitres)

  return (
    <div>Commentaires</div>
  )
}

export default Commentaires