import { getServerSession } from "next-auth"
import { options } from "../api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"

const mens  = async()=>{
    const session = await getServerSession(options)
    if(!session)
        redirect('/api/auth/signin?callbackUrl=/mens')
    return(
        <div>
        <p>{session?.user?.email}</p>
        <p>{session?.user?.role}</p>

        </div>
    )
    }
    export default mens