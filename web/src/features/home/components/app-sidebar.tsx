import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import HubOutlinedIcon from '@mui/icons-material/HubOutlined'
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import type { MouseEvent } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { ActiveConnectionSelect } from '@/features/connections/components/active-connection-select'
import { getDisplayName, getInitials } from '@/shared/utils/user-display'

type AppSidebarProps = {
  email: string | null | undefined
  name: string | null | undefined
  onLogoutClick: (event: MouseEvent<HTMLElement>) => void
  onNavigate: () => void
}

export function AppSidebar({
  email,
  name,
  onLogoutClick,
  onNavigate,
}: AppSidebarProps) {
  const displayName = getDisplayName(name, email)
  const { pathname } = useLocation()
  const isConnectionsSelected = pathname === '/'
  const isContactsSelected =
    pathname === '/contacts' || pathname.includes('/contacts')

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100%',
        px: 1.5,
        py: 3,
      }}
    >
      <Box>
        <Typography
          noWrap
          sx={{
            fontSize: '1.125rem',
            fontWeight: 700,
            letterSpacing: 0,
          }}
          variant="h6"
        >
          Broadcast
        </Typography>
      </Box>

      <ActiveConnectionSelect onChange={onNavigate} />

      <Divider sx={{ my: 1 }} />

      <List disablePadding sx={{ mt: 1 }}>
        <ListItemButton
          component={NavLink}
          onClick={onNavigate}
          selected={isConnectionsSelected}
          sx={{ borderRadius: 1.5, minHeight: 40 }}
          to="/"
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <HubOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Conexões" />
        </ListItemButton>
        <ListItemButton
          component={NavLink}
          selected={isContactsSelected}
          sx={{ borderRadius: 1.5, minHeight: 40 }}
          to="/contacts"
          onClick={onNavigate}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <GroupsOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Contatos" />
        </ListItemButton>
        <ListItemButton
          sx={{ borderRadius: 1.5, minHeight: 40 }}
          onClick={onNavigate}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <MarkEmailUnreadOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Mensagens" />
        </ListItemButton>
      </List>

      <Box sx={{ mt: 'auto' }}>
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              minWidth: 0,
            }}
          >
            <Avatar sx={{ fontWeight: 700 }}>{getInitials(displayName)}</Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography noWrap sx={{ fontWeight: 600 }} variant="body2">
                {displayName}
              </Typography>
              <Typography color="text.secondary" noWrap variant="caption">
                {email ?? 'Sem e-mail'}
              </Typography>
            </Box>
          </Box>

          <IconButton
            aria-label="Abrir menu"
            onClick={onLogoutClick}
            size="small"
          >
            <MoreVertOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
