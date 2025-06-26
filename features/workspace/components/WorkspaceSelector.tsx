'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/Select'
import { WorkspaceWithTemplate } from '@/types/workspace'
import { useEffect, useState } from 'react'

interface WorkspaceSelectorProps {
  defaultWorkspaces: WorkspaceWithTemplate[]
  onWorkspaceChange: (workspaceId: string) => void
}

export function WorkspaceSelector({
  defaultWorkspaces,
  onWorkspaceChange,
}: WorkspaceSelectorProps) {
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<
    string | undefined
  >(defaultWorkspaces.length > 0 ? defaultWorkspaces[0].id : undefined)

  useEffect(() => {
    if (selectedWorkspaceId) {
      onWorkspaceChange(selectedWorkspaceId)
    }
  }, [selectedWorkspaceId, onWorkspaceChange])

  return (
    <Select value={selectedWorkspaceId} onValueChange={setSelectedWorkspaceId}>
      <SelectGroup>
        <SelectLabel>Select Workspace</SelectLabel>
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Select Workspace" />
        </SelectTrigger>
      </SelectGroup>
      <SelectContent>
        {defaultWorkspaces.map((ws) => (
          <SelectItem key={ws.id} value={ws.id}>
            {ws.template?.name ?? ws.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
