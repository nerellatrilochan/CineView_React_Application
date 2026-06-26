import { Outlet } from 'react-router-dom'
import { Navbar } from '../Navbar'
import { StyledMain, StyledShell } from './StyledComponents'

export const ShellLayout = () => (
  <StyledShell>
    <Navbar />
    <StyledMain>
      <Outlet />
    </StyledMain>
  </StyledShell>
)