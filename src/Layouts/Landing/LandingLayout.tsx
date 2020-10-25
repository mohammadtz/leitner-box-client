import React from 'react'
import { Path } from '../../Path'
import { Header } from './Header/Header'

export const LandingLayout: React.FC = (props) => {
    return (
        <div className="landing">
            <Header Route={Path} />
            {props.children}
        </div>
    )
}
