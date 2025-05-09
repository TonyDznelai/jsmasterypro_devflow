import React from 'react'

const QeustionDetails = async ({params}: RouteParams) => {

  const { id } = await params;

  return (
    <div>Question page: {id}</div>
  )
}

export default QeustionDetails