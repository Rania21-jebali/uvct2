import {Select} from "antd";
import React, { useEffect, useState } from 'react'
import {ArrowDropDown, SearchOutlined} from "@material-ui/icons";
import {QuickNavigation} from "../../components/quick-navigation/quick-navigation";
import InstructeurCard from "./components/instructeurCard";
import './instructors.scss'
import axios from "axios";

export const Instructeurs1 = () => {
    const [user, setUser] =  useState({})

    useEffect(()=> {
        axios({url: 'http://localhost:5000/user/allInstr', method:'GET'})
            .then(response => {
                console.log(response.data)
                setUser(response.data)
            })
    })
 return(
     <div className={'instructors-container'}>
         <QuickNavigation/>
         <div className={'filter-container'} >
             <div className={'search-input-container'}>
                 <input className={"search-input"} placeholder="Rechercher des instructeurs" />
                 <div className={'search-input-icon'}>
                     <SearchOutlined/>
                 </div>
             </div>
             <div className={'search-dropdown-container'}>
                     <Select
                         placeholder={'N’importe quel catégorie'}
                         className={'search-dropdown'}
                         suffixIcon={<ArrowDropDown fontSize={'large'} style={{color:'#334155'}}/>}
                     >
                         <Select.Option value={10}>Marketing</Select.Option>
                         <Select.Option value={20}>Dévéloppement web</Select.Option>
                         <Select.Option value={30}>Dévéloppement mobile</Select.Option>
                         <Select.Option value={30}>Musique</Select.Option>
                         <Select.Option value={30}>Informatique</Select.Option>
                     </Select>
             </div>
         </div>
         <div className={'all-instructors-container'} >
             {
                 user.map((user1)=> {
                     return(
                         <InstructeurCard {...user1} />
                     )
                 })
             }
         </div>
     </div>
 )
}



