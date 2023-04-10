// import { Center, VStack, Box, Button } from '@chakra-ui/react'
import { useProtectedMutation } from "../app/services/auth/auth";
import Navbar from "./layout/Navbar";
export default function ProtectedComponent() {
  const [attemptAccess, { data, error, isLoading }] = useProtectedMutation();
  console.log(attemptAccess);
  return (
    <div>
      <Navbar />
    </div>
  );
}
