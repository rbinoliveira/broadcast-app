import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import {
  AppBar,
  Drawer,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import { type MouseEvent, type ReactNode, useState } from 'react'

import { useAuth } from '@/features/auth/hooks/use-auth.hook'
import { signOutUser } from '@/features/auth/services/auth.service'

import { AppButton } from './app-button'
import { AppSidebar } from './app-sidebar'

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
    <div className="flex min-h-screen bg-canvas">
      <aside className="hidden w-60 flex-col border-r border-divider bg-surface md:flex">
        <div className="h-full px-3 py-6">{sidebar}</div>
      </aside>

      <div className="flex min-w-0 grow flex-col">
        <AppBar
          elevation={0}
          position="sticky"
          className="border-b border-divider bg-surface text-foreground"
          sx={{ display: { xs: 'flex', md: 'none' } }}
        >
          <Toolbar className="min-h-16 px-4">
            <AppButton
              iconOnly
              aria-label="Abrir menu"
              edge="start"
              onClick={() => setMobileOpen(true)}
              className="mr-2"
            >
              <MenuRoundedIcon />
            </AppButton>
            <Typography
              component="span"
              className="text-lg font-bold tracking-normal"
              variant="h6"
            >
              Broadcast
            </Typography>
          </Toolbar>
        </AppBar>

        <main className="grow px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        className="block md:hidden [&_.MuiDrawer-paper]:box-border [&_.MuiDrawer-paper]:w-60"
        sx={{ display: { xs: 'block', md: 'none' } }}
        variant="temporary"
      >
        <div className="h-full">{sidebar}</div>
      </Drawer>

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
    </div>
  )
}
