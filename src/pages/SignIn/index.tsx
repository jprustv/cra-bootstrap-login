import { Button, CardActions, CardContent, CardHeader, TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card/Card';
import React, { useContext, useEffect, useReducer } from 'react'
import { AuthContext } from '../../contexts/auth';

import './styles.css';

type State = {
    username: string
    password:  string
    isButtonDisabled: boolean
    helperText: string
    isError: boolean
};
  
const initialState:State = {
    username: '',
    password: '',
    isButtonDisabled: true,
    helperText: '',
    isError: false
};
  
type Action = { type: 'setUsername', payload: string }
    | { type: 'setPassword', payload: string }
    | { type: 'setIsButtonDisabled', payload: boolean }
    | { type: 'loginSuccess', payload: string }
    | { type: 'loginFailed', payload: string }
    | { type: 'setIsError', payload: boolean };
  
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setUsername': 
            return {
                ...state,
                username: action.payload,
                isButtonDisabled : action.payload.indexOf('@') === -1 || state.password === ''
            };
        case 'setPassword': 
            return {
                ...state,
                password: action.payload,
                isButtonDisabled : state.username.indexOf('@') === -1 || action.payload === ''
            };
        case 'setIsButtonDisabled': 
            return {
                ...state,
                isButtonDisabled: action.payload
            };
        case 'loginSuccess': 
            return {
                ...state,
                helperText: action.payload,
                isError: false
            };
        case 'loginFailed': 
            return {
                ...state,
                helperText: action.payload,
                isError: true
            };
        case 'setIsError': 
            return {
                ...state,
                isError: action.payload
            };
    }
}

const SignIn = () => {
    const [ state, dispatch ] = useReducer(reducer, initialState)
    const { signIn, error } = useContext(AuthContext)

    useEffect(() => {
        if (error !== ''){
            dispatch({
                type: 'loginFailed',
                payload: error
            });
        }
    }, [error])

    const handleLogin = async () => {
        signIn(state.username, state.password)
    };
  
    // Envia o formulário quando o usuário apertar Enter
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            state.isButtonDisabled || handleLogin();
        }
    };
  
    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setUsername',
            payload: event.target.value
        });
    };
  
    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setPassword',
            payload: event.target.value
        });
    }

    return (
        <div className="login">
            <form noValidate autoComplete="off">
                <Card className="card">
                    <CardHeader className="header" title="Login" />
                    <CardContent>
                        <div>
                            <TextField
                                error={state.isError}
                                fullWidth
                                id="username"
                                type="email"
                                label="Email"
                                placeholder="Email"
                                margin="normal"
                                onChange={handleUsernameChange}
                                onKeyPress={handleKeyPress}
                            />
                            <TextField
                                error={state.isError}
                                fullWidth
                                id="password"
                                type="password"
                                label="Password"
                                placeholder="Password"
                                margin="normal"
                                helperText={state.helperText}
                                onChange={handlePasswordChange}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            onClick={handleLogin}
                            disabled={state.isButtonDisabled}
                            className="login-button"
                        >
                            Login
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </div>   
    );
}
  
export default SignIn;