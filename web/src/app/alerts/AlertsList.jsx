import React from 'react'
import { gql, useQuery } from 'urql'
import FlatList from '../lists/FlatList'
import ListPageControls from '../lists/ListPageControls'
import { Tooltip } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'

const query = gql`
  query {
    alerts {
      nodes {
        id
        alertID
        status
        summary
        details
        createdAt
        service {
          id
          name
        }
      }
    }
  }
`

export default function AlertsList() {
  const [{ data, fetching, error }] = useQuery({ query })

  const items = data?.alerts?.nodes || []

  return (
    <>
      <ListPageControls />
      <FlatList
        items={items}
        renderItem={(item) => (
          <div key={item.id}>
            <Tooltip title="Click to Favorite" placement="top">
              <NotificationsIcon />
            </Tooltip>
            <div>
              <strong>{item.summary}</strong>
              <p>{item.details}</p>
              <small>Service: {item.service?.name}</small>
            </div>
          </div>
        )}
      />
    </>
  )
}
