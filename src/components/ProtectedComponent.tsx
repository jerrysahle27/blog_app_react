// import { Center, VStack, Box, Button } from '@chakra-ui/react'
import { useProtectedMutation } from '../app/services/auth/auth'

export function ProtectedComponent() {
  const [attemptAccess, { data, error, isLoading }] = useProtectedMutation()

  return (
    <div>

    </div>

  )
}
