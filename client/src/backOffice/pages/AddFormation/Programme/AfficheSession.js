import React ,{useState, useEffect} from 'react'
import {fetchSessions, dispatchSessions} from '../../../../redux/actions/sessionAction'
import {useSelector, useDispatch} from 'react-redux'
import '../AddFormation.css'
import Session from './Session';

     
  

function AfficheSession(props) {
    const token = useSelector(state => state.token)
    const sessions = useSelector(state => state.sessions)
    const [callback, setCallback] = useState(false)
    const dispatch = useDispatch()
    const id2=props.id


    
    useEffect(() => {
      fetchSessions(token,id2).then(res =>{
          dispatch(dispatchSessions(res))
      })
    },[token, id2 ,dispatch, callback])
   

  return(
    <div>
    {
      sessions.map((session,i) => 
      (
        <div className='affiche-session' key={session._id}>
          <Session id={session._id} titre={session.titre} num={i+1}/>
        </div>
        ))}
        </div>
      
  )
}

export default AfficheSession