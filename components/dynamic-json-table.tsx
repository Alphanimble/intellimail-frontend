'use client'

import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DynamicJsonTableProps {
  data: Record<string, any>[]
}

export function DynamicJsonTableComponent({ data = [] }: DynamicJsonTableProps) {
  if (data.length === 0) {
    return <p className="text-center text-muted-foreground">No data available</p>
  }

  const headers = Object.keys(data[0])

  return (
    <div className="w-full border rounded-lg px-16">
      <ScrollArea className="h-[400px]">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header} className="px-4 py-2">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {headers.map((header) => (
                  <TableCell key={`${index}-${header}`} className="w-fit">
                    {typeof row[header] === 'object'
                      ? JSON.stringify(row[header])
                      : String(row[header])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}
