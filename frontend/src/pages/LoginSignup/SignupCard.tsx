import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, TextField, InputAdornment, IconButton, OutlinedInput, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';

interface SignupCardProps {
    accountType?: string; // Define whether this is a user or club login
}
const SignupCard: React.FC<SignupCardProps> = ({ accountType }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [enteredUsername, setEnteredUsername] = React.useState("");
    const [enteredPassword, setEnteredPassword] = React.useState("");
    const { saveToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredPassword(event.target.value);
    };

    const handleSubmitForm = async (event: React.MouseEvent<HTMLButtonElement>) => {
        let endpointURL = process.env.REACT_APP_BACKEND_URL;
        if (!endpointURL) {
            console.error('Backend base URL is not defined. Check your .env file');
            return;
        }
        // Create form-data from state
        const formData = new FormData();
        formData.append('username', enteredUsername);
        formData.append('password', enteredPassword);

        // TODO: Send backend request to sign up (add the user to the database)
        
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <Card style={{ width: '100%' }}>
            <CardContent style={{ alignItems: 'left', textAlign: 'left', padding: 40 }}>
                {/* roboto medium, override font size to 18 as per figma */}
                <p className='roboto-medium' style={{ fontSize: 18, marginBottom: 40 }}>
                    SIGN UP {accountType === 'CLUB' ? '(club)' : null
                    }
                </p>
                <div className='loginsignup-input-wrap'>
                    <p className='roboto-regular'>
                        Email
                    </p>
                    <TextField
                        variant="outlined"
                        fullWidth
                        type="email"
                        onChange={handleUsernameChange}
                    />
                </div>

                <div className='loginsignup-input-wrap'>
                    <p className='roboto-regular'>
                        Password
                    </p>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        value={enteredPassword}
                        onChange={handlePasswordChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </div>
                <Button
                    variant="contained"
                    fullWidth
                    id='logsign-submit-button'
                    onClick={handleSubmitForm}
                >
                    SIGN UP
                </Button>
            </CardContent>
        </Card>
    )
}
export default SignupCard;