import styles from './Login.module.scss'
import logoDgp from '../../assets/brasao_dgp.png'
import TextField from '@mui/material/TextField'
import { Button, CircularProgress, InputAdornment } from '@mui/material'
import { FiLock } from 'react-icons/fi'
import { MdOutlineEmail } from 'react-icons/md'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useState } from 'react'
import { useContexts } from '../../contexts/useContexts'
import { useForm } from 'react-hook-form'

type dataUsers = {
  usuario: string
  password: string
}

export function Login() {
  const { signIn } = useContexts()
  const [emailIconButtonColor, setEmailIconButtonColor] = useState('#757575')
  const [passwordIconButtonColor, setPasswordIconButtonColor] =
    useState('#757575')
  const [showAndUnshowPassword, setShowAndUnshowPassword] = useState('password')
  const [awaitResponseLogin, setAwaitResponseLogin] = useState(false)
  const { register, handleSubmit } = useForm<dataUsers>()

  const handleSigIn = (data: dataUsers, e: any) => {
    e.preventDefault()
    setAwaitResponseLogin(true)
    try {
      signIn(data)
      setAwaitResponseLogin(false)
    } catch {
      setAwaitResponseLogin(false)
    }
  }
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContainer}>
        <main>
          <section className={styles.leftSectionLogin}>
            <img src={logoDgp} className={styles.imageLogin} alt="" />
          </section>
          <section className={styles.rightSectionLogin}>
            <header>
              <div className={styles.imageMobileContainer}>
                <img src={logoDgp} className={styles.imageLoginMobile} alt="" />
              </div>
              <h1>SIPM</h1>
              <h4>Serviço de Identificação Policial Militar</h4>
            </header>
            <form onSubmit={handleSubmit(handleSigIn)} action="">
              <TextField
                {...register('usuario')}
                label="Usuário"
                placeholder="Insira seu usuário"
                variant="standard"
                onClick={() => setEmailIconButtonColor('#1976D2')}
                onBlur={() => setEmailIconButtonColor('#757575')}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdOutlineEmail color={emailIconButtonColor} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                {...register('password')}
                label="Senha"
                variant="standard"
                placeholder="Insira sua senha"
                type={showAndUnshowPassword}
                required
                onClick={() => setPasswordIconButtonColor('#1976D2')}
                onBlur={() => setPasswordIconButtonColor('#757575')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiLock color={passwordIconButtonColor} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <>
                      {showAndUnshowPassword === 'password' ? (
                        <InputAdornment position="start">
                          <AiFillEye
                            onClick={() => setShowAndUnshowPassword('text')}
                            className={styles.showPasswordIcon}
                          />
                        </InputAdornment>
                      ) : (
                        <InputAdornment position="start">
                          <AiFillEyeInvisible
                            onClick={() => setShowAndUnshowPassword('password')}
                            className={styles.showPasswordIcon}
                          />
                        </InputAdornment>
                      )}
                    </>
                  ),
                }}
              />
              <Button
                sx={{
                  marginTop: '40px',
                  borderColor: '#282957',
                  color: '#282957',
                  '&:hover': { borderColor: '#282957' },
                  height: '44px',
                }}
                type="submit"
                disabled={awaitResponseLogin}
                variant="outlined"
              >
                {awaitResponseLogin === true ? (
                  <CircularProgress
                    sx={{ width: '10px', height: '10px', color: '#A2A2A2' }}
                  />
                ) : (
                  'ENTRAR'
                )}
              </Button>
            </form>
          </section>
        </main>
      </div>
    </div>
  )
}
