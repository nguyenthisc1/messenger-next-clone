'use client'

import useActiveChannel from "../hooks/useActiveChannel"
import { useAppSelector } from "../redux/store"


export default function ActiveStatus() {
    
    useActiveChannel()

    return null
}
