import { fetchClient } from '../Actions/client'
class Auth {
    /**
     * !Validate User [Requires Auth id]
     * ? Stops Requests Without A Uid
     * @AuthValidator authId 
     */
    validateUser = async(authId: string): Promise<boolean> => {
        const userDoesExist = await fetchClient(authId)
           return userDoesExist.data? true: false
    }
}

const { validateUser } = new Auth()

export { validateUser }