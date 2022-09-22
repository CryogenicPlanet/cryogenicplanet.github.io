import React, { forwardRef } from 'react'
function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const OuterContainer = forwardRef(function OuterContainer(
  { className, children, ...props }: React.ComponentProps<'div'>,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div ref={ref} className={clsx('sm:px-8', className)} {...props}>
      <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
    </div>
  )
})

const InnerContainer = forwardRef(function InnerContainer(
  { className, children, ...props }: React.ComponentProps<'div'>,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={clsx('relative px-4 sm:px-8 lg:px-12', className)}
      {...props}>
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  )
})

export const Container = forwardRef(function Container(
  { children, ...props }: React.ComponentProps<'div'>,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    // @ts-expect-error
    <OuterContainer ref={ref} {...props}>
      <InnerContainer>{children}</InnerContainer>
    </OuterContainer>
  )
})

// @ts-expect-error
Container.Outer = OuterContainer
// @ts-expect-error
Container.Inner = InnerContainer
