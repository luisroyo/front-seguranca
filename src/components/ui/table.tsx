'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const tableVariants = cva(
  'w-full border-collapse',
  {
    variants: {
      variant: {
        default: 'border border-gray-200',
        bordered: 'border-2 border-gray-300',
        striped: 'border border-gray-200',
        compact: 'border border-gray-200',
      },
      size: {
        default: '',
        sm: 'text-sm',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const tableHeaderVariants = cva(
  'font-semibold text-left',
  {
    variants: {
      variant: {
        default: 'bg-gray-50 text-gray-900',
        bordered: 'bg-gray-100 text-gray-900 border-b-2 border-gray-300',
        striped: 'bg-gray-50 text-gray-900',
        compact: 'bg-gray-50 text-gray-900',
      },
      size: {
        default: 'px-4 py-3',
        sm: 'px-3 py-2',
        lg: 'px-6 py-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const tableCellVariants = cva(
  'border-b border-gray-200',
  {
    variants: {
      variant: {
        default: '',
        bordered: 'border border-gray-300',
        striped: '',
        compact: 'border-b border-gray-100',
      },
      size: {
        default: 'px-4 py-3',
        sm: 'px-3 py-2',
        lg: 'px-6 py-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const tableRowVariants = cva(
  'hover:bg-gray-50 transition-colors',
  {
    variants: {
      variant: {
        default: '',
        bordered: '',
        striped: 'even:bg-gray-50',
        compact: '',
      },
      interactive: {
        true: 'cursor-pointer hover:bg-blue-50',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      interactive: false,
    },
  }
)

interface TableProps
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {}

interface TableHeaderProps
  extends React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
    VariantProps<typeof tableHeaderVariants> {}

interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableDataCellElement>,
    VariantProps<typeof tableCellVariants> {}

interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement>,
    VariantProps<typeof tableRowVariants> {}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant, size, ...props }, ref) => (
    <table
      ref={ref}
      className={cn(tableVariants({ variant, size }), className)}
      {...props}
    />
  )
)
Table.displayName = 'Table'

const TableHeader = React.forwardRef<HTMLTableHeaderCellElement, TableHeaderProps>(
  ({ className, variant, size, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(tableHeaderVariants({ variant, size }), className)}
      {...props}
    />
  )
)
TableHeader.displayName = 'TableHeader'

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, variant, interactive, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(tableRowVariants({ variant, interactive }), className)}
      {...props}
    />
  )
)
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<HTMLTableHeaderCellElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn('text-left font-semibold', className)}
      {...props}
    />
  )
)
TableHead.displayName = 'TableHead'

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn('', className)}
      {...props}
    />
  )
)
TableBody.displayName = 'TableBody'

const TableCell = React.forwardRef<HTMLTableDataCellElement, TableCellProps>(
  ({ className, variant, size, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(tableCellVariants({ variant, size }), className)}
      {...props}
    />
  )
)
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn('mt-4 text-sm text-gray-500', className)}
      {...props}
    />
  )
)
TableCaption.displayName = 'TableCaption'

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('bg-gray-50 font-medium', className)}
      {...props}
    />
  )
)
TableFooter.displayName = 'TableFooter'

export {
  Table,
  TableHeader,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
}
