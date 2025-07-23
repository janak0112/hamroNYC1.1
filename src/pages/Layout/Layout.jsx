import React from 'react'
import { Outlet } from 'react-router-dom'  // ✅ Import Outlet
import Header from '../../components/Header/header'


function Layout() {
    return (
        <div>
            <Header />
            <Outlet /> {/* ✅ Use JSX-style comment */}
        </div>
    )
}

export default Layout
