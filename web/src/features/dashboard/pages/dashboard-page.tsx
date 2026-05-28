import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined'
import HubOutlinedIcon from '@mui/icons-material/HubOutlined'
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined'
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined'
import { LinearProgress, Paper, Typography } from '@mui/material'
import type { ReactNode } from 'react'

import { AppShell } from '@/shared/components/app-shell'
import { PageHeader } from '@/shared/components/page-header'

import { useDashboardStats } from '../hooks/use-dashboard-stats.hook'

type StatCardProps = {
  icon: ReactNode
  label: string
  value: number
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <Paper
      variant="outlined"
      className="flex min-h-32 items-center justify-between gap-4 p-5"
    >
      <div className="flex min-w-0 flex-col gap-2">
        <Typography color="text.secondary" variant="body2">
          {label}
        </Typography>
        <Typography component="p" variant="h4">
          {value}
        </Typography>
      </div>
      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
        {icon}
      </div>
    </Paper>
  )
}

export function DashboardPage() {
  const { loading, stats } = useDashboardStats()

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <PageHeader breadcrumbs={['Broadcast', 'Dashboard']} />

        <div>
          <Typography component="h1" variant="h4">
            Dashboard
          </Typography>
        </div>

        {loading ? <LinearProgress aria-label="Carregando dashboard" /> : null}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<HubOutlinedIcon />}
            label="Conexões"
            value={stats.connections}
          />
          <StatCard
            icon={<ContactsOutlinedIcon />}
            label="Contatos"
            value={stats.contacts}
          />
          <StatCard
            icon={<MarkEmailReadOutlinedIcon />}
            label="Mensagens enviadas"
            value={stats.sentMessages}
          />
          <StatCard
            icon={<ScheduleOutlinedIcon />}
            label="Mensagens agendadas"
            value={stats.scheduledMessages}
          />
        </div>
      </div>
    </AppShell>
  )
}
