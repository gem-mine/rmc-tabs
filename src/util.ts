import React from 'react'

export function getIndex(children: any, key: string | number | undefined) {
  let currentIndex = 0
  React.Children.forEach(children, (child: any, i) => {
    if (child !== null) {
      if (child.key === key || i === key) {
        currentIndex = i
      }
    }
  })
  return currentIndex
}
