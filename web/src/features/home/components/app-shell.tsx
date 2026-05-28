import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import { type MouseEvent, type ReactNode, useState } from 'react'

import { useAuth } from '@/features/auth/context/auth-context'
import { signOutUser } from '@/features/auth/services/auth.service'

import { AppSidebar } from './app-sidebar'

const SIDEBAR_WIDTH = 240

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const { user } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(null)

  async function handleLogout() {
    await signOutUser()
  }

  const sidebar = (
    <AppSidebar
      email={user?.email}
      name={user?.displayName}
      onLogoutClick={(event: MouseEvent<HTMLElement>) =>
        setUserMenuAnchor(event.currentTarget)
      }
      onNavigate={() => setMobileOpen(false)}
    />
  )

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Box
        component="aside"
        sx={{
          borderRight: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          width: SIDEBAR_WIDTH,
        }}
      >
        <Box sx={{ px: 1.5, py: 3, height: '100%' }}>{sidebar}</Box>
      </Box>

      <AppBar
        elevation={0}
        position="sticky"
        sx={{
          display: { xs: 'flex', md: 'none' },
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ minHeight: 64, px: 2 }}>
          <IconButton
            aria-label="Abrir menu"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 1 }}
          >
            <MenuRoundedIcon />
          </IconButton>
          <Typography
            sx={{ fontSize: '1.125rem', fontWeight: 700, letterSpacing: 0 }}
            variant="h6"
          >
            Broadcast
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: SIDEBAR_WIDTH,
          },
        }}
        variant="temporary"
      >
        <Box sx={{ height: '100%' }}>{sidebar}</Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: { xs: 2, md: 4 },
          py: { xs: 3, md: 4 },
        }}
      >
        {children}
      </Box>

      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={() => setUserMenuAnchor(null)}
      >
        <MenuItem
          onClick={async () => {
            setUserMenuAnchor(null)
            await handleLogout()
          }}
        >
          <ListItemIcon>
            <LogoutOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Sair</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}
