import { useMutation } from "@apollo/client"
import { useField } from "../hooks/custom-hooks"
import { LOGIN } from "../queries/queries"

const LoginForm = ({show}) =>{
    
    const {reset: resetName, ...name} = useField('text')
    const {reset: resetPassword, ...password} = useField('password')
    const [login] = useMutation(LOGIN)
    
    if(!show){
        return null
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        login({variables:{
            username: name.value,
            password: password.value
        }
        })
        resetName()
        resetPassword()
    }


    return(
        <div>
        <h2>login</h2>
        <form onSubmit={(e)=>handleSubmit(e)} >
            <label htmlFor='nameInput'>
                Name
            </label>
            <input id="nameInput" {...name} />
            <br/>
            <label htmlFor='passwordInput' >
                Password
            </label>
            <input id="passwordInput" {...password} />
            <button>Login</button>
        </form>
        </div>
    )
}

export default LoginForm