import { cookie } from './cookie'
export interface AuthNavProps {
    firstName: string
    id: string
}
export interface SearchBarProps {
    setVal: any
    value: any
}
export interface HomePage {
    token: cookie
}