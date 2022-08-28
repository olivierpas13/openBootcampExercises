import { useEffect } from "react"
import { useMutation } from "@apollo/client"
import { useField } from "../hooks/custom-hooks"
import { LOGIN } from "../mutations/mutations"

const LoginForm = ({show, setToken}) =>{
    
    const {reset: resetName, ...name} = useField('text')
    const {reset: resetPassword, ...password} = useField('password')

    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
          return window.alert(error.graphQLErrors[0].message)
        }
      })
    
      useEffect(() => {
        if ( result.data ) {
          const {value} = result.data.login
          setToken(value)
          window.localStorage.setItem('library-user-token', value)
        }
      }, [result.data]) // eslint-disable-line
      
      
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
            <br/>
            <br/>
            <button>Login</button>
        </form>
        </div>
    )
}

export default LoginForm