import { Link } from "react-router-dom"
import { Card } from "../components/card.components"

export const Index = () => { 
    return(
        <>
            <Link to={'/'}>LogOut</Link>
            <div style={{display:'flex'}}>

            <Card title={'Create'} redirect={'/create'} />
            </div>
        </>
    )
 }