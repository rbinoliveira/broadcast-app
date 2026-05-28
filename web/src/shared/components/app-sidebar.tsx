import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import HubOutlinedIcon from '@mui/icons-material/HubOutlined'
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import {
  Avatar,
  Divider,
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

import { AppButton } from './app-button'
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
  const displayName = getDisplayName(name)
  const { pathname } = useLocation()
  const isDashboardSelected = pathname === '/'
  const isConnectionsSelected = pathname === '/connections'
  const isContactsSelected =
    pathname === '/contacts' || pathname.includes('/contacts')
  const isMessagesSelected = pathname === '/messages'
  const navItemSx = {
    color: 'text.secondary',
    '& .MuiListItemIcon-root': {
      color: 'inherit',
    },
    '&.Mui-selected': {
      color: 'text.primary',
    },
    '&:hover': {
      color: 'text.primary',
    },
  }

  return (
    <div className="flex h-full flex-col gap-4 px-3 py-6">
      <NavLink
        aria-label="Voltar para dashboard"
        className="flex max-w-full min-w-0 items-center gap-2 rounded-lg text-foreground no-underline outline-offset-4"
        onClick={onNavigate}
        to="/"
      >
        <img
          alt=""
          aria-hidden="true"
          className="size-10 shrink-0 rounded-xl"
          height="40"
          src="/logo.png"
          width="40"
        />
        <Typography
          noWrap
          component="span"
          className="min-w-0 text-lg font-bold tracking-normal"
          variant="h6"
        >
          Broadcast
        </Typography>
      </NavLink>

      <ActiveConnectionSelect onChange={onNavigate} />

      <Divider className="my-2" />

      <List disablePadding className="mt-2">
        <ListItemButton
          component={NavLink}
          onClick={onNavigate}
          selected={isDashboardSelected}
          className="min-h-10 min-w-0 rounded-xl"
          sx={navItemSx}
          to="/"
        >
          <ListItemIcon className="min-w-9 shrink-0">
            <DashboardOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            className="min-w-0"
            slotProps={{ primary: { noWrap: true } }}
          />
        </ListItemButton>
        <ListItemButton
          component={NavLink}
          onClick={onNavigate}
          selected={isConnectionsSelected}
          className="min-h-10 min-w-0 rounded-xl"
          sx={navItemSx}
          to="/connections"
        >
          <ListItemIcon className="min-w-9 shrink-0">
            <HubOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Conexões"
            className="min-w-0"
            slotProps={{ primary: { noWrap: true } }}
          />
        </ListItemButton>
        <ListItemButton
          component={NavLink}
          selected={isContactsSelected}
          className="min-h-10 min-w-0 rounded-xl"
          sx={navItemSx}
          to="/contacts"
          onClick={onNavigate}
        >
          <ListItemIcon className="min-w-9 shrink-0">
            <GroupsOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Contatos"
            className="min-w-0"
            slotProps={{ primary: { noWrap: true } }}
          />
        </ListItemButton>
        <ListItemButton
          component={NavLink}
          selected={isMessagesSelected}
          className="min-h-10 min-w-0 rounded-xl"
          sx={navItemSx}
          to="/messages"
          onClick={onNavigate}
        >
          <ListItemIcon className="min-w-9 shrink-0">
            <MarkEmailUnreadOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Mensagens"
            className="min-w-0"
            slotProps={{ primary: { noWrap: true } }}
          />
        </ListItemButton>
      </List>

      <div className="mt-auto">
        <Divider />
        <div className="flex min-w-0 items-center justify-between gap-3 pt-4">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar className="shrink-0 font-bold">
              {getInitials(displayName)}
            </Avatar>
            <div className="min-w-0">
              <Typography noWrap className="font-semibold" variant="body2">
                {displayName}
              </Typography>
              <Typography color="text.secondary" noWrap variant="caption">
                {email ?? 'Sem e-mail'}
              </Typography>
            </div>
          </div>

          <AppButton
            iconOnly
            aria-label="Abrir menu"
            onClick={onLogoutClick}
            size="small"
          >
            <MoreVertOutlinedIcon fontSize="small" />
          </AppButton>
        </div>
      </div>
    </div>
  )
}
