import type Blobity from 'blobity'
import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps
} from 'react'
import colors from 'tailwindcss/colors'

import { view } from '@risingstack/react-easy-state'
import { state } from '@utils/store'

type MouseEventOptions = Parameters<
  InstanceType<typeof Blobity>['updateOptions']
>[0]

type DataOptions = Partial<{
  xOffset: number
  yOffset: number
  radius: number
  magnetic: boolean
}>

const A = ({
  children,
  dataOptions,
  enterOptions,
  exitOptions,
  nextLink,
  ...props
}: {
  children: React.ReactNode
  dataOptions?: DataOptions
  enterOptions?: MouseEventOptions
  exitOptions?: MouseEventOptions
  nextLink?: boolean
} & DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => {
  const { blobity, dark } = state

  const ATag = () => {
    return (
      <a
        onMouseEnter={() => {
          const update: MouseEventOptions = {
            color: dark ? colors.gray['50'] : colors.gray['700'],
            opacity: 0.05,
            ...enterOptions
          }

          blobity?.updateOptions(update)
        }}
        onMouseLeave={() => {
          const update: MouseEventOptions = {
            color: colors.indigo['500'],
            opacity: 0.15,
            ...exitOptions
          }
          blobity?.updateOptions(update)
        }}
        data-blobity-radius={dataOptions?.radius || 10}
        data-blobity-offset-x={dataOptions?.xOffset || 7}
        data-blobity-offset-y={dataOptions?.yOffset || 7}
        data-blobity-magnetic={dataOptions?.magnetic || true}
        {...props}>
        {children}
      </a>
    )
  }

  if (nextLink) {
    return (
      <span
        onMouseEnter={() => {
          const update: MouseEventOptions = {
            color: dark ? colors.gray['50'] : colors.gray['700'],
            opacity: 0.05,
            ...enterOptions
          }

          blobity?.updateOptions(update)
        }}>
        <ATag></ATag>
      </span>
    )
  } else {
    return <ATag></ATag>
  }
}

export { colors }

export default view(A)

export const Button = ({
  children,
  dataOptions,
  enterOptions,
  exitOptions,
  nextLink,
  ...props
}: {
  children: React.ReactNode
  dataOptions?: DataOptions
  enterOptions?: MouseEventOptions
  exitOptions?: MouseEventOptions
  nextLink?: boolean
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  const { blobity, dark } = state

  return (
    <button
      onMouseEnter={() => {
        const update: MouseEventOptions = {
          color: dark ? colors.gray['50'] : colors.gray['700'],
          opacity: 0.05,
          ...enterOptions
        }

        blobity?.updateOptions(update)
      }}
      onMouseLeave={() => {
        const update: MouseEventOptions = {
          color: colors.indigo['500'],
          opacity: 0.15,
          ...exitOptions
        }
        blobity?.updateOptions(update)
      }}
      data-blobity-radius={dataOptions?.radius || 10}
      data-blobity-offset-x={dataOptions?.xOffset || 7}
      data-blobity-offset-y={dataOptions?.yOffset || 7}
      data-blobity-magnetic={dataOptions?.magnetic || true}
      {...props}>
      {children}
    </button>
  )
}

export const defaultConfig = {
  color: colors.indigo['500'],
  dotColor: 'white',
  zIndex: 0,
  opacity: 0.4
}
