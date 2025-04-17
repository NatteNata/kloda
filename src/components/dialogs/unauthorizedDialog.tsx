import { Button } from '@/components/buttons/button'
import { Dialog, type DialogProps } from '@/components/dialogs/dialog/dialog'
import { LoginForm } from '@/components/forms/loginForm'
import { RegisterForm } from '@/components/forms/registerForm'
import { usePaths } from '@/hooks/usePaths'
import { useTransitionRouter } from 'next-view-transitions'
import { useState } from 'react'

export const UnauthorizedDialog = ({ close, ...restProps }: DialogProps) => {
  const [showMessage, setShowMessage] = useState<boolean>(true)
  const [showLogin, setShowLogin] = useState<boolean>(false)
  const [showRegister, setShowRegister] = useState<boolean>(false)
  const router = useTransitionRouter()
  const { pathname } = usePaths()

  const dialogTitle = showMessage
    ? 'Unauthorized'
    : showLogin
      ? 'Login to continue'
      : 'Register to continue'

  const handleClose = () => {
    setShowMessage(true)
    setShowLogin(false)
    setShowRegister(false)
    close()
  }

  const onSuccess = () => {
    router.push(pathname)
    handleClose()
  }

  const handleLoginClick = (): void => {
    setShowMessage(false)
    setShowLogin(true)
  }

  const handleRegisterClick = (): void => {
    setShowMessage(false)
    setShowRegister(true)
  }

  return (
    <>
      <Dialog
        aria-label={dialogTitle}
        close={handleClose}
        {...restProps}
        className='flex flex-col items-center gap-5'
      >
        {showMessage && (
          <div>
            <p>
              Only authorized user can create, like, dislike & add card to
              favorites.
            </p>
            <div className='flex flex-col gap-y-3 pt-3'>
              <Button variant='text' onClick={handleLoginClick}>
                Login
              </Button>
              <Button variant='text' onClick={handleRegisterClick} className=''>
                Register
              </Button>
            </div>
          </div>
        )}
        {showLogin && <LoginForm onSuccess={onSuccess} />}
        {showRegister && <RegisterForm onSuccess={onSuccess} />}
      </Dialog>
    </>
  )
}
