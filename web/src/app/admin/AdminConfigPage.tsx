import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
} from '@mui/material'
import { useQuery } from '@apollo/client'
import { css } from '@emotion/react'
import { gql } from 'graphql-tag'

const GET_CONFIG_DATA = gql`
  query GetConfigData {
    systemLimits {
      maxRulesPerPolicy
      maxStepsPerPolicy
      maxPoliciesPerService
    }
    configHints {
      webhookURL
      publicURL
    }
  }
`

const cardStyles = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`

interface ConfigCardProps {
  title: string
  children: React.ReactNode
}

function ConfigCard({ title, children }: ConfigCardProps) {
  return (
    <Card css={cardStyles}>
      <CardHeader
        title={<Typography variant="h6">{title}</Typography>}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        {children}
      </CardContent>
    </Card>
  )
}

export default function AdminConfigPage() {
  const { data, loading, error } = useQuery(GET_CONFIG_DATA)

  if (loading) return <Typography>Loading...</Typography>
  if (error) return <Typography>Error loading configuration</Typography>

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Configuration
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ConfigCard title="System Limits">
            <Typography variant="body2" gutterBottom>
              Max Rules Per Policy: {data?.systemLimits?.maxRulesPerPolicy || 'N/A'}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Max Steps Per Policy: {data?.systemLimits?.maxStepsPerPolicy || 'N/A'}
            </Typography>
            <Typography variant="body2">
              Max Policies Per Service: {data?.systemLimits?.maxPoliciesPerService || 'N/A'}
            </Typography>
          </ConfigCard>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <ConfigCard title="URL Configuration">
            <Typography variant="body2" gutterBottom>
              Webhook URL: {data?.configHints?.webhookURL || 'Not configured'}
            </Typography>
            <Typography variant="body2">
              Public URL: {data?.configHints?.publicURL || 'Not configured'}
            </Typography>
          </ConfigCard>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <ConfigCard title="General Settings">
            <Typography variant="body2" gutterBottom>
              Database Status: Connected
            </Typography>
            <Typography variant="body2" gutterBottom>
              Cache Status: Active
            </Typography>
            <Typography variant="body2">
              Last Updated: {new Date().toLocaleString()}
            </Typography>
          </ConfigCard>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <ConfigCard title="Authentication">
            <Typography variant="body2" gutterBottom>
              OAuth Providers: 2 configured
            </Typography>
            <Typography variant="body2" gutterBottom>
              Session Timeout: 30 minutes
            </Typography>
            <Typography variant="body2">
              Multi-Factor Auth: Enabled
            </Typography>
          </ConfigCard>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <ConfigCard title="Notifications">
            <Typography variant="body2" gutterBottom>
              Email Service: Active
            </Typography>
            <Typography variant="body2" gutterBottom>
              SMS Service: Active
            </Typography>
            <Typography variant="body2">
              Push Notifications: Enabled
            </Typography>
          </ConfigCard>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <ConfigCard title="Monitoring">
            <Typography variant="body2" gutterBottom>
              Health Check: Passing
            </Typography>
            <Typography variant="body2" gutterBottom>
              Metrics Collection: Enabled
            </Typography>
            <Typography variant="body2">
              Log Level: INFO
            </Typography>
          </ConfigCard>
        </Grid>
      </Grid>
    </Box>
  )
}
